

export const PROFILE = {
  name: 'John Robert Santos',
  user: 'guest',
  host: 'jrcsantos',
  nicknames: ['JR', 'Jahn', 'Janners', 'Jawn'],
  role: 'Aspiring Network Administrator & Software Developer',
  location: 'Philippines',
  birthdate: '2003-08-28',
  email: 'johnrobert.formal@gmail.com',
  phone: '+(63)955-345-2050',
  github: 'https://github.com/JannersLSR',
  twitter: 'https://twitter.com/jawnerS_',
  linkedin: 'https://www.linkedin.com/in/jannerslsr/',
  resume: './assets/Santos_JohnRobertC.-Resume.pdf',
};

export const PROJECTS = [
  {
    id: 'clockin',
    title: 'Clock-In',
    role: 'Project Manager & Lead Mobile Dev',
    tech: 'Kotlin & Supabase',
    arch: 'kotlin',
    desc: 'Multi-factor auth system using BLE Beacons, QR Codes, and WiFi for secure employee tracking.',
    url: 'https://github.com/SuperficialFlow/ClockIn-Application-Demo',
    depends: ['supabase', 'ble-beacons', 'qr-codes', 'wifi'],
    installDate: '2024',
  },
  {
    id: 'rubiks-cipher',
    title: "Rubik's Cube Cipher",
    role: 'Security Researcher & Lead Dev',
    tech: 'Python',
    arch: 'python',
    desc: "Custom cryptographic algorithm simulating bit-level Rubik's Cube rotations for data obfuscation.",
    url: 'https://github.com/JannersLSR/Rubik-s-Cube-Cipher',
    depends: ['python', 'numpy'],
    installDate: '2024',
  },
  {
    id: 'cryptool',
    title: 'Cryptool',
    role: 'Backend Developer',
    tech: 'ASP.NET, SQL, & C#',
    arch: 'csharp',
    desc: 'Modular codebase for efficient processing of encryption and decryption tasks.',
    url: 'https://github.com/jp-gerona/cryptool',
    depends: ['aspnet', 'sql', 'dotnet'],
    installDate: '2024',
  },
  {
    id: 'tictactoe',
    title: 'Tic-Tac-Toe in Assembly',
    role: 'Lead Developer',
    tech: 'x86 Assembly',
    arch: 'x86_64',
    desc: 'Fully functional Tic-Tac-Toe with direct hardware interactions and memory addressing.',
    url: 'https://github.com/JannersLSR/Tic-Tac-Toe-in-Assembly',
    depends: ['nasm', 'bios-interrupts'],
    installDate: '2023',
  },
  {
    id: 'ccis-dashboard',
    title: 'CCIS Week Dashboard',
    role: 'Full Stack Developer',
    tech: 'JavaScript, HTML, & CSS',
    arch: 'javascript',
    desc: 'Centralized event management dashboard with Oracle DB and Node.js for real-time tracking.',
    url: 'https://github.com/JannersLSR/CCIS_Week_Dashboard',
    depends: ['nodejs', 'oracle-db', 'express'],
    installDate: '2024',
  },
  {
    id: 'pokedexcards',
    title: 'PokedexCards',
    role: 'Full Stack Developer',
    tech: 'C# & PHP',
    arch: 'csharp',
    desc: 'Database of Pokémon cards for streamlined tracking of information.',
    url: 'https://github.com/BirdBrain34/PokedexCards',
    depends: ['php', 'mysql', 'dotnet'],
    installDate: '2023',
  },
  {
    id: 'jukeboxd',
    title: 'Jukeboxd',
    role: 'Full-Stack Developer',
    tech: 'ASP.NET, SQL, & C#',
    arch: 'csharp',
    desc: 'E-commerce platform for vinyl collectors with dual-interface and relational database management.',
    url: 'https://github.com/jp-gerona/Jukeboxd',
    depends: ['aspnet', 'sql', 'dotnet'],
    installDate: '2024',
  },
  {
    id: 'orbit',
    title: 'Orbit',
    role: 'Backend Developer',
    tech: 'JavaScript, HTML, & CSS',
    arch: 'javascript',
    desc: 'Scalable micro-blogging platform with real-time feeds and user authentication.',
    url: 'https://github.com/jp-gerona/Orbit',
    depends: ['nodejs', 'websockets', 'auth'],
    installDate: '2024',
  },
  {
    id: 'eap',
    title: 'EAP — Employee Assistance Portal',
    role: 'Full Stack Developer',
    tech: 'TypeScript, JavaScript, PHP, Laravel',
    arch: 'typescript',
    desc: 'HRIS management website for MPIRE Corporate Group Inc. Next.js/React front end with a PHP Laravel back end.',
    private: true,
    depends: ['nextjs', 'tanstack-query', 'zustand', 'zod', 'tailwindcss'],
    installDate: '2026',
  },
  {
    id: 'aio-media-converter',
    title: 'AIO Media Converter',
    role: 'Lead Developer',
    tech: 'Python, Tkinter, FFmpeg',
    arch: 'python',
    desc: 'Desktop app for batch cross-converting media files. Multithreaded pipeline with real-time progress and drag-and-drop.',
    url: 'https://github.com/JannersLSR/aio-media-converter',
    depends: ['tkinter', 'ffmpeg', 'pillow', 'tkinterdnd2'],
    installDate: '2026',
  },
];

