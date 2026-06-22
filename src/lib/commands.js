
import {
  PROFILE, PROJECTS, CERTS, GROUPS, L,
  resolvePath, getNode, listDir,
} from './filesystem.js';

function uptime() {
  const start = new Date(PROFILE.birthdate + 'T00:00:00');
  const now = new Date();
  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();
  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    days += prevMonth;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return `${years} yrs, ${months} months, ${days} days`;
}

const ARCH_LOGO = [
  '                   -`',
  '                  .o+`',
  '                 `ooo/',
  '                `+oooo:',
  '               `+oooooo:',
  '               -+oooooo+:',
  '             `/:-:++oooo+:',
  '            `/++++/+++++++:',
  '           `/++++++++++++++:',
  '          `/+++ooooooooooooo/`',
  '         ./ooosssso++osssssso+`',
  '        .oossssso-````/ossssss+`',
  '       -osssssso.      :ssssssso.',
  '      :osssssss/        osssso+++.',
  '     /ossssssss/        +ssssooo/-',
  '   `/ossssso+/:-        -:/+osssso+-',
  '  `+sso+:-`                 `.-/+oso:',
  ' `++:.                           `-/+/',
  ' .`                                 `/',
];

function neofetchLines(compact) {
  const info = [
    `${PROFILE.user}@${PROFILE.host}`,
    '─────────────────────────────',
    'OS: Arch Linux x86_64',
    'Host: JR Santos Portfolio v3.0',
    'Kernel: 6.9.1-arch1-1',
    `Uptime: ${uptime()}`,
    `Packages: ${PROJECTS.length} (projects), ${CERTS.length} (certs)`,
    'Shell: johnsantos.sh',
    'Terminal: CRT-Amber v3.0',
    'Resolution: Full-viewport (CRT)',
    'DE: Portfolio OS',
    'WM: Vite + React 19',
    'Theme: Amber-on-Dark [CRT]',
    `Location: ${PROFILE.location} \u{1F1F5}\u{1F1ED}`,
    'Education: BS IT — Malayan Colleges Laguna',
    'Languages: Python, PHP, Java, +6 more',
    `Contact: ${PROFILE.email}`,
  ];

  if (compact) {
    const lines = [L.h(info[0]), L.dim(info[1])];
    for (let i = 2; i < info.length; i++) lines.push(L.n(info[i]));
    return lines;
  }

  const rows = Math.max(ARCH_LOGO.length, info.length);
  const lines = [];
  for (let i = 0; i < rows; i++) {
    const logo = (ARCH_LOGO[i] || '').padEnd(40);
    const text = (info[i] || '');
    lines.push(L.ascii(logo + text));
  }
  return lines;
}

function notFound(cmd) {
  return [L.err(`bash: ${cmd}: command not found`), L.dim("Type 'help' for a list of commands.")];
}

function fileOpenTarget(node) {
  if (node.open) return node.open;
  const link = node.content?.find((l) => l.type === 'link' && l.href);
  return link ? link.href : null;
}

