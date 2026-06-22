import { useEffect, useRef, useState } from 'react';
import { Prompt } from './OutputLine.jsx';
import { commandNames } from '../lib/commands.js';
import { resolvePath, getNode, listDir } from '../lib/filesystem.js';

function ghostSuffix(input, cwd) {
  if (!input) return '';
  if (!input.includes(' ')) {
    const m = commandNames().filter((c) => c.startsWith(input)).sort()[0];
    return m ? m.slice(input.length) : '';
  }
  const frag = input.slice(input.lastIndexOf(' ') + 1);
  const slash = frag.lastIndexOf('/');
  const dirPart = slash >= 0 ? frag.slice(0, slash + 1) : '';
  const partial = slash >= 0 ? frag.slice(slash + 1) : frag;
  if (!partial) return '';
  const node = getNode(resolvePath(cwd, dirPart || '.'));
  if (!node || node.type !== 'dir') return '';
  const name = listDir(node).filter((n) => n.startsWith(partial)).sort()[0];
  if (!name) return '';
  const decorated = name + (node.children[name].type === 'dir' ? '/' : '');
  return decorated.slice(partial.length);
}

export default function CommandInput({
  cwd,
  onSubmit,
  onHistoryUp,
  onHistoryDown,
  onTab,
  onInterrupt,
  onClearScreen,
  onKeyFeedback,
  focusSignal,
}) {
  const [value, setValue] = useState('');
  const [caret, setCaret] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [focusSignal]);

  const syncCaret = () => {
    const el = inputRef.current;
    if (el) setCaret(el.selectionStart ?? el.value.length);
  };
  const set = (next) => {
    setValue(next);
    setCaret(next.length);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSubmit(value);
      set('');
      return;
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      const next = onTab(value);
      if (typeof next === 'string') set(next);
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const recalled = onHistoryUp();
      if (recalled !== null && recalled !== undefined) set(recalled);
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const recalled = onHistoryDown();
      if (recalled !== null && recalled !== undefined) set(recalled);
      return;
    }
    if (e.ctrlKey && (e.key === 'c' || e.key === 'C')) {
      e.preventDefault();
      onInterrupt(value);
      set('');
      return;
    }
    if (e.ctrlKey && (e.key === 'l' || e.key === 'L')) {
      e.preventDefault();
      onClearScreen();
      return;
    }
    if ((e.key === 'ArrowRight' || e.key === 'End') && caret >= value.length) {
      const gh = ghostSuffix(value, cwd);
      if (gh) {
        e.preventDefault();
        set(value + gh);
        return;
      }
    }
    if (e.key.length === 1 && onKeyFeedback) onKeyFeedback();
  };

  const atEnd = caret >= value.length;
  const ghost = atEnd ? ghostSuffix(value, cwd) : '';
  const before = value.slice(0, caret);
  const under = value[caret];
  const after = value.slice(caret + 1);

  return (
    <div className="term-line term-input-line">
      <Prompt cwd={cwd} />
      <span className="term-input-display">
        {before}
        {atEnd ? (
          ghost ? (
            <>
              <span className="term-cursor-block">{ghost[0]}</span>
              {ghost.length > 1 && <span className="term-ghost">{ghost.slice(1)}</span>}
            </>
          ) : (
            <span className="term-cursor-block">&nbsp;</span>
          )
        ) : (
          <>
            <span className="term-cursor-block">{under === ' ' ? ' ' : under}</span>
            {after}
          </>
        )}
      </span>
      <input
        ref={inputRef}
        className="term-hidden-input"
        value={value}
        onChange={(e) => { setValue(e.target.value); setCaret(e.target.selectionStart ?? e.target.value.length); }}
        onKeyDown={handleKeyDown}
        onKeyUp={syncCaret}
        onClick={syncCaret}
        onSelect={syncCaret}
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck="false"
        aria-label="Terminal command input"
      />
    </div>
  );
}