export const CERTS = [
  {
    id: 'cloud-fundamentals',
    title: 'Cloud Computing Fundamentals',
    issuer: 'Google Cloud Skills Boost',
    desc: 'Overview of cloud computing, ways to use Google Cloud, and different compute options.',
    url: 'https://www.skills.google/public_profiles/134c36f7-81cc-46eb-aacb-b4517810a607/badges/14077269',
  },
  {
    id: 'infrastructure-gcp',
    title: 'Infrastructure in Google Cloud',
    issuer: 'Google Cloud Skills Boost',
    desc: 'Foundations courses providing an overview of infrastructure concepts central to cloud basics.',
    url: 'https://www.skills.google/public_profiles/134c36f7-81cc-46eb-aacb-b4517810a607/badges/14092711',
  },
  {
    id: 'networking-security-gcp',
    title: 'Networking & Security in Google Cloud',
    issuer: 'Google Cloud Skills Boost',
    desc: 'Covers cloud automation and management tools, and building secure networks.',
    url: 'https://www.skills.google/public_profiles/134c36f7-81cc-46eb-aacb-b4517810a607/badges/14094504',
  },
  {
    id: 'data-ml-ai-gcp',
    title: 'Data, ML, and AI in Google Cloud',
    issuer: 'Google Cloud Skills Boost',
    desc: 'Reviews managed big data services, machine learning and its value in Google Cloud.',
    url: 'https://www.skills.google/public_profiles/134c36f7-81cc-46eb-aacb-b4517810a607/badges/14114469',
  },
  {
    id: 'load-balancing',
    title: 'Implement Load Balancing on Compute Engine',
    issuer: 'Google Cloud Skills Boost',
    desc: 'Creating and deploying virtual machines, and configuring network and HTTP load balancers.',
    url: 'https://www.skills.google/public_profiles/134c36f7-81cc-46eb-aacb-b4517810a607/badges/14424096',
  },
  {
    id: 'app-dev-env',
    title: 'Set Up an App Dev Environment on Google Cloud',
    issuer: 'Google Cloud Skills Boost',
    desc: 'Build and connect storage-centric cloud infrastructure using IAM, Cloud Functions, and Pub/Sub.',
    url: 'https://www.skills.google/public_profiles/134c36f7-81cc-46eb-aacb-b4517810a607/badges/14424620',
  },
  {
    id: 'secure-network',
    title: 'Build a Secure Google Cloud Network',
    issuer: 'Google Cloud Skills Boost',
    desc: 'Multiple networking-related resources to build, scale, and secure your applications.',
    url: 'https://www.skills.google/public_profiles/134c36f7-81cc-46eb-aacb-b4517810a607/badges/14448051',
  },
  {
    id: 'prepare-data-ml',
    title: 'Prepare Data for ML APIs on Google Cloud',
    issuer: 'Google Cloud Skills Boost',
    desc: 'Cleaning data, running data pipelines, and calling ML APIs including NLP and Video Intelligence.',
    url: 'https://www.skills.google/public_profiles/134c36f7-81cc-46eb-aacb-b4517810a607/badges/14448234',
  },
  {
    id: 'comptia-techplus',
    title: 'CompTIA Tech+ Certification',
    issuer: 'CompTIA',
    desc: 'Knowledge and skills to identify and explain computing, IT infrastructure, applications, and security basics.',
    url: 'https://www.credly.com/badges/fb5e596c-7770-4837-a6d6-783b9ed0338d',
  },
  {
    id: 'language-of-design',
    title: 'The Language of Design: Form and Meaning',
    issuer: 'California Institute of the Arts',
    desc: 'Verified successful completion of the course on Coursera.',
    url: 'https://www.coursera.org/account/accomplishments/verify/MKRYZD1FK4Z8',
  },
  {
    id: 'codechum-python',
    title: 'Python Course',
    issuer: 'CodeChum',
    issued: 'Dec 2022',
    desc: 'Certificate of Completion for the CodeChum Python Course.',
  },
  {
    id: 'google-dev-program',
    title: 'Google Developer Program',
    issuer: 'Google Cloud Skills Boost',
    issued: 'Jan 2026',
    desc: 'Member of the Google Developer Program.',
  },
  {
    id: 'google-cloud-innovator',
    title: 'Google Cloud Innovator',
    issuer: 'Google Cloud Skills Boost',
    issued: 'Jan 2026',
    desc: 'Member of the Google Cloud Innovator Program.',
  },
];

