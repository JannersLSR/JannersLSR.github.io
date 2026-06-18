import { useCallback } from 'react';
import { commandNames } from '../lib/commands.js';
import { resolvePath, getNode, listDir } from '../lib/filesystem.js';

function commonPrefix(arr) {
  if (!arr.length) return '';
  let prefix = arr[0];
  for (const s of arr) {
    while (!s.startsWith(prefix)) prefix = prefix.slice(0, -1);
    if (!prefix) break;
  }
  return prefix;
}

// Tab completion against command names and filesystem paths.
export function useTabComplete() {
  return useCallback((input, cwd) => {
    const hasSpace = input.includes(' ');

    // ---- complete a command name -----------------------------------------
    if (!hasSpace) {
      const matches = commandNames().filter((c) => c.startsWith(input)).sort();
      if (matches.length === 0) return { value: input, matches: [] };
      if (matches.length === 1) return { value: matches[0] + ' ', matches: [] };
      const cp = commonPrefix(matches);
      return { value: cp.length > input.length ? cp : input, matches };
    }

    // ---- complete a path argument ----------------------------------------
    const lastSpace = input.lastIndexOf(' ');
    const head = input.slice(0, lastSpace + 1);
    const frag = input.slice(lastSpace + 1);

    // split fragment into dir part + partial name
    const slash = frag.lastIndexOf('/');
    const dirPart = slash >= 0 ? frag.slice(0, slash + 1) : '';
    const partial = slash >= 0 ? frag.slice(slash + 1) : frag;

    const dirAbs = resolvePath(cwd, dirPart || '.');
    const node = getNode(dirAbs);
    if (!node || node.type !== 'dir') return { value: input, matches: [] };

    const names = listDir(node).filter((n) => n.startsWith(partial));
    if (names.length === 0) return { value: input, matches: [] };

    const decorate = (name) => name + (node.children[name].type === 'dir' ? '/' : '');

    if (names.length === 1) {
      return { value: head + dirPart + decorate(names[0]), matches: [] };
    }
    const cp = commonPrefix(names);
    const value =
      cp.length > partial.length ? head + dirPart + cp : input;
    return { value, matches: names.map(decorate) };
  }, []);
}
