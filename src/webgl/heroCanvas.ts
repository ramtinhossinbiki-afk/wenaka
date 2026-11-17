// Procedural WebGL2 Topographic Contour & Interactive Ember Field Shader
function parseRgbAttr(): [number, number, number] {
  const raw = document.documentElement.getAttribute('data-accent-rgb');
  if (!raw) return [1.0, 0.42, 0.0];
  const parts = raw.split(',').map((n) => parseFloat(n.trim()));
  if (parts.length !== 3 || parts.some((n) => Number.isNaN(n))) {
    return [1.0, 0.42, 0.0];
  }
  return [parts[0] / 255, parts[1] / 255, parts[2] / 255];
}

function parseBgRgbAttr(isLight: boolean): [number, number, number] {
  const raw = document.documentElement.getAttribute('data-bg-rgb');
  if (raw) {
    const parts = raw.split(',').map((n) => parseFloat(n.trim()));
    if (parts.length === 3 && !parts.some((n) => Number.isNaN(n))) {
      return [parts[0] / 255, parts[1] / 255, parts[2] / 255];
    }
  }
  return isLight ? [0.965, 0.969, 0.98] : [0.027, 0.039, 0.063];
}

export function initHeroCanvas(canvas: HTMLCanvasElement | null): () => void {
  if (!canvas) return () => {};
  const gl = canvas.getContext('webgl2', {
    alpha: true,
    antialias: false,
    powerPreference: 'low-power',
  });
  if (!gl) return () => {};

  const vsSource = `#version 300 es
  in vec2 a_pos;
  out vec2 v_uv;
  void main() {
    v_uv = a_pos * 0.5 + 0.5;
    gl_Position = vec4(a_pos, 0.0, 1.0);
  }`;

  const fsSource = `#version 300 es
  precision highp float;
  in vec2 v_uv;
  out vec4 outColor;

  uniform float u_time;
  uniform vec2 u_mouse;
  uniform vec2 u_res;
  uniform float u_isDark;
  uniform vec3 u_accent;
  uniform vec3 u_baseBg;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  void main() {
    vec2 uv = v_uv;
    float aspect = u_res.x / max(u_res.y, 1.0);
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

    float n1 = noise(p * 2.2 + vec2(u_time * 0.045, -u_time * 0.03));
    float n2 = noise(p * 4.8 - vec2(u_time * 0.035, u_time * 0.025));
    float elev = n1 * 0.65 + n2 * 0.35;

    float contour = abs(fract(elev * 8.5) - 0.5);
    float line = smoothstep(0.465, 0.495, contour);

    vec2 mPos = (u_mouse - 0.5) * vec2(aspect, 1.0);
    float dist = length(p - mPos);
    float glow = exp(-dist * dist * 2.2);

    // Secondary ambient studio glow in corner
    float ambientDist = length(p - vec2(0.42 * aspect, 0.12));
    float ambientGlow = exp(-ambientDist * ambientDist * 1.4) * 0.5;

    vec3 col = u_baseBg;
    float glowStrength = u_isDark > 0.5 ? 0.22 : 0.10;
    float lineStrength = u_isDark > 0.5 ? 0.14 : 0.07;

    col = mix(col, u_accent, (glow * glowStrength) + (ambientGlow * glowStrength * 0.55));
    col += u_accent * line * lineStrength;

    outColor = vec4(col, 1.0);
  }`;

  const compile = (type: number, src: string): WebGLShader | null => {
    const sh = gl.createShader(type);
    if (!sh) return null;
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      gl.deleteShader(sh);
      return null;
    }
    return sh;
  };

  const prog = gl.createProgram();
  if (!prog) return () => {};
  const vs = compile(gl.VERTEX_SHADER, vsSource);
  const fs = compile(gl.FRAGMENT_SHADER, fsSource);
  if (!vs || !fs) {
    if (vs) gl.deleteShader(vs);
    if (fs) gl.deleteShader(fs);
    gl.deleteProgram(prog);
    return () => {};
  }
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    gl.deleteProgram(prog);
    return () => {};
  }

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
    gl.STATIC_DRAW
  );

  const aPos = gl.getAttribLocation(prog, 'a_pos');
  const uTime = gl.getUniformLocation(prog, 'u_time');
  const uMouse = gl.getUniformLocation(prog, 'u_mouse');
  const uRes = gl.getUniformLocation(prog, 'u_res');
  const uIsDark = gl.getUniformLocation(prog, 'u_isDark');
  const uAccent = gl.getUniformLocation(prog, 'u_accent');
  const uBaseBg = gl.getUniformLocation(prog, 'u_baseBg');

  let mouseX = 0.68;
  let mouseY = 0.52;
  let targetX = 0.68;
  let targetY = 0.52;
  let rafId = 0;

  const resize = () => {
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.floor(canvas.clientWidth * dpr);
    const h = Math.floor(canvas.clientHeight * dpr);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
  };

  const onPointerMove = (e: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    targetX = (e.clientX - rect.left) / rect.width;
    targetY = 1.0 - (e.clientY - rect.top) / rect.height;
  };

  window.addEventListener('pointermove', onPointerMove, { passive: true });
  window.addEventListener('resize', resize, { passive: true });
  resize();

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const start = performance.now();

  const render = (now: number) => {
    resize();
    mouseX += (targetX - mouseX) * 0.07;
    mouseY += (targetY - mouseY) * 0.07;

    const theme = document.documentElement.getAttribute('data-theme') || 'dark';
    const isLight = theme === 'light';
    const isDark = isLight ? 0.0 : 1.0;
    const accent = parseRgbAttr();
    const bg = parseBgRgbAttr(isLight);
    const t = prefersReduced ? 0.0 : (now - start) * 0.001;

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.useProgram(prog);
    gl.enableVertexAttribArray(aPos);
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    gl.uniform1f(uTime, t);
    gl.uniform2f(uMouse, mouseX, mouseY);
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.uniform1f(uIsDark, isDark);
    gl.uniform3f(uAccent, accent[0], accent[1], accent[2]);
    gl.uniform3f(uBaseBg, bg[0], bg[1], bg[2]);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    if (!prefersReduced) {
      rafId = requestAnimationFrame(render);
    }
  };

  rafId = requestAnimationFrame(render);

  return () => {
    cancelAnimationFrame(rafId);
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('resize', resize);
  };
}
