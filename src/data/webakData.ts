export type Lang = 'fa' | 'en';
export type ThemeMode = 'dark' | 'light' | 'custom';

export interface CapabilityItem {
  id: string;
  index: string;
  icon:
    | 'bot'
    | 'globe'
    | 'smartphone'
    | 'palette'
    | 'presentation'
    | 'code'
    | 'cpu'
    | 'layout'
    | 'image'
    | 'sparkles';
  titleFa: string;
  titleEn: string;
  shortFa: string;
  shortEn: string;
  detailFa: string;
  detailEn: string;
  deliverablesFa: string[];
  deliverablesEn: string[];
  stack: string[];
  estDaysMin: number;
  estDaysMax: number;
}

export interface TeamMember {
  id: string;
  nameFa: string;
  nameEn: string;
  roleFa: string;
  roleEn: string;
  focusFa: string;
  focusEn: string;
  birthJalali: string;
  isFounder?: boolean;
}

export interface ProcessStep {
  num: string;
  titleFa: string;
  titleEn: string;
  descFa: string;
  descEn: string;
}

export interface FaqItem {
  id: string;
  qFa: string;
  qEn: string;
  aFa: string;
  aEn: string;
}

export interface LabTemplate {
  id: string;
  labelFa: string;
  labelEn: string;
  code: string;
}

