import { useCallback, useRef, useState } from 'react';

const MAX = 50;

// Bash-style command history with Up/Down recall.
// listRef is the source of truth (read synchronously by up/down);
// `history` state exists only so the `history` command can render it.
export function useCommandHistory() {
  const [history, setHistory] = useState([]);
  const listRef = useRef([]);
  const cursor = useRef(-1); // -1 = editing a fresh line

  const push = useCallback((cmd) => {
    const c = cmd.trim();
    cursor.current = -1;
    if (!c) return;
    const prev = listRef.current;
    if (prev[prev.length - 1] === c) return; // no dup consecutive
    const next = [...prev, c].slice(-MAX);
    listRef.current = next;
    setHistory(next);
  }, []);

  const up = useCallback(() => {
    const list = listRef.current;
    if (!list.length) return null;
    if (cursor.current === -1) cursor.current = list.length - 1;
    else if (cursor.current > 0) cursor.current -= 1;
    return list[cursor.current];
  }, []);

  const down = useCallback(() => {
    const list = listRef.current;
    if (!list.length || cursor.current === -1) return null;
    if (cursor.current < list.length - 1) {
      cursor.current += 1;
      return list[cursor.current];
    }
    cursor.current = -1;
    return ''; // back to empty fresh line
  }, []);

  const resetCursor = useCallback(() => {
    cursor.current = -1;
  }, []);

  return { history, push, up, down, resetCursor };
}
