import { PROJECTS } from '../lib/filesystem.js';

export default function CommandPills({ cwd, onRun }) {
  let pills;
  if (cwd.endsWith('/projects')) {
    pills = [
      ...PROJECTS.slice(0, 4).map((p) => `cat ${p.id}.md`),
      'cd ~',
      'sudo hire-me',
    ];
  } else if (cwd.endsWith('/certs')) {
    pills = ['ls', 'cat comptia-techplus.md', 'cd ~', 'sudo hire-me'];
  } else if (cwd.endsWith('/groups')) {
    pills = ['ls', 'play triples', 'cd ~', 'sudo hire-me'];
  } else {
    pills = [
      'help',
      'neofetch',
      'ls projects/',
      'cat about.md',
      'cat skills.md',
      'sudo hire-me',
      'gui',
    ];
  }

  return (
    <div className="command-pills" aria-label="Quick commands">
      {pills.map((cmd) => (
        <button
          key={cmd}
          type="button"
          className="pill"
          onClick={() => onRun(cmd)}
          tabIndex={-1}
        >
          {cmd}
        </button>
      ))}
    </div>
  );
}