export const CAPABILITIES: CapabilityItem[] = [
  {
    id: 'web',
    index: '01',
    icon: 'globe',
    titleFa: 'طراحی و ساخت وب‌سایت',
    titleEn: 'Modern Websites',
    shortFa: 'سایت‌های سریع، واکنش‌گرا و اختصاصی بدون قالب‌های تکراری.',
    shortEn: 'Fast, responsive, custom-engineered websites built around your brand.',
    detailFa:
      'ساخت سایت‌های معرفی، فروشگاهی، شخصی، شرکتی و استارتاپی با طراحی اختصاصی، انیمیشن‌های روان، دو‌زبانه (فارسی/انگلیسی) و سرعت بارگذاری بالا از ایده تا انتشار.',
    detailEn:
      'From brand showcases and landing pages to full multi-page web apps with custom motion, bilingual RTL/LTR support, and production performance.',
    deliverablesFa: [
      'طراحی رابط کاربری اختصاصی و ریسپانسیو',
      'پشتیبانی کامل از موبایل، تبلت و دسکتاپ',
      'ساختار تمیز و قابل توسعه برای آینده',
    ],
    deliverablesEn: [
      'Custom responsive UI engineered from scratch',
      'Full mobile, tablet, and desktop optimization',
      'Clean, scalable codebase ready to grow',
    ],
    stack: ['React', 'TypeScript', 'Tailwind', 'GSAP'],
    estDaysMin: 5,
    estDaysMax: 12,
  },
  {
    id: 'bots',
    index: '02',
    icon: 'bot',
    titleFa: 'بات‌های هوشمند و اختصاصی',
    titleEn: 'Bots & Automation',
    shortFa: 'ساخت بات برای سروش، تلگرام، بله و سایر پیام‌رسان‌ها با امکانات اختصاصی.',
    shortEn: 'Custom bots for Soroush, Telegram, Bale, and workflow automation.',
    detailFa:
      'طراحی و توسعه بات‌های اختصاصی برای سروش، تلگرام، بله و سایر پیام‌رسان‌ها؛ از بات‌های منودار و پاسخ خودکار تا سیستم‌های ثبت سفارش، مدیریت کاربران، اطلاع‌رسانی و پشتیبانی.',
    detailEn:
      'Custom bots for Soroush, Telegram, and Bale — ranging from structured interactive menus and auto-responders to order intake, user management, and service integrations.',
    deliverablesFa: [
      'منوی شیشه‌ای و جریان مکالمه هوشمند',
      'سیستم ثبت سفارش، پشتیبانی و پیام‌رسانی',
      'اتصال به پنل مدیریت یا پایگاه داده',
    ],
    deliverablesEn: [
      'Interactive menus and structured conversation flows',
      'Order intake, support routing, and notifications',
      'Backend integration and admin controls',
    ],
    stack: ['Python', 'Bot API', 'Webhooks', 'Automation'],
    estDaysMin: 3,
    estDaysMax: 8,
  },
  {
    id: 'app',
    index: '03',
    icon: 'smartphone',
    titleFa: 'اپلیکیشن و رابط موبایل',
    titleEn: 'Mobile Applications',
    shortFa: 'تبدیل ایده موبایلی شما به محصولی کاربردی با رابط تمیز و روان.',
    shortEn: 'Turning mobile concepts into clean, fluid, practical products.',
    detailFa:
      'طراحی ساختار صفحات، تجربه کاربری و پیاده‌سازی اپلیکیشن‌های کاربردی با تمرکز روی سهولت استفاده، نظم بصری و هماهنگی بین تمام بخش‌های برنامه.',
    detailEn:
      'Designing application flows, interactive screens, and responsive mobile experiences focused on clarity, thumb reachability, and cohesive visual hierarchy.',
    deliverablesFa: [
      'طراحی کامل صفحات و مسیر کاربر',
      'نسخه وب‌اپ پیش‌رونده یا ساختار موبایل',
      'تست تعامل و بهینه‌سازی کارایی',
    ],
    deliverablesEn: [
      'Complete screen architecture and user flows',
      'Responsive mobile-first or PWA delivery',
      'Interaction testing and usability polish',
    ],
    stack: ['Mobile UI', 'PWA', 'React', 'UX Flow'],
    estDaysMin: 7,
    estDaysMax: 16,
  },
  {
    id: 'ui',
    index: '04',
    icon: 'layout',
    titleFa: 'طراحی UI/UX و محیط برنامه',
    titleEn: 'UI/UX & Interface Design',
    shortFa: 'طراحی ظاهر و تجربه کاربری منظم، مدرن و چشم‌نواز برای محصول شما.',
    shortEn: 'Thoughtful interface systems focused on clarity, contrast, and usability.',
    detailFa:
      'انتخاب پالت رنگ استاندارد، تایپوگرافی دقیق، چیدمان صفحات، طراحی تم روشن و تاریک و ایجاد یک تجربه کاربری قابل فهم که کاربر با اولین نگاه با آن ارتباط بگیرد.',
    detailEn:
      'Curated color systems, typographic hierarchy, light/dark surface pairing, and intuitive interaction patterns that make products effortless to understand.',
    deliverablesFa: [
      'سیستم رنگ، تایپوگرافی و کامپوننت‌ها',
      'پروتوتایپ تعاملی پیش از کدنویسی',
      'بازطراحی و نوسازی ظاهر پروژه‌های فعلی',
    ],
    deliverablesEn: [
      'Color, typography, and component tokens',
      'Interactive visual direction before build',
      'Interface modernization for existing products',
    ],
    stack: ['Design System', 'Prototyping', 'Dark/Light', 'RTL/LTR'],
    estDaysMin: 3,
    estDaysMax: 7,
  },
  {
    id: 'logo',
    index: '05',
    icon: 'palette',
    titleFa: 'طراحی لوگو و هویت بصری',
    titleEn: 'Logo & Visual Identity',
    shortFa: 'ساخت لوگوی اختصاصی متناسب با نام، شخصیت و داستان برند.',
    shortEn: 'Custom brand marks designed around your name, personality, and story.',
    detailFa:
      'طراحی لوگو و هویت بصری برای برندها، تیم‌ها، کانال‌ها و کسب‌وکارها با توجه به رنگ سازمانی، خوانایی در ابعاد کوچک و کاربرد در سایت و شبکه‌های اجتماعی.',
    detailEn:
      'Distinctive vector logos and visual identities built for brands, channels, and digital products — legible at favicon scale and bold on hero displays.',
    deliverablesFa: [
      'طراحی ایده اولیه و اتودهای متنوع',
      'خروجی باکیفیت و پس‌زمینه شفاف (PNG/SVG)',
      'راهنمای رنگ و کاربرد در پروفایل و سایت',
    ],
    deliverablesEn: [
      'Original concept exploration and refinement',
      'High-resolution transparent exports',
      'Palette pairing for web and social channels',
    ],
    stack: ['Vector Mark', 'Brand Palette', 'Iconography'],
    estDaysMin: 2,
    estDaysMax: 5,
  },
  {
    id: 'python',
    index: '06',
    icon: 'code',
    titleFa: 'پروژه‌ها و آموزش Python',
    titleEn: 'Python Projects & Training',
    shortFa: 'ساخت ابزارهای پایتونی و آموزش پروژه‌محور از پایه تا اجرا.',
    shortEn: 'Practical Python automation tools and project-based programming guidance.',
    detailFa:
      'توسعه اسکریپت‌ها و ابزارهای کاربردی با Python و همچنین آموزش گام‌به‌گام مفاهیم برنامه‌نویسی با رویکرد ساده، تمرین‌محور و ساخت پروژه‌های واقعی.',
    detailEn:
      'Custom Python utilities, scripts, and automation workflows alongside structured, hands-on mentoring designed to take beginners into real project building.',
    deliverablesFa: [
      'اسکریپت تمیز با راهنمای اجرا',
      'آموزش مفهومی با مثال‌های واقعی',
      'رفع خطا و بهینه‌سازی کدهای پایتون',
    ],
    deliverablesEn: [
      'Clean documented Python scripts',
      'Concept-first walkthroughs with real examples',
      'Debugging and code structure improvements',
    ],
    stack: ['Python 3', 'Automation', 'CLI', 'Scripts'],
    estDaysMin: 2,
    estDaysMax: 6,
  },
  {
    id: 'arduino',
    index: '07',
    icon: 'cpu',
    titleFa: 'پروژه‌های Arduino و الکترونیک',
    titleEn: 'Arduino & Electronics',
    shortFa: 'طراحی، کدنویسی و آموزش پروژه‌های خلاقانه سخت‌افزاری و سنسورها.',
    shortEn: 'Creative microcontroller builds, sensor wiring, and embedded C++ coding.',
    detailFa:
      'اجرا و آموزش پروژه‌های آردوینو، کار با سنسورها، ماژول‌ها، رله و نمایشگرها؛ مناسب پروژه‌های دانش‌آموزی، مسابقاتی، نمایشگاهی و ایده‌های هوشمند خانگی.',
    detailEn:
      'Designing and programming Arduino hardware prototypes with sensors, displays, and actuators — ideal for competitions, science fairs, and smart DIY builds.',
    deliverablesFa: [
      'نقشه اتصالات مدار و لیست قطعات',
      'کدنویسی کامل و تست‌شده برد آردوینو',
      'راهنمای راه‌اندازی و توسعه پروژه',
    ],
    deliverablesEn: [
      'Circuit wiring guide and parts checklist',
      'Tested Arduino sketch and logic',
      'Step-by-step setup documentation',
    ],
    stack: ['Arduino', 'C/C++', 'Sensors', 'IoT'],
    estDaysMin: 3,
    estDaysMax: 8,
  },
  {
    id: 'ppt',
    index: '08',
    icon: 'presentation',
    titleFa: 'ساخت پاورپوینت حرفه‌ای',
    titleEn: 'Executive Presentations',
    shortFa: 'ارائه‌های منظم، مدرن و تاثیرگذار برای مدرسه، دانشگاه و جلسات کاری.',
    shortEn: 'Structured, visually engaging decks for academic, startup, and work pitches.',
    detailFa:
      'طراحی اسلایدهای پاورپوینت با چیدمان تمیز، اینفوگرافیک، انیمیشن‌های متعادل و تایپوگرافی استاندارد تا ارائه شما حرفه‌ای‌تر و ماندگارتر دیده شود.',
    detailEn:
      'Clean slide architecture, custom visual diagrams, balanced transitions, and sharp typography so your school, university, or business pitch stands out.',
    deliverablesFa: [
      'طراحی اسلایدهای اختصاصی با رنگ سازمانی',
      'چیدمان حرفه‌ای نمودار و متن',
      'تحویل فایل قابل ویرایش و آماده ارائه',
    ],
    deliverablesEn: [
      'Custom slide layouts tailored to your topic',
      'Clean charts, callouts, and visual hierarchy',
      'Editable source deck ready to present',
    ],
    stack: ['Slide Architecture', 'Infographics', 'Motion'],
    estDaysMin: 2,
    estDaysMax: 4,
  },
  {
    id: 'photo',
    index: '09',
    icon: 'image',
    titleFa: 'ادیت عکس و فتوشاپ',
    titleEn: 'Photo Enhancement & Retouch',
    shortFa: 'افزایش کیفیت، اصلاح نور و رنگ، حذف پس‌زمینه و کارهای گرافیکی.',
    shortEn: 'Image restoration, color grading, compositing, and graphic retouching.',
    detailFa:
      'بهبود وضوح تصاویر، اصلاح نور و کنتراست، طراحی کاور و بنر، حذف عناصر اضافه و آماده‌سازی عکس‌های تمیز برای استفاده در وب‌سایت و شبکه‌های اجتماعی.',
    detailEn:
      'Enhancing image clarity, balancing lighting and color, removing distractions, and creating crisp banners or product visuals ready for web and social.',
    deliverablesFa: [
      'بهبود کیفیت و شارپ‌نس تصویر',
      'اصلاح رنگ و نورپردازی حرفه‌ای',
      'خروجی استاندارد وب و شبکه‌های اجتماعی',
    ],
    deliverablesEn: [
      'Clarity upscaling and detail cleanup',
      'Balanced color grading and lighting fix',
      'Web-ready exports in crisp resolution',
    ],
    stack: ['Photoshop', 'Color Grade', 'Compositing'],
    estDaysMin: 1,
    estDaysMax: 3,
  },
  {
    id: 'custom',
    index: '10',
    icon: 'sparkles',
    titleFa: 'پروژه‌های اختصاصی',
    titleEn: 'Custom Solutions',
    shortFa: 'ایده‌ای داری که در لیست نیست؟ با هم بررسی و مسیر اجرایش را می‌سازیم.',
    shortEn: 'Have an idea outside standard categories? We architect a custom solution.',
    detailFa:
      'خیلی از بهترین ایده‌ها در یک قالب از‌پیش‌تعیین‌شده جا نمی‌گیرند. ایده خودت را با ما در میان بگذار تا بهترین ترکیب تکنولوژی و طراحی را برای ساختش پیشنهاد بدهیم.',
    detailEn:
      'Great ideas rarely fit inside rigid boxes. Share your concept and we will map out the right blend of code, design, and hardware to bring it to life.',
    deliverablesFa: [
      'بررسی فنی و امکان‌سنجی ایده',
      'طراحی نقشه راه اختصاصی پروژه',
      'اجرا و تست مرحله‌به‌مرحله با شما',
    ],
    deliverablesEn: [
      'Technical feasibility and scope review',
      'Custom roadmap tailored to your goal',
      'Iterative build and collaborative testing',
    ],
    stack: ['R&D', 'Architecture', 'Full-Stack'],
    estDaysMin: 5,
    estDaysMax: 14,
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    num: '01',
    titleFa: 'کشف ایده و هدف',
    titleEn: 'Discover the Idea',
    descFa:
      'نیاز، هدف و مخاطب پروژه را دقیق مشخص می‌کنیم تا قبل از شروع، مسیر کاملاً روشن باشد.',
    descEn:
      'We clarify your project goal, audience, and core requirements before writing a single line of code.',
  },
  {
    num: '02',
    titleFa: 'طراحی ساختار و مسیر',
    titleEn: 'Architect the Path',
    descFa:
      'ظاهر، تجربه کاربری و نقشه فنی پروژه را می‌چینیم و کار را به مراحل شفاف تقسیم می‌کنیم.',
    descEn:
      'We shape the interface architecture, UX flow, and technical stack into clear, trackable milestones.',
  },
  {
    num: '03',
    titleFa: 'ساخت، تست و بازخورد',
    titleEn: 'Build, Test & Refine',
    descFa:
      'کدنویسی و طراحی انجام می‌شود، جزئیات روی دستگاه‌های مختلف تست شده و بازخورد شما اعمال می‌گردد.',
    descEn:
      'We build iteratively, verify responsiveness across screens, and fold your feedback directly into the product.',
  },
  {
    num: '04',
    titleFa: 'تحویل نهایی و توسعه',
    titleEn: 'Deliver & Scale',
    descFa:
      'نسخه نهایی با ساختار تمیز تحویل داده می‌شود تا در آینده هم بتوانید امکانات جدید اضافه کنید.',
    descEn:
      'The finished product ships with clean documentation and a modular foundation ready for future growth.',
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'ramtin',
    nameFa: 'رامتین حسین بیکی',
    nameEn: 'Ramtin Hossein Biki',
    roleFa: 'بنیان‌گذار WEBAK',
    roleEn: 'Founder of WEBAK',
    focusFa: 'رهبری تیم · معماری وب · ایده‌پردازی محصول',
    focusEn: 'Studio Lead · Web Architecture · Product Vision',
    birthJalali: '1390-10-02',
    isFounder: true,
  },
  {
    id: 'arsham',
    nameFa: 'آرشام کریمی گزافرودی',
    nameEn: 'Arsham Karimi Gazafroudi',
    roleFa: 'مهندس / توسعه‌دهنده',
    roleEn: 'Engineer / Developer',
    focusFa: 'توسعه نرم‌افزار · منطق فنی · پیاده‌سازی',
    focusEn: 'Software Engineering · Technical Systems · Build',
    birthJalali: '1390-10-17',
  },
  {
    id: 'amirali',
    nameFa: 'امیرعلی پیش سرایی',
    nameEn: 'AmirAli Pishsaraei',
    roleFa: 'عضو تیم سازنده',
    roleEn: 'Core Team Member',
    focusFa: 'همکاری فنی · تست · توسعه پروژه',
    focusEn: 'Engineering Support · QA · Project Delivery',
    birthJalali: '1391-05-23',
  },
  {
    id: 'hiva',
    nameFa: 'هیوا عصری',
    nameEn: 'Hiva Asri',
    roleFa: 'عضو تیم سازنده',
    roleEn: 'Core Team Member',
    focusFa: 'طراحی · محتوا · اجرای خلاقانه',
    focusEn: 'Creative Execution · Content · UI Polish',
    birthJalali: '1391-07-20',
  },
  {
    id: 'kian',
    nameFa: 'محمد کیان بشیری نحنجی',
    nameEn: 'Mohammad Kian Bashiri Nahanji',
    roleFa: 'عضو تیم سازنده',
    roleEn: 'Core Team Member',
    focusFa: 'ایده‌پردازی · توسعه · پشتیبانی تیم',
    focusEn: 'Ideation · Development · Team Operations',
    birthJalali: '1390-11-15',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq1',
    qFa: 'WEBAK دقیقاً چه خدماتی ارائه می‌دهد؟',
    qEn: 'What services does WEBAK provide?',
    aFa: 'طراحی و توسعه وب‌سایت، اپلیکیشن، بات و اتوماسیون، لوگو، پاورپوینت، آموزش و پروژه‌های Python و Arduino، طراحی رابط کاربری و ویرایش حرفه‌ای تصویر از خدمات ماست.',
    aEn: 'We build custom websites, mobile interfaces, bots and automation, brand logos, presentations, Python and Arduino projects, UI/UX systems, and image retouching.',
  },
  {
    id: 'faq2',
    qFa: 'برای شروع پروژه چه اطلاعاتی لازم است؟',
    qEn: 'What do you need to start a project?',
    aFa: 'کافی است یک توضیح کوتاه درباره ایده، امکانات موردنیاز، زمان تقریبی و اگر دارید نمونه یا مرجع طراحی بفرستید — یا از سازنده فوری سفارش همین صفحه استفاده کنید.',
    aEn: 'A short summary of your idea, desired capabilities, approximate timeline, and any visual reference — or simply configure your scope using the Project Brief Builder on this page.',
  },
  {
    id: 'faq3',
    qFa: 'آیا قبل از شروع، درباره هزینه و زمان صحبت می‌کنیم؟',
    qEn: 'Do we align on budget and timeline before starting?',
    aFa: 'بله. بعد از بررسی نیازهای پروژه، درباره محدوده دقیق کار، زمان تحویل و هزینه با شما شفاف هماهنگ می‌کنیم.',
    aEn: 'Yes. Once we review your project scope, we agree clearly on deliverables, timeline, and budget before any work begins.',
  },
  {
    id: 'faq4',
    qFa: 'آیا اعضای WEBAK هنوز نوجوان هستند؟',
    qEn: 'Are WEBAK team members really teenagers?',
    aFa: 'بله؛ تیم ما جوان و پرانرژی است و هم‌زمان با یادگیری مستمر، روی پروژه‌های واقعی، استانداردهای مدرن وب و تجربه‌های عملی کار می‌کند.',
    aEn: 'Yes — our team is young, hungry to learn, and combines continuous skill growth with real-world engineering and modern design discipline.',
  },
  {
    id: 'faq5',
    qFa: 'چطور می‌توانم به تیم WEBAK بپیوندم؟',
    qEn: 'How can I apply to join the WEBAK team?',
    aFa: 'از بخش «پیوستن به تیم» فرم درخواست را کامل کن؛ متن درخواست به‌صورت مرتب آماده و کپی می‌شود تا مستقیم در سروش برای رامتین ارسال کنی.',
    aEn: 'Open the Join Team form in the Team section, fill in your details and skills, copy the formatted application, and send it straight to Ramtin on Soroush.',
  },
  {
    id: 'faq6',
    qFa: 'آیا سایت‌هایی که می‌سازید روی موبایل هم عالی نمایش داده می‌شوند؟',
    qEn: 'Are the websites you build responsive on mobile?',
    aFa: 'بله؛ تمام پروژه‌ها با طراحی واکنش‌گرا (Responsive) برای موبایل، تبلت و دسکتاپ تنظیم و تست می‌شوند.',
    aEn: 'Yes. Every interface we build is responsive and tested across mobile, tablet, and widescreen desktop viewports.',
  },
  {
    id: 'faq7',
    qFa: 'امنیت پروژه‌ها و سایت WEBAK چطور است؟',
    qEn: 'How do you handle security and reliability?',
    aFa: 'امنیت و ساختار سالم کد برای ما مهم است و از HTTPS و اصول استاندارد توسعه وب استفاده می‌کنیم. با این حال هیچ سیستم آنلاینی را نمی‌توان ۱۰۰٪ بدون ریسک ادعا کرد.',
    aEn: 'We follow modern web security practices, HTTPS, and sandboxed previews (such as our HTML Lab iframe). While no online site can honestly claim 100% invulnerability, clean architecture is our baseline.',
  },
  {
    id: 'faq8',
    qFa: 'آیا پروژه بعداً قابل توسعه و ارتقا است؟',
    qEn: 'Can a project be expanded with new features later?',
    aFa: 'بله؛ کدها و ساختار پروژه را ماژولار و مرتب طراحی می‌کنیم تا اضافه کردن قابلیت‌های جدید در آینده ساده و کم‌هزینه باشد.',
    aEn: 'Yes. We write modular, structured code so adding new capabilities, pages, or integrations later is straightforward.',
  },
  {
    id: 'faq9',
    qFa: 'آزمایشگاه HTML داخل سایت چطور کار می‌کند؟',
    qEn: 'How does the built-in HTML Lab work?',
    aFa: 'آزمایشگاه HTML کدهای HTML/CSS/JS شما را به‌صورت زنده و ایزوله در مرورگر خودتان اجرا می‌کند؛ عالی برای تست سریع ایده و کد!',
    aEn: 'The HTML Lab runs your HTML, CSS, and JavaScript live inside a sandboxed browser iframe in real time — ideal for rapid prototyping and testing.',
  },
  {
    id: 'faq10',
    qFa: 'اگر ایده‌ام در لیست خدمات نباشد چه؟',
    qEn: 'What if my idea is not listed among the 10 services?',
    aFa: 'مشکلی نیست؛ ایده را در بخش تخمین‌گر پروژه یا گفت‌وگو شرح بده تا بررسی کنیم چطور می‌توانیم یک راهکار اختصاصی برایش بسازیم.',
    aEn: 'No problem at all — describe your concept in the Project Brief Builder or message us directly, and we will explore a custom approach together.',
  },
];

