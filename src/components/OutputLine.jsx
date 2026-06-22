import { memo } from 'react';

function OutputLine({ line }) {
  switch (line.type) {
    case 'prompt':
      return (
        <div className="term-line term-echo">
          <Prompt cwd={line.cwd} />
          <span className="term-input-echo">{line.input}</span>
        </div>
      );

    case 'ls':
      return (
        <div className="term-line term-ls">
          {line.entries.map((e) => (
            <span key={e.name} className={e.dir ? 'ls-entry ls-dir' : 'ls-entry ls-file'}>
              {e.dir ? e.name + '/' : e.name}
            </span>
          ))}
        </div>
      );

    case 'lsLong':
      return <div className="term-line type-normal">{line.text}</div>;
    case 'lsLongDir':
      return <div className="term-line type-header">{line.text}</div>;

    case 'link':
      return (
        <div className="term-line type-link">
          <a href={line.href} target="_blank" rel="noopener noreferrer">
            {line.text}
          </a>
        </div>
      );

    case 'banner':
      return (
        <div className="term-line">
          <span className="term-banner">{line.text}</span>
        </div>
      );

    case 'ascii':
      return <div className="term-line type-ascii">{line.text || ' '}</div>;

    default:
      return (
        <div className={`term-line type-${line.type || 'normal'}`}>
          {line.text || ' '}
        </div>
      );
  }
}

export function Prompt({ cwd }) {
  const display = cwd === '/home/guest'
    ? '~'
    : cwd.startsWith('/home/guest')
      ? '~' + cwd.slice('/home/guest'.length)
      : cwd;
  return (
    <span className="prompt">
      <span className="prompt-bracket">[</span>
      <span className="prompt-user">guest</span>
      <span className="prompt-at">@</span>
      <span className="prompt-host">jrcsantos</span>
      <span className="prompt-space"> </span>
      <span className="prompt-path">{display}</span>
      <span className="prompt-bracket">]</span>
      <span className="prompt-dollar">$</span>
      <span className="prompt-space"> </span>
    </span>
  );
}

export default memo(OutputLine);
