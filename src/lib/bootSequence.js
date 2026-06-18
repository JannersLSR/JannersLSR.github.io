// Boot animation lines. Each entry: { text, delay, type? }
// delay = ms to wait BEFORE showing this line. type styles it (see OutputLine).

export const BANNER = [
  '     ██╗ ██████╗ ██╗  ██╗███╗   ██╗    ███████╗',
  '     ██║██╔═══██╗██║  ██║████╗  ██║    ██╔════╝',
  '     ██║██║   ██║███████║██╔██╗ ██║    ███████╗',
  '██   ██║██║   ██║██╔══██║██║╚██╗██║    ╚════██║',
  '╚█████╔╝╚██████╔╝██║  ██║██║ ╚████║    ███████║',
  ' ╚════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝    ╚══════╝',
  '            S A N T O S   —   Portfolio OS v3.0',
];

export const BOOT_SEQUENCE = [
  { text: 'JohnSantos BIOS v1.0.0', delay: 120, type: 'system' },
  { text: 'Copyright (C) 2024-2026 John Robert Santos', delay: 60, type: 'dim' },
  { text: '', delay: 40 },
  { text: 'CPU: Arch Linux x86_64 @ 4.20GHz', delay: 120, type: 'system' },
  { text: 'Checking memory... 8192 MB OK', delay: 200, type: 'system' },
  { text: 'Detecting drives... SSD0: Portfolio v3.0', delay: 180, type: 'system' },
  { text: '', delay: 60 },
  { text: ':: Synchronizing package databases...', delay: 160, type: 'header' },
  { text: ' core            [############################] 100%', delay: 140, type: 'success' },
  { text: ' extra           [############################] 100%', delay: 140, type: 'success' },
  { text: ' community       [############################] 100%', delay: 140, type: 'success' },
  { text: '', delay: 60 },
  { text: ':: Loading kernel modules...', delay: 160, type: 'header' },
  { text: '  [OK] filesystem.js', delay: 110, type: 'success' },
  { text: '  [OK] terminal.js', delay: 110, type: 'success' },
  { text: '  [OK] commands.js', delay: 110, type: 'success' },
  { text: '  [OK] easter-eggs.js', delay: 110, type: 'success' },
  { text: '', delay: 80 },
  { text: 'All systems nominal. Starting shell...', delay: 220, type: 'success' },
  { text: '', delay: 120 },
  ...BANNER.map((text, i) => ({ text, delay: i === 0 ? 200 : 40, type: 'ascii' })),
  { text: '', delay: 120 },
  { text: "Type 'help' to get started — or tap a command below.", delay: 160, type: 'normal' },
  { text: 'Press any key to skip →', delay: 60, type: 'dim' },
];