export const LAB_TEMPLATES: LabTemplate[] = [
  {
    id: 'welcome',
    labelFa: 'کارت معرفی WEBAK',
    labelEn: 'WEBAK Studio Card',
    code: `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
<style>
  body {
    margin: 0; min-height: 100vh; display: grid; place-items: center;
    background: #080c14; color: #f4f6fb; font-family: Tahoma, sans-serif;
  }
  .card {
    max-width: 340px; padding: 28px; border-radius: 20px; text-align: center;
    background: linear-gradient(145deg, rgba(255,107,0,0.14), rgba(255,255,255,0.03));
    border: 1px solid rgba(255,107,0,0.35);
    box-shadow: 0 24px 50px rgba(0,0,0,0.45);
  }
  h1 { color: #ff6b00; margin: 0 0 10px; font-size: 22px; }
  p { color: #9aa7bc; font-size: 14px; line-height: 1.8; margin: 0 0 18px; }
  button {
    padding: 10px 22px; border: 0; border-radius: 99px; cursor: pointer;
    background: #ff6b00; color: #fff; font-weight: bold; font-size: 13px;
    transition: transform .2s ease;
  }
  button:hover { transform: translateY(-2px); }
</style>
</head>
<body>
  <div class="card">
    <h1>سلام از آزمایشگاه WEBAK</h1>
    <p>کد سمت چپ را ویرایش کن و تغییر زنده را همین لحظه ببین!</p>
    <button id="btn" onclick="document.getElementById('btn').textContent='آماده ساخت پروژه!'">تست تعامل</button>
  </div>
</body>
</html>`,
  },
  {
    id: 'gradient-cta',
    labelFa: 'دکمه تعاملی مدرن',
    labelEn: 'Interactive UI Button',
    code: `<!DOCTYPE html>
<html>
<head>
<style>
  body {
    margin: 0; min-height: 100vh; display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 16px;
    background: #0d111a; color: #eef2f7; font-family: system-ui, sans-serif;
  }
  .pill {
    padding: 14px 32px; border-radius: 999px; border: 1px solid rgba(255,107,0,0.5);
    background: linear-gradient(135deg, #ff6b00, #ff3d00);
    color: white; font-weight: 700; font-size: 15px; cursor: pointer;
    box-shadow: 0 12px 32px rgba(255,107,0,0.35);
    transition: all 0.25s cubic-bezier(0.16,1,0.3,1);
  }
  .pill:hover { transform: scale(1.06); box-shadow: 0 18px 42px rgba(255,107,0,0.5); }
  .pill:active { transform: scale(0.96); }
  #count { font-family: monospace; color: #ff9d3b; font-size: 14px; }
</style>
</head>
<body>
  <button class="pill" onclick="inc()">Launch Prototype ↗</button>
  <div id="count">Clicks: 0</div>
  <script>
    let n = 0;
    function inc() {
      n++;
      document.getElementById('count').textContent = 'Clicks: ' + n;
    }
  </script>
</body>
</html>`,
  },
  {
    id: 'profile-grid',
    labelFa: 'چیدمان مدرن کارت',
    labelEn: 'Editorial Grid Layout',
    code: `<!DOCTYPE html>
<html>
<head>
<style>
  * { box-sizing: border-box; }
  body {
    margin: 0; padding: 24px; min-height: 100vh;
    background: #f6f7fa; color: #101622; font-family: system-ui, sans-serif;
  }
  .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .tile {
    padding: 18px; border-radius: 14px; background: #fff;
    border: 1px solid rgba(16,22,34,0.09);
  }
  .tile.span2 { grid-column: span 2; background: #101622; color: #fff; }
  .num { font-family: monospace; color: #ff6b00; font-size: 12px; font-weight: 700; }
  h3 { margin: 6px 0 4px; font-size: 16px; }
  p { margin: 0; font-size: 12px; opacity: 0.72; }
</style>
</head>
<body>
  <div class="grid">
    <div class="tile span2">
      <div class="num">01 · ARCHITECTURE</div>
      <h3>WEBAK Layout Engine</h3>
      <p>Clean hierarchy, high contrast, responsive by default.</p>
    </div>
    <div class="tile">
      <div class="num">02 · SPEED</div>
      <h3>Sub-second load</h3>
      <p>Optimized bundles</p>
    </div>
    <div class="tile">
      <div class="num">03 · CRAFT</div>
      <h3>Custom Motion</h3>
      <p>Smooth 60fps transitions</p>
    </div>
  </div>
</body>
</html>`,
  },
];