export const GROUPS = [
  { id: 'triples', name: 'tripleS', img: './assets/groups/triples.jpg' },
  { id: 'fromis', name: 'fromis_9', img: './assets/groups/fromis.jpg' },
  { id: 'billlie', name: 'Billlie', img: './assets/groups/billlie.jpg' },
  { id: 'illit', name: 'ILLIT', img: './assets/groups/illit.jpg' },
  { id: 'rescene', name: 'RESCENE', img: './assets/groups/rescene.jpg' },
  { id: 'saymyname', name: 'SAY MY NAME', img: './assets/groups/saymyname.jpg' },
  { id: 'ifeye', name: 'ifeye', img: './assets/groups/ifeye.jpg' },
];

export const SKILLS = [
  { cat: 'Languages', items: ['Python', 'PHP', 'Java', 'C#', 'C++', 'Kotlin', 'JavaScript', 'TypeScript', 'x86 Assembly'] },
  { cat: 'Frontend', items: ['HTML', 'CSS', 'Tailwind CSS 4', 'React 19', 'Next.js 16', 'Shadcn UI (Radix UI)', 'Lucide React'] },
  { cat: 'Backend & DB', items: ['ASP.NET', 'SQL', 'MySQL', 'PostgreSQL', 'Supabase', 'Firebase', 'Laravel Echo'] },
  { cat: 'State & Data', items: ['Zustand', 'TanStack React Query', 'TanStack Table', 'TanStack React Form', 'Axios'] },
  { cat: 'Validation', items: ['Zod'] },
  { cat: 'Animation & UI', items: ['motion (Framer Motion)', 'Recharts', 'Sonner', '@dnd-kit', 'next-themes'] },
  { cat: 'IoT & Embedded', items: ['Arduino', 'FreeRTOS', 'BLE Beacons'] },
  { cat: 'DevOps & Tools', items: ['Git', 'GitHub', 'Linux', 'Docker', 'Docker Compose', 'Composer', 'Laravel Sail'] },
  { cat: 'Platforms', items: ['Android Studio', 'Cisco Packet Tracer'] },
  { cat: 'Realtime', items: ['Laravel Echo', 'Pusher'] },
  { cat: 'Desktop & Media', items: ['Tkinter', 'FFmpeg', 'Pillow', 'tkinterdnd2'] },
];

