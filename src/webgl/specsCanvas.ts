// Interactive 3D Rotating Architectural Sphere & Orbital Wireframe Canvas for WEBAK Studio
export function initSpecsCanvas(canvas: HTMLCanvasElement | null): () => void {
  if (!canvas) return () => {};
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let angle = 0;
  let tiltOffset = 0.25;
  const targetSpeed = 0.0065;
  let hoverBoost = 0;
  let rafId = 0;

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.floor(canvas.clientWidth * dpr);
    const h = Math.floor(canvas.clientHeight * dpr);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
  };

  const onEnter = () => {
    hoverBoost = 0.015;
  };
  const onLeave = () => {
    hoverBoost = 0;
  };

  const parent = canvas.parentElement;
  parent?.addEventListener('pointerenter', onEnter);
  parent?.addEventListener('pointerleave', onLeave);
  window.addEventListener('resize', resize, { passive: true });
  resize();

  const latitudes = [-0.82, -0.58, -0.32, 0, 0.32, 0.58, 0.82];

  const draw = () => {
    resize();
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const theme = document.documentElement.getAttribute('data-theme') || 'dark';
    const isDark = theme !== 'light';
    const accentRaw = document.documentElement.getAttribute('data-accent-rgb') || '255, 107, 0';

    const strokeMain = isDark
      ? 'rgba(243, 246, 251, 0.18)'
      : 'rgba(16, 22, 34, 0.16)';
    const strokeAccent = `rgba(${accentRaw}, ${isDark ? 0.78 : 0.72})`;

    const cx = w * 0.5;
    const cy = h * 0.46;
    const radius = Math.min(w, h) * 0.34;

    if (!prefersReduced) {
      angle += targetSpeed + hoverBoost;
    }

    ctx.lineWidth = Math.max(1.1, w / 460);

    // Outer orbital ring
    ctx.beginPath();
    ctx.strokeStyle = strokeAccent;
    ctx.ellipse(cx, cy, radius * 1.24, radius * 0.34, -0.24, 0, Math.PI * 2);
    ctx.stroke();

    // Latitude rings of the geodesic dome
    for (let i = 0; i < latitudes.length; i++) {
      const yNorm = latitudes[i];
      const rNorm = Math.sqrt(Math.max(0, 1 - yNorm * yNorm));
      const py = cy - yNorm * radius;
      const rx = rNorm * radius;
      const ry = rx * Math.abs(Math.sin(tiltOffset));

      ctx.beginPath();
      ctx.strokeStyle = yNorm === 0 ? strokeAccent : strokeMain;
      ctx.ellipse(cx, py, rx, ry, 0, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Rotating longitude meridians
    const meridians = 12;
    for (let m = 0; m < meridians; m++) {
      const theta = angle + (m * Math.PI * 2) / meridians;
      const cosT = Math.cos(theta);
      const sinT = Math.sin(theta);

      ctx.beginPath();
      ctx.strokeStyle = m % 3 === 0 ? strokeAccent : strokeMain;
      for (let step = 0; step <= 24; step++) {
        const phi = -Math.PI / 2 + (step / 24) * Math.PI;
        const yNorm = Math.sin(phi);
        const rNorm = Math.cos(phi);
        const px = cx + cosT * rNorm * radius;
        const py = cy - yNorm * radius + sinT * rNorm * radius * Math.sin(tiltOffset);
        if (step === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
    }

    if (!prefersReduced) {
      rafId = requestAnimationFrame(draw);
    }
  };

  rafId = requestAnimationFrame(draw);

  return () => {
    cancelAnimationFrame(rafId);
    parent?.removeEventListener('pointerenter', onEnter);
    parent?.removeEventListener('pointerleave', onLeave);
    window.removeEventListener('resize', resize);
  };
}
