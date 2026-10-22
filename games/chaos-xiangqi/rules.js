// Board and room transitions shared by the browser and Node's built-in test runner.
(function (root, factory) {
  const rules = factory();
  if (typeof module === 'object' && module.exports) module.exports = rules;
  else root.ChaosXiangqiRules = rules;
})(typeof globalThis === 'object' ? globalThis : this, function () {
  'use strict';
  const inside = (r, c) => Number.isInteger(r) && Number.isInteger(c) && r >= 0 && r < 10 && c >= 0 && c < 9;
  const copy = board => board.map(row => row.map(piece => piece ? {...piece} : null));
  const shuffle = (items, random) => {
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    return items;
  };
  function fourTwos(board, random = Math.random) {
    const cells = [];
    for (let r = 0; r < 10; r++) for (let c = 0; c < 9; c++) cells.push([r, c]);
    const chosen = shuffle(cells, random).slice(0, 30);
    const next = copy(board);
    let killed = 0;
    for (const [r, c] of chosen) {
      if (next[r][c]) { next[r][c] = null; killed++; }
    }
    return {board: next, chosen, killed};
  }
  function escapeRoyal(board, from, target, remaining, random = Math.random) {
    const [tr, tc] = target, royal = board[tr]?.[tc];
    if (!royal?.royal || remaining <= 0) return {board, captured: royal, remaining, swappedAt: null};
    const candidates = [];
    for (let r = 0; r < 10; r++) for (let c = 0; c < 9; c++) {
      const p = board[r][c];
      if (p && p.t !== 'M' && !(r === tr && c === tc) && !(r === from[0] && c === from[1]))
        candidates.push([r, c]);
    }
    if (!candidates.length) return {board, captured: royal, remaining, swappedAt: null};
    const at = candidates[Math.floor(random() * candidates.length)];
    const next = copy(board), captured = next[at[0]][at[1]];
    next[at[0]][at[1]] = next[tr][tc];
    next[tr][tc] = captured;
    return {board: next, captured, remaining: remaining - 1, swappedAt: at};
  }
  function bombMarks(r, c, random = Math.random) {
    const around = [];
    for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
      if ((dr || dc) && inside(r + dr, c + dc)) around.push([r + dr, c + dc]);
    }
    return shuffle(around, random).slice(0, 3);
  }
  function resolveBombs(board, packs) {
    const next = copy(board), keep = [];
    let killed = 0, exploded = 0;
    for (const pack of packs) {
      if (pack.delay > 1) { keep.push({...pack, delay: pack.delay - 1}); continue; }
      exploded++;
      for (const [r, c] of pack.cells) if (inside(r, c) && next[r][c]) {
        next[r][c] = null; killed++;
      }
    }
    return {board: next, packs: keep, killed, exploded};
  }
  function spawn(board, color, type, count, center = null, royal = false, random = Math.random) {
    const cells = [];
    for (let r = 0; r < 10; r++) for (let c = 0; c < 9; c++) if (!board[r][c]) cells.push([r, c]);
    if (center) {
      const [cr, cc] = center;
      cells.sort((a, b) => Math.abs(a[0] - cr) + Math.abs(a[1] - cc) - Math.abs(b[0] - cr) - Math.abs(b[1] - cc));
    } else shuffle(cells, random);
    const next = copy(board), n = Math.min(count, cells.length);
    for (let i = 0; i < n; i++) {
      const [r, c] = cells[i];
      next[r][c] = {t: type, c: color, royal: royal && i === 0};
    }
    return {board: next, count: n};
  }
  function syncKings(board, color, from, to) {
    const dr = to[0] - from[0], dc = to[1] - from[1];
    const next = copy(board), plans = [];
    // All destinations are checked against the same board, before any king moves.
    for (let r = 0; r < 10; r++) for (let c = 0; c < 9; c++) {
      const p = board[r][c], nr = r + dr, nc = c + dc;
      if (p?.c === color && p.t === 'K' && !(r === to[0] && c === to[1])
          && inside(nr, nc) && !board[nr][nc]) plans.push([r, c, nr, nc]);
    }
    for (const [r, c, nr, nc] of plans) {
      next[nr][nc] = next[r][c];
      next[r][c] = null;
    }
    return {board: next, moved: plans.length};
  }
  function hostAcceptsAction(state, action, color) {
    if (!state || !action || !['r', 'b'].includes(color)) return false;
    if (action.type === 'restart') return color === 'r';
    if (action.type === 'choose') return !state.started && !state.choice[color];
    return action.type === 'move' && state.started && !state.winner && !state.draw && state.turn === color;
  }
  function receiveHostState(current, incoming) {
    // A guest never merges local actions into the authoritative snapshot.
    if (!incoming || !Number.isSafeInteger(incoming.seq) || incoming.seq < 1
        || !Array.isArray(incoming.board) || incoming.board.length !== 10
        || !incoming.board.every(row => Array.isArray(row) && row.length === 9)
        || !incoming.choice || !incoming.pendingBombs
        || (current && incoming.seq <= current.seq)) return current;
    return incoming;
  }
  return {fourTwos, escapeRoyal, bombMarks, resolveBombs, spawn, syncKings, hostAcceptsAction, receiveHostState};
});