const COMMANDS = {
  help: {
    desc: 'List all available commands',
    run() {
      const rows = [
        ['help', 'show this command list'],
        ['neofetch', 'system info + portfolio summary'],
        ['ls [dir] [-la]', 'list directory contents'],
        ['cd <dir>', 'change directory'],
        ['cat <file>', 'read a file (about.md, skills.md, ...)'],
        ['open <file>', 'open a link / the resume in a new tab'],
        ['whoami / uname -a', 'identity / kernel info'],
        ['hostnamectl / ip addr', 'host identity / social links'],
        ['history', 'show command history'],
        ['echo <text>', 'print text'],
        ['clear', 'clear the screen'],
        ['gui', 'open / close the GUI window'],
        ['sudo hire-me', 'contact info + resume'],
      ];
      const out = [L.h('Available commands'), L.blank()];
      for (const [c, d] of rows) out.push(L.n('  ' + c.padEnd(20) + L_arrow + d));
      out.push(L.blank());
      out.push(L.dim('Easter eggs: matrix · btw · play <group> · rm -rf /'));
      return out;
    },
  },

  whoami: { desc: 'Print current user', run: () => [L.n(PROFILE.user)] },

  neofetch: {
    desc: 'System info',
    run: (_args, ctx) => neofetchLines(ctx.cols < 76),
  },

  echo: {
    desc: 'Print text',
    run: (args) => [L.n(args.join(' '))],
  },

  uname: {
    desc: 'Kernel info',
    run: (args) => {
      if (args.includes('-a')) {
        return [L.n(`Linux ${PROFILE.host} 6.9.1-arch1-1 #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux`)];
      }
      return [L.n('Linux')];
    },
  },

  hostnamectl: {
    desc: 'Host identity',
    run: () => [
      L.n(`   Static hostname: ${PROFILE.host}`),
      L.n('         Icon name: computer-laptop'),
      L.n('           Chassis: laptop'),
      L.n('  Operating System: Arch Linux'),
      L.n('            Kernel: Linux 6.9.1-arch1-1'),
      L.n('      Architecture: x86-64'),
      L.dim('         Maintainer: John Robert Santos'),
    ],
  },

  ip: {
    desc: 'Network / socials',
    run: (args) => {
      if (args[0] !== 'addr' && args[0] !== 'a') {
        return [L.dim("Usage: ip addr")];
      }
      return [
        L.sys(`1: lo: <LOOPBACK,UP> ${PROFILE.host}`),
        L.n('    inet 127.0.0.1/8 scope host lo'),
        L.sys('2: github0: <UP,PUBLIC>'),
        L.link('    link → github.com/JannersLSR', PROFILE.github),
        L.sys('3: twitter0: <UP,PUBLIC>'),
        L.link('    link → twitter.com/jawnerS_', PROFILE.twitter),
        L.sys('4: linkedin0: <UP,PUBLIC>'),
        L.link('    link → linkedin.com/in/jannerslsr', PROFILE.linkedin),
      ];
    },
  },

  history: {
    desc: 'Command history',
    run: (_args, ctx) => {
      if (!ctx.history.length) return [L.dim('(no history yet)')];
      return ctx.history.map((c, i) => L.n(`${String(i + 1).padStart(4)}  ${c}`));
    },
  },

  ls: {
    desc: 'List directory',
    run: (args, ctx) => {
      const flags = args.filter((a) => a.startsWith('-')).join('');
      const long = flags.includes('l') || flags.includes('a');
      const target = args.find((a) => !a.startsWith('-'));
      const abs = resolvePath(ctx.cwd, target || '.');
      const node = getNode(abs);
      if (!node) return [L.err(`ls: cannot access '${target}': No such file or directory`)];
      if (node.type === 'file') return [L.n(target || abs)];
      const names = listDir(node);
      if (!long) {
        return [
          {
            type: 'ls',
            entries: names.map((name) => ({
              name,
              dir: node.children[name].type === 'dir',
            })),
          },
        ];
      }
      const lines = [L.dim(`total ${names.length}`)];
      for (const name of names) {
        const child = node.children[name];
        const isDir = child.type === 'dir';
        const perms = isDir ? 'drwxr-xr-x' : '-rw-r--r--';
        const size = isDir ? 4096 : child.size || 0;
        const display = isDir ? name + '/' : name;
        lines.push({
          type: isDir ? 'lsLongDir' : 'lsLong',
          text: `${perms}  guest  guest  ${String(size).padStart(7)}  ${display}`,
        });
      }
      return lines;
    },
  },

  cd: {
    desc: 'Change directory',
    run: (args, ctx) => {
      const target = args[0] || '~';
      const abs = resolvePath(ctx.cwd, target);
      const node = getNode(abs);
      if (!node) return { lines: [L.err(`cd: ${target}: No such file or directory`)] };
      if (node.type !== 'dir') return { lines: [L.err(`cd: ${target}: Not a directory`)] };
      return { lines: [], cwd: abs };
    },
  },

  cat: {
    desc: 'Read a file',
    run: (args, ctx) => {
      if (!args[0]) return [L.err('cat: missing file operand')];
      const out = [];
      for (const target of args.filter((a) => !a.startsWith('-'))) {
        const abs = resolvePath(ctx.cwd, target);
        const node = getNode(abs);
        if (!node) { out.push(L.err(`cat: ${target}: No such file or directory`)); continue; }
        if (node.type === 'dir') { out.push(L.err(`cat: ${target}: Is a directory`)); continue; }
        out.push(...node.content);
      }
      return out;
    },
  },

  open: {
    desc: 'Open a link / resume',
    run: (args, ctx) => {
      const target = args[0];
      if (!target) return [L.err('open: missing operand')];
      if (/^https?:\/\//i.test(target)) {
        window.open(target, '_blank', 'noopener');
        return [L.ok(`Opening ${target} ...`)];
      }
      const abs = resolvePath(ctx.cwd, target);
      const node = getNode(abs);
      if (!node) return [L.err(`open: ${target}: No such file or directory`)];
      if (node.type === 'dir') return [L.err(`open: ${target}: Is a directory`)];
      const url = fileOpenTarget(node);
      if (!url) return [L.err(`open: ${target}: nothing to open`)];
      window.open(url, '_blank', 'noopener');
      return [L.ok(`Opening ${target} → ${url}`)];
    },
  },

  clear: { desc: 'Clear screen', run: () => ({ lines: [], effect: 'clear' }) },

  btw: {
    desc: 'btw',
    run: () => [L.ok('I use Arch btw 🤓.')],
  },

  matrix: {
    desc: 'Enter the matrix',
    run: () => ({ lines: [L.ok('Wake up, Neo...')], effect: 'matrix' }),
  },

  play: {
    desc: 'Play a group MV',
    run: (args) => {
      const id = (args[0] || '').toLowerCase();
      const g = GROUPS.find((x) => x.id === id || x.name.toLowerCase() === id);
      if (!g) {
        return [
          L.err(`play: unknown group '${args[0] || ''}'`),
          L.dim('Groups: ' + GROUPS.map((x) => x.id).join(', ')),
        ];
      }
      const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(g.name + ' official MV')}`;
      window.open(url, '_blank', 'noopener');
      return [L.ok(`♪ Now playing: ${g.name} — opening YouTube...`)];
    },
  },

  gui: {
    desc: 'Open / close the GUI window',
    run: () => ({ lines: [], effect: 'gui' }),
  },

  rm: {
    desc: 'remove',
    run: (args) => {
      const joined = args.join(' ');
      if (joined.includes('-rf') && (joined.includes('/') || joined.includes('*'))) {
        return { lines: [], effect: 'rmrf' };
      }
      return [L.err('rm: refusing to remove files without -rf /')];
    },
  },

  sudo: {
    desc: 'Execute as root',
    run: (args, ctx) => {
      const sub = args[0];
      if (sub === 'hire-me' || sub === 'hireme') {
        return [
          { type: 'banner', text: `ACCESS GRANTED — root@${PROFILE.host}` },
          L.blank(),
          L.h("Let's work together."),
          L.link(`  ✉  ${PROFILE.email}`, `mailto:${PROFILE.email}`),
          L.n(`  ☎  ${PROFILE.phone}`),
          L.link('  GitHub   → github.com/JannersLSR', PROFILE.github),
          L.link('  LinkedIn → linkedin.com/in/jannerslsr', PROFILE.linkedin),
          L.blank(),
          L.link('  ⤓  Download resume.pdf', PROFILE.resume),
          L.dim("  (or run 'open resume.pdf')"),
        ];
      }
      if (sub === 'rm') return COMMANDS.rm.run(args.slice(1), ctx);
      if (!sub) return [L.err('usage: sudo <command>')];
      return [
        L.dim(`[sudo] password for guest:`),
        L.n('guest is not in the sudoers file. This incident will be reported.'),
        L.dim("(just kidding — try 'sudo hire-me')"),
      ];
    },
  },
};

const L_arrow = '— ';

const ALIASES = {
  ll: 'ls',
  dir: 'ls',
  fetch: 'neofetch',
  man: 'help',
  '?': 'help',
};

export function commandNames() {
  return [...Object.keys(COMMANDS), ...Object.keys(ALIASES)];
}

export function runCommand(raw, ctx) {
  const trimmed = raw.trim();
  if (!trimmed) return { lines: [] };
  const tokens = trimmed.split(/\s+/);
  let name = tokens[0].toLowerCase();
  const args = tokens.slice(1);
  if (ALIASES[name]) name = ALIASES[name];
  const cmd = COMMANDS[name];
  if (!cmd) return { lines: notFound(tokens[0]) };
  const result = cmd.run(args, ctx);
  return Array.isArray(result) ? { lines: result } : result;
}