export const UI_COPY = {
  fa: {
    navServices: 'خدمات',
    navEstimator: 'سفارش پروژه',
    navProcess: 'فرآیند',
    navTeam: 'تیم ما',
    navLab: 'آزمایشگاه',
    navContact: 'ارتباط',
    navCta: 'شروع پروژه',
    heroKicker: 'استودیوی خلاق دیجیتال · WEBAK',
    heroTitle1: 'ایده‌ات را',
    heroTitleAccent: 'دیجیتال',
    heroTitle2: 'و ماندگار می‌سازیم.',
    heroDesc:
      'WEBAK یک تیم نوجوان، دقیق و خلاق برای ساخت وب‌سایت، اپلیکیشن، بات، هویت بصری و پروژه‌های تعاملی است؛ جایی که ایده‌ها از روی کاغذ به محصول واقعی تبدیل می‌شوند.',
    heroPrimaryCta: 'طراحی و برآورد پروژه',
    heroSecondaryCta: 'مشاهده قابلیت‌ها',
    stageCaption1: 'ساخت · خلق · انتشار',
    stageCaption2: 'توسعه اختصاصی',
    pillar1Num: '01',
    pillar1Label: 'ایده تا محصول نهایی',
    pillar2Num: '60fps',
    pillar2Label: 'اجرای سریع و روان',
    pillar3Num: '10+',
    pillar3Label: 'حوزه تخصصی فعال',
    pillar4Num: 'FA / EN',
    pillar4Label: 'دو‌زبانه و ریسپانسیو',
    servicesKicker: 'قابلیت‌ها و خدمات',
    servicesTitle1: 'چیزهایی می‌سازیم که',
    servicesTitleAccent: 'دیده و استفاده می‌شوند.',
    servicesDesc:
      'هر کدام از خدمات زیر را انتخاب کن تا جزئیات فنی، خروجی‌ها و زمان تقریبی اجرا را ببینی یا مستقیم به سفارش خودت اضافه کنی.',
    deliverablesLabel: 'خروجی‌های تحویلی',
    timelineLabel: 'زمان تقریبی اجرا',
    daysUnit: 'روز کاری',
    addToBrief: 'افزودن به سفارش پروژه',
    addedToBrief: 'در سفارش پروژه انتخاب شد ✓',
    goToBrief: 'تکمیل سفارش پروژه',
    estimatorKicker: 'سازنده هوشمند سفارش',
    estimatorTitle1: 'سفارش پروژه‌ات را',
    estimatorTitleAccent: 'در ۳۰ ثانیه ببند.',
    estimatorDesc:
      'خدمات مورد نیاز، مقیاس پروژه و زمان دلخواهت را انتخاب کن تا خلاصه پروژه آماده، زمان تقریبی محاسبه و با یک کلیک برای تیم ارسال شود.',
    stepServices: '۱. انتخاب خدمات موردنیاز',
    stepScale: '۲. مقیاس و سطح پروژه',
    stepPace: '۳. سرعت تحویل',
    stepNotes: '۴. توضیح کوتاه ایده یا نام برند (اختیاری)',
    notesPlaceholder: 'مثلاً: یک سایت فروشگاهی مدرن با درگاه و پنل یا بات سفارش‌گیر برای سروش...',
    scales: [
      { id: 'starter', label: 'استارتر (ساده و سریع)', desc: 'ایده اولیه / صفحه تک‌منظوره', mult: 0.8 },
      { id: 'standard', label: 'استاندارد (حرفه‌ای)', desc: 'کامل و اختصاصی برای برند', mult: 1.0 },
      { id: 'flagship', label: 'اختصاصی پیشرفته (VIP)', desc: 'امکانات کامل + انیمیشن و شخصی‌سازی', mult: 1.45 },
    ],
    paces: [
      { id: 'flexible', label: 'منعطف', mult: 1.2 },
      { id: 'standard', label: 'عادی', mult: 1.0 },
      { id: 'priority', label: 'فوری (اولویت بالا)', mult: 0.7 },
    ],
    briefPreviewTitle: 'خلاصه آماده سفارش شما',
    estRangeLabel: 'زمان تخمینی آماده‌سازی',
    selectedCountLabel: 'سرویس انتخاب‌شده',
    emptySelectionMsg: 'حداقل یک خدمت از بالا انتخاب کن تا خلاصه سفارش ساخته شود.',
    copyBriefBtn: 'کپی خلاصه سفارش',
    copiedBriefBtn: 'کپی شد! آماده ارسال',
    sendSoroushBtn: 'ارسال مستقیم در سروش (@RAMtinHB)',
    sendEmailBtn: 'ارسال با ایمیل',
    processKicker: 'مسیر اجرای پروژه',
    processTitle1: 'از اولین ایده تا',
    processTitleAccent: 'نسخه نهایی.',
    processDesc: 'شفاف، مرحله‌به‌مرحله و با درگیر کردن شما در تمام تصمیم‌های مهم.',
    teamKicker: 'تیم سازنده WEBAK',
    teamTitle1: 'پشت هر خط کد،',
    teamTitleAccent: 'انگیزه و دقت ماست.',
    teamDesc:
      'تیمی از نوجوانان علاقه‌مند به مهندسی نرم‌افزار و طراحی که یادگیری، کیفیت و تحویل واقعی را جدی گرفته‌اند.',
    founderBadge: 'بنیان‌گذار',
    yearsLabel: 'ساله',
    teamNote:
      'بله، اعضای تیم ما هنوز نوجوان هستند؛ اما یادگیری، نظم مهندسی و تجربه ساخت پروژه‌های واقعی را از همین حالا جدی گرفته‌ایم.',
    joinBtnOpen: 'پیوستن به تیم سازنده',
    joinBtnClose: 'بستن فرم عضویت',
    joinCardTitle: 'دوست داری عضو WEBAK بشی؟',
    joinCardDesc:
      'اگر به برنامه‌نویسی، طراحی UI، بات‌سازی، پایتون، آردوینو یا تولید محتوا علاقه داری، فرم عضویت را پر کن تا درخواستت برای بررسی آماده شود.',
    joinName: 'نام و نام خانوادگی *',
    joinNamePh: 'مثلاً علی رضایی',
    joinBirth: 'سال تولد (شمسی) *',
    joinBirthPh: 'مثلاً 1392',
    joinAge: 'سن *',
    joinAgePh: 'مثلاً 14',
    joinSchool: 'مدرسه *',
    joinSchoolPh: 'نام مدرسه',
    joinHow: 'راه آشنایی با WEBAK *',
    joinHowPh: 'معرفی دوست / سایت / سروش',
    joinSoroush: 'آیدی سروش',
    joinSoroushPh: '@username',
    joinPhone: 'شماره تماس',
    joinPhonePh: '09xxxxxxxxx',
    joinSkills: 'مهارت‌ها و توضیحات',
    joinSkillsPh: 'چه مهارت‌هایی داری یا دوست داری در چه بخشی همکاری کنی؟',
    joinCopyBtn: 'ساخت و کپی درخواست عضویت',
    joinSoroushBtn: 'ارسال به رامتین در سروش',
    joinCopiedStatus: 'متن درخواست کپی شد! حالا روی «ارسال به رامتین در سروش» بزن و پیست کن.',
    joinErrorStatus: 'لطفاً فیلدهای ستاره‌دار را کامل کن.',
    labKicker: 'آزمایشگاه تعاملی کد',
    labTitle1: 'همین‌جا کد بنویس و',
    labTitleAccent: 'زنده تست کن.',
    labDesc:
      'یک محیط ایزوله و سریع برای تست HTML، CSS و JavaScript در پیش‌نمایش دسکتاپ یا موبایل.',
    labRun: 'اجرای زنده',
    labReset: 'بازنشانی',
    labCopy: 'کپی کد',
    labCopied: 'کپی شد',
    labDesktop: 'نمای دسکتاپ',
    labMobile: 'نمای موبایل',
    faqKicker: 'پرسش‌های متداول',
    faqTitle1: 'پاسخ شفاف به',
    faqTitleAccent: 'سوالات شما.',
    faqDesc: 'اگر سوالی قبل از شروع همکاری در ذهنت هست، احتمالاً جوابش اینجاست.',
    faqSearchPh: 'جستجو در سوالات...',
    faqEmpty: 'نتیجه‌ای برای جستجوی شما پیدا نشد.',
    ctaBannerTitle: 'ایده‌ات آماده ساخته شدنه؟',
    ctaBannerDesc:
      'حتی اگر هنوز فقط یک ایده کلی در ذهنت داری، با هم درباره بهترین راه ساختنش صحبت می‌کنیم.',
    ctaBannerBtn: 'شروع گفتگو در سروش',
    contactKicker: 'راه‌های ارتباطی مستقیم',
    contactTitle1: 'بیا در',
    contactTitleAccent: 'ارتباط باشیم.',
    contactDesc: 'روی هر کارت بزن تا باز شود، یا آیدی/شماره را مستقیم کپی کن.',
    contacts: [
      { label: 'سروش شخصی', value: '@RAMtinHB', href: 'https://splus.ir/RAMtinHB', copy: '@RAMtinHB' },
      { label: 'بات سروش WEBAK', value: '@webakbot', href: 'https://splus.ir/webakbot', copy: '@webakbot' },
      { label: 'کانال رسمی', value: 'splus.ir/WEBAK', href: 'https://splus.ir/WEBAK', copy: 'https://splus.ir/WEBAK' },
      { label: 'گیت‌هاب', value: 'ramtinhossinbiki-afk', href: 'https://github.com/ramtinhossinbiki-afk', copy: 'https://github.com/ramtinhossinbiki-afk' },
      { label: 'شماره تماس', value: '09300545003', href: 'tel:09300545003', copy: '09300545003' },
      { label: 'ایمیل', value: 'ramtinbiki@gmail.com', href: 'mailto:ramtinbiki@gmail.com', copy: 'ramtinbiki@gmail.com' },
    ],
    footerTag: 'ساخته‌شده با ایده، کد و دقت مهندسی',
    themeLabel: 'تم ظاهر',
    themeDark: 'تاریک',
    themeLight: 'روشن',
    themeCustom: 'اختصاصی',
    customPaletteTitle: 'پالت رنگی اختصاصی',
    customColorLabel: 'رنگ دلخواه',
    backTop: 'بازگشت به بالا',
  },
  en: {
    navServices: 'Services',
    navEstimator: 'Estimator',
    navProcess: 'Process',
    navTeam: 'Team',
    navLab: 'HTML Lab',
    navContact: 'Contact',
    navCta: 'Start Project',
    heroKicker: 'Creative Digital Studio · WEBAK',
    heroTitle1: 'We turn your',
    heroTitleAccent: 'ideas',
    heroTitle2: 'into digital reality.',
    heroDesc:
      'WEBAK is a young, driven digital studio building custom websites, mobile interfaces, smart bots, and interactive software — where concepts don’t stay on paper.',
    heroPrimaryCta: 'Build Project Brief',
    heroSecondaryCta: 'Explore Capabilities',
    stageCaption1: 'Build · Create · Ship',
    stageCaption2: 'Custom Studio',
    pillar1Num: '01',
    pillar1Label: 'Concept to Launch',
    pillar2Num: '60fps',
    pillar2Label: 'Motion & Speed',
    pillar3Num: '10+',
    pillar3Label: 'Active Disciplines',
    pillar4Num: 'FA / EN',
    pillar4Label: 'Bilingual RTL & LTR',
    servicesKicker: 'Capabilities',
    servicesTitle1: 'We build products that',
    servicesTitleAccent: 'command attention.',
    servicesDesc:
      'Select any discipline below to inspect technical deliverables, typical turnaround, and add it directly to your interactive project brief.',
    deliverablesLabel: 'Included Deliverables',
    timelineLabel: 'Estimated Turnaround',
    daysUnit: 'business days',
    addToBrief: 'Add to Project Brief',
    addedToBrief: 'Added to Brief ✓',
    goToBrief: 'Open Project Brief',
    estimatorKicker: 'Interactive Scope Builder',
    estimatorTitle1: 'Configure your project',
    estimatorTitleAccent: 'in 30 seconds.',
    estimatorDesc:
      'Pick the capabilities you need, select your scale and pace, and generate a structured brief ready to send straight to our team.',
    stepServices: '1. Select Capabilities',
    stepScale: '2. Project Scale',
    stepPace: '3. Delivery Pace',
    stepNotes: '4. Project Vision or Brand Name (optional)',
    notesPlaceholder: 'e.g., A bilingual studio landing page or a custom order-taking bot for Soroush...',
    scales: [
      { id: 'starter', label: 'Starter (Lean)', desc: 'Single-purpose launch / MVP', mult: 0.8 },
      { id: 'standard', label: 'Standard (Studio)', desc: 'Complete custom build', mult: 1.0 },
      { id: 'flagship', label: 'Flagship (Custom Pro)', desc: 'Full interactive motion + custom systems', mult: 1.45 },
    ],
    paces: [
      { id: 'flexible', label: 'Flexible', mult: 1.2 },
      { id: 'standard', label: 'Standard', mult: 1.0 },
      { id: 'priority', label: 'Priority Sprint', mult: 0.7 },
    ],
    briefPreviewTitle: 'Your Formatted Project Brief',
    estRangeLabel: 'Estimated Build Window',
    selectedCountLabel: 'Selected Services',
    emptySelectionMsg: 'Select at least one capability above to generate your brief.',
    copyBriefBtn: 'Copy Project Brief',
    copiedBriefBtn: 'Copied! Ready to Send',
    sendSoroushBtn: 'Send via Soroush (@RAMtinHB)',
    sendEmailBtn: 'Send via Email',
    processKicker: 'How We Work',
    processTitle1: 'From raw idea to',
    processTitleAccent: 'shipped product.',
    processDesc: 'Clear communication, deliberate engineering, and milestone-based execution.',
    teamKicker: 'The Team',
    teamTitle1: 'Behind every pixel,',
    teamTitleAccent: 'there’s our crew.',
    teamDesc:
      'A dedicated team of young engineers and designers who take learning, craft, and real-world execution seriously.',
    founderBadge: 'Founder',
    yearsLabel: 'yrs old',
    teamNote:
      'Yes, our team members are still teenagers — and we take engineering discipline, visual craft, and shipping real work seriously.',
    joinBtnOpen: 'Apply to Join WEBAK',
    joinBtnClose: 'Close Application',
    joinCardTitle: 'Want to build with WEBAK?',
    joinCardDesc:
      'If you love programming, UI design, bot engineering, Python, Arduino, or creative production, complete the form to prepare your application.',
    joinName: 'Full Name *',
    joinNamePh: 'e.g., Ali Rezaei',
    joinBirth: 'Birth Year (Jalali) *',
    joinBirthPh: 'e.g., 1392',
    joinAge: 'Age *',
    joinAgePh: 'e.g., 14',
    joinSchool: 'School *',
    joinSchoolPh: 'School name',
    joinHow: 'How did you find WEBAK? *',
    joinHowPh: 'Friend / Website / Soroush',
    joinSoroush: 'Soroush ID',
    joinSoroushPh: '@username',
    joinPhone: 'Phone Number',
    joinPhonePh: '09xxxxxxxxx',
    joinSkills: 'Skills & Interests',
    joinSkillsPh: 'Tell us what you build or want to learn with WEBAK...',
    joinCopyBtn: 'Build & Copy Application',
    joinSoroushBtn: 'Open Ramtin on Soroush',
    joinCopiedStatus: 'Application copied! Open Soroush and paste it to Ramtin.',
    joinErrorStatus: 'Please fill in all required (*) fields.',
    labKicker: 'Interactive Code Studio',
    labTitle1: 'Write code and preview',
    labTitleAccent: 'live in browser.',
    labDesc:
      'A sandboxed live HTML, CSS, and JavaScript playground with desktop and mobile viewport testing.',
    labRun: 'Run Code',
    labReset: 'Reset',
    labCopy: 'Copy Code',
    labCopied: 'Copied',
    labDesktop: 'Desktop',
    labMobile: 'Mobile',
    faqKicker: 'FAQ',
    faqTitle1: 'Clear answers before',
    faqTitleAccent: 'we start.',
    faqDesc: 'Everything prospective clients and collaborators usually ask.',
    faqSearchPh: 'Search questions...',
    faqEmpty: 'No matching questions found.',
    ctaBannerTitle: 'Ready to turn your idea into a real product?',
    ctaBannerDesc:
      'Even if you only have a rough sketch or concept, let’s talk through how to build it properly.',
    ctaBannerBtn: 'Message on Soroush',
    contactKicker: 'Direct Contact',
    contactTitle1: 'Let’s stay',
    contactTitleAccent: 'in touch.',
    contactDesc: 'Click any channel to connect, or copy an ID directly.',
    contacts: [
      { label: 'Soroush Direct', value: '@RAMtinHB', href: 'https://splus.ir/RAMtinHB', copy: '@RAMtinHB' },
      { label: 'Soroush Bot', value: '@webakbot', href: 'https://splus.ir/webakbot', copy: '@webakbot' },
      { label: 'Official Channel', value: 'splus.ir/WEBAK', href: 'https://splus.ir/WEBAK', copy: 'https://splus.ir/WEBAK' },
      { label: 'GitHub', value: 'ramtinhossinbiki-afk', href: 'https://github.com/ramtinhossinbiki-afk', copy: 'https://github.com/ramtinhossinbiki-afk' },
      { label: 'Phone', value: '09300545003', href: 'tel:09300545003', copy: '09300545003' },
      { label: 'Email', value: 'ramtinbiki@gmail.com', href: 'mailto:ramtinbiki@gmail.com', copy: 'ramtinbiki@gmail.com' },
    ],
    footerTag: 'Crafted with ideas, code, and precision',
    themeLabel: 'Theme',
    themeDark: 'Dark',
    themeLight: 'Light',
    themeCustom: 'Custom',
    customPaletteTitle: 'Custom Studio Palette',
    customColorLabel: 'Custom Hex',
    backTop: 'Back to top',
  },
} as const;