export const L = {
  n: (text) => ({ type: 'normal', text }),
  h: (text) => ({ type: 'header', text }),
  ok: (text) => ({ type: 'success', text }),
  err: (text) => ({ type: 'error', text }),
  sys: (text) => ({ type: 'system', text }),
  dim: (text) => ({ type: 'dim', text }),
  ascii: (text) => ({ type: 'ascii', text }),
  link: (text, href) => ({ type: 'link', text, href }),
  blank: () => ({ type: 'normal', text: '' }),
};

function aboutContent() {
  return [
    L.h('# John Robert Santos'),
    L.blank(),
    L.n(`Role     : ${PROFILE.role}`),
    L.n(`Location : ${PROFILE.location} \u{1F1F5}\u{1F1ED}`),
    L.n(`Aliases  : ${PROFILE.nicknames.join(', ')}`),
    L.n('Born     : August 28, 2003'),
    L.blank(),
    L.sys('## Education'),
    L.n('  BS Information Technology  — Malayan Colleges Laguna'),
    L.n('  STEM Strand               — Perpetual Help College of Calamba'),
    L.blank(),
    L.sys('## Experience'),
    L.n('  - Amateur Software Developer'),
    L.n('  - Amateur Network Administrator'),
    L.n('  - Amateur Game/Mod Developer'),
    L.blank(),
    L.sys('## Bio'),
    L.n('Hello, I am John Robert Santos! I am an aspiring Network Administrator'),
    L.n('& Software Developer based in the Philippines, currently taking a BS in'),
    L.n('Information Technology at Malayan Colleges Laguna.'),
    L.blank(),
    L.n('I am interested in many fields and topics, including but not limited to:'),
    L.n('K-Pop / Korean Culture, Video Games, and Tech.'),
    L.blank(),
    L.dim("Feel free to drop me a message on my socials — try 'cat contact.md'."),
  ];
}

function skillsContent() {
  const lines = [L.h('# Skills & Tech Stack'), L.blank()];
  for (const group of SKILLS) {
    lines.push(L.sys(`${group.cat}:`));
    lines.push(L.n('  ' + group.items.join('  ·  ')));
    lines.push(L.blank());
  }
  lines.push(L.dim("Tip: 'ls projects/' lists my projects."));
  return lines;
}

function contactContent() {
  return [
    L.h('# Contact'),
    L.blank(),
    L.link(`✉  ${PROFILE.email}`, `mailto:${PROFILE.email}`),
    L.n(`☎  ${PROFILE.phone}`),
    L.blank(),
    L.sys('## Find me online'),
    L.link('  GitHub    : github.com/JannersLSR', PROFILE.github),
    L.link('  Twitter/X : twitter.com/jawnerS_', PROFILE.twitter),
    L.link('  LinkedIn  : linkedin.com/in/jannerslsr', PROFILE.linkedin),
    L.blank(),
    L.dim("Run 'open resume.pdf' to view my resume, or 'sudo hire-me'."),
  ];
}

function readmeContent() {
  return [
    L.h('# Welcome to johnsantos.sh'),
    L.blank(),
    L.n("This is an interactive terminal portfolio. You don't need to know Linux."),
    L.blank(),
    L.sys('Quick start:'),
    L.n("  help            — list every command"),
    L.n("  neofetch        — system info + summary"),
    L.n("  ls projects/    — see my projects"),
    L.n("  cat about.md    — about me"),
    L.n("  sudo hire-me    — contact + resume"),
    L.n("  gui             — switch to a plain, scrollable view"),
    L.blank(),
    L.dim('Tap the command pills below, or just start typing.'),
  ];
}

