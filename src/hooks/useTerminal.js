import { useCallback, useRef, useState } from 'react';
import { runCommand } from '../lib/commands.js';
import { HOME_PATH } from '../lib/filesystem.js';

let _id = 0;
const nextId = () => ++_id;

const withId = (line) => ({ id: nextId(), ...line });

// Core terminal state machine: output blocks + cwd + execute().
export function useTerminal({ getCols, getHistory }) {
  const [lines, setLines] = useState([]);
  const cwdRef = useRef(HOME_PATH);
  const [cwd, setCwdState] = useState(HOME_PATH);

  const setCwd = useCallback((p) => {
    cwdRef.current = p;
    setCwdState(p);
  }, []);

  const appendLines = useCallback((newLines) => {
    if (!newLines || !newLines.length) return;
    setLines((prev) => [...prev, ...newLines.map(withId)]);
  }, []);

  const clearLines = useCallback(() => {
    setLines([]);
  }, []);

  // Execute a raw command line.
  // opts.echo (default true) shows the prompt + input first.
  // Returns { effect } so the caller can drive matrix/gui/rmrf overlays.
  const execute = useCallback(
    (raw, opts = {}) => {
      const echo = opts.echo !== false;
      const ctx = {
        cwd: cwdRef.current,
        cols: getCols ? getCols() : 80,
        history: getHistory ? getHistory() : [],
      };

      const result = runCommand(raw, ctx) || { lines: [] };

      if (result.effect === 'clear') {
        setLines(echo ? [] : []);
        return { effect: 'clear' };
      }

      setLines((prev) => {
        const batch = [];
        if (echo) batch.push(withId({ type: 'prompt', cwd: cwdRef.current, input: raw }));
        for (const l of result.lines || []) batch.push(withId(l));
        return [...prev, ...batch];
      });

      if (result.cwd) setCwd(result.cwd);

      return { effect: result.effect || null };
    },
    [getCols, getHistory, setCwd]
  );

  return { lines, cwd, execute, appendLines, clearLines, setCwd };
}
