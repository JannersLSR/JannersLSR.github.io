import { useEffect, useRef, useState } from 'react';
import { Prompt } from './OutputLine.jsx';
import { commandNames } from '../lib/commands.js';
import { resolvePath, getNode, listDir } from '../lib/filesystem.js';

// Faded inline suggestion (fish-style). Returns the trailing chars to show ghosted.
function ghostSuffix(input, cwd) {
  if (!input) return '';
  // completing a command name
  if (!input.includes(' ')) {
    const m = commandNames().filter((c) => c.startsWith(input)).sort()[0];
    return m ? m.slice(input.length) : '';
  }
  // completing a path argument
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

// Active prompt line: hidden input captures keys, span renders the visible text.
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
  const inputRef = useRef(null);

  // keep focused; refocus when asked (boot finish, container click, pill tap)
  useEffect(() => {
    inputRef.current?.focus();
  }, [focusSignal]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSubmit(value);
      setValue('');
      return;
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      const next = onTab(value);
      if (typeof next === 'string') setValue(next);
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const recalled = onHistoryUp();
      if (recalled !== null && recalled !== undefined) setValue(recalled);
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const recalled = onHistoryDown();
      if (recalled !== null && recalled !== undefined) setValue(recalled);
      return;
    }
    if (e.ctrlKey && (e.key === 'c' || e.key === 'C')) {
      e.preventDefault();
      onInterrupt(value);
      setValue('');
      return;
    }
    if (e.ctrlKey && (e.key === 'l' || e.key === 'L')) {
      e.preventDefault();
      onClearScreen();
      return;
    }
    // accept the ghost suggestion with Right arrow / End
    if (e.key === 'ArrowRight' || e.key === 'End') {
      const gh = ghostSuffix(value, cwd);
      if (gh) {
        e.preventDefault();
        setValue(value + gh);
        return;
      }
    }
    if (e.key.length === 1 && onKeyFeedback) onKeyFeedback();
  };

  const ghost = ghostSuffix(value, cwd);

  return (
    <div className="term-line term-input-line">
      <Prompt cwd={cwd} />
      <span className="term-input-display">
        {value}
        {ghost ? (
          <>
            <span className="term-cursor-block">{ghost[0]}</span>
            {ghost.length > 1 && <span className="term-ghost">{ghost.slice(1)}</span>}
          </>
        ) : (
          <span className="term-cursor-block">&nbsp;</span>
        )}
      </span>
      <input
        ref={inputRef}
        className="term-hidden-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck="false"
        aria-label="Terminal command input"
      />
    </div>
  );
}