function projectFile(p) {
  return {
    type: 'file',
    size: 1024 + p.id.length * 17,
    pkg: p,
    content: [
      L.h(`# ${p.title}`),
      L.blank(),
      L.n(`Role : ${p.role}`),
      L.n(`Tech : ${p.tech}`),
      L.blank(),
      L.n(p.desc),
      L.blank(),
      p.private
        ? L.dim('\u{1F512} Private repository')
        : L.link(`\u{1F517} ${p.url}`, p.url),
    ],
  };
}

function certFile(c) {
  const content = [
    L.h(`# ${c.title}`),
    L.blank(),
    L.n(`Issuer : ${c.issuer}`),
  ];
  if (c.issued) content.push(L.n(`Issued : ${c.issued}`));
  content.push(L.blank(), L.n(c.desc), L.blank());
  if (c.url) content.push(L.link(`\u{1F517} Verify: ${c.url}`, c.url));
  else content.push(L.dim('(no online verification link)'));
  return { type: 'file', size: 512 + c.id.length * 13, cert: c, content };
}

function groupFile(g) {
  const search = `https://www.youtube.com/results?search_query=${encodeURIComponent(g.name + ' official MV')}`;
  return {
    type: 'file',
    size: 256 + g.id.length * 11,
    group: g,
    content: [
      L.h(`# ${g.name}`),
      L.blank(),
      L.n('A K-pop group I love.'),
      L.link(`▶ Watch MVs: ${g.name}`, search),
      L.blank(),
      L.dim(`Tip: run 'play ${g.id}' to open their MVs.`),
    ],
  };
}

function resumeFile() {
  return {
    type: 'file',
    size: 184320,
    open: PROFILE.resume,
    content: [
      L.sys('resume.pdf is a binary file.'),
      L.n("Run 'open resume.pdf' to view it in a new tab."),
    ],
  };
}

function buildDir(builder, list) {
  const children = {};
  for (const item of list) children[`${item.id}.md`] = builder(item);
  return { type: 'dir', children };
}

const home = {
  type: 'dir',
  children: {
    'README.md': { type: 'file', size: 740, content: readmeContent() },
    'about.md': { type: 'file', size: 1380, content: aboutContent() },
    'skills.md': { type: 'file', size: 1620, content: skillsContent() },
    'contact.md': { type: 'file', size: 560, content: contactContent() },
    'resume.pdf': resumeFile(),
    projects: buildDir(projectFile, PROJECTS),
    certs: buildDir(certFile, CERTS),
    groups: buildDir(groupFile, GROUPS),
  },
};

export const FS = {
  type: 'dir',
  children: {
    home: { type: 'dir', children: { guest: home } },
  },
};

export const HOME_PATH = '/home/guest';

export function toDisplayPath(absPath) {
  if (absPath === HOME_PATH) return '~';
  if (absPath.startsWith(HOME_PATH + '/')) return '~' + absPath.slice(HOME_PATH.length);
  return absPath;
}

export function resolvePath(cwd, input) {
  if (!input || input === '') return cwd;
  let base;
  if (input === '~' || input.startsWith('~/') || input === '~') {
    base = HOME_PATH + input.slice(1);
  } else if (input.startsWith('/')) {
    base = input;
  } else {
    base = cwd + '/' + input;
  }
  const parts = base.split('/');
  const stack = [];
  for (const part of parts) {
    if (part === '' || part === '.') continue;
    if (part === '..') stack.pop();
    else stack.push(part);
  }
  return '/' + stack.join('/');
}

export function getNode(absPath) {
  if (absPath === '/' || absPath === '') return FS;
  const parts = absPath.split('/').filter(Boolean);
  let node = FS;
  for (const part of parts) {
    if (node.type !== 'dir' || !node.children[part]) return null;
    node = node.children[part];
  }
  return node;
}

export function listDir(node) {
  if (!node || node.type !== 'dir') return [];
  const names = Object.keys(node.children);
  return names.sort((a, b) => {
    const da = node.children[a].type === 'dir';
    const db = node.children[b].type === 'dir';
    if (da !== db) return da ? -1 : 1;
    return a.localeCompare(b);
  });
}
