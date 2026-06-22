import { useCallback, useEffect, useRef, useState } from 'react';
import OutputLine from './OutputLine.jsx';
import CommandInput from './CommandInput.jsx';
import CommandPills from './CommandPills.jsx';
import MatrixRain from './MatrixRain.jsx';
import { useTerminal } from '../hooks/useTerminal.js';
import { useCommandHistory } from '../hooks/useCommandHistory.js';
import { useTabComplete } from '../hooks/useTabComplete.js';
import { L } from '../lib/filesystem.js';

export default function Terminal({ active, onRequestGui, onKeyFeedback }) {
  const scrollRef = useRef(null);
  const [focusSignal, setFocusSignal] = useState(0);
  const [matrix, setMatrix] = useState(false);
  const autoRan = useRef(false);

  const history = useCommandHistory();
  const tabComplete = useTabComplete();

  const getCols = useCallback(() => {
    const w = scrollRef.current?.clientWidth || 800;
    return Math.max(20, Math.floor((w - 24) / 8.6));
  }, []);
  const getHistory = useCallback(() => history.history, [history.history]);

  const term = useTerminal({ getCols, getHistory });

  const refocus = useCallback(() => setFocusSignal((n) => n + 1), []);

  const runRmrf = useCallback(() => {
    const steps = [
      L.err('rm: removing everything in / ...'),
      L.dim('  deleting /usr ......... done'),
      L.dim('  deleting /etc ......... done'),
      L.dim('  deleting /home ........ done'),
      L.dim('  deleting /boot ........ done'),
      L.err('  ▓▒░  K E R N E L   P A N I C  ░▒▓'),
    ];
    steps.forEach((line, i) => setTimeout(() => term.appendLines([line]), 220 * (i + 1)));
    setTimeout(() => {
      term.appendLines([
        L.blank(),
        L.ok('Just kidding! Nothing was deleted.'),
        L.n('It would take more than that to break this portfolio.'),
      ]);
    }, 220 * (steps.length + 1) + 200);
  }, [term]);

  const handleEffect = useCallback(
    (effect) => {
      if (effect === 'matrix') setMatrix(true);
      else if (effect === 'gui') onRequestGui();
      else if (effect === 'rmrf') runRmrf();
    },
    [onRequestGui, runRmrf]
  );

  const runInput = useCallback(
    (raw, opts = {}) => {
      if (opts.pushHistory !== false) history.push(raw);
      const { effect } = term.execute(raw);
      handleEffect(effect);
      refocus();
    },
    [history, term, handleEffect, refocus]
  );

  useEffect(() => {
    if (!active || autoRan.current) return;
    autoRan.current = true;
    term.execute('neofetch');
    const t = setTimeout(() => term.execute('ls projects/'), 450);
    return () => clearTimeout(t);
  }, [active]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [term.lines, matrix]);

  const handleSubmit = (value) => runInput(value);

  const handleInterrupt = (value) => {
    term.appendLines([{ type: 'prompt', cwd: term.cwd, input: value + '^C' }]);
    history.resetCursor();
    refocus();
  };

  const handleTab = (value) => {
    const { value: next, matches } = tabComplete(value, term.cwd);
    if (matches && matches.length) {
      term.appendLines([
        { type: 'prompt', cwd: term.cwd, input: value },
        { type: 'ls', entries: matches.map((m) => ({ name: m.replace(/\/$/, ''), dir: m.endsWith('/') })) },
      ]);
    }
    return next;
  };

  return (
    <div className="terminal" onClick={refocus}>
      <div className="terminal__scroll" ref={scrollRef}>
        <div className="terminal__output">
          {term.lines.map((line) => (
            <OutputLine key={line.id} line={line} />
          ))}
          {active && (
            <CommandInput
              cwd={term.cwd}
              onSubmit={handleSubmit}
              onHistoryUp={history.up}
              onHistoryDown={history.down}
              onTab={handleTab}
              onInterrupt={handleInterrupt}
              onClearScreen={term.clearLines}
              onKeyFeedback={onKeyFeedback}
              focusSignal={focusSignal}
            />
          )}
        </div>
      </div>

      {active && <CommandPills cwd={term.cwd} onRun={(cmd) => runInput(cmd)} />}

      {matrix && <MatrixRain onDone={() => { setMatrix(false); refocus(); }} />}
    </div>
  );
}
