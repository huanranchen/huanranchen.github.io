const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const rules = require('./rules.js');

const board = () => Array.from({length: 10}, () => Array(9).fill(null));
const piece = (t, c, royal = false) => ({t, c, royal});

test('四个二 samples 30 distinct board cells, including empty cells and both sides', () => {
  const b = board();
  b[0][0] = piece('K', 'b', true);
  b[9][8] = piece('K', 'r', true);
  const first = rules.fourTwos(b, () => 0);
  const second = rules.fourTwos(b, () => 0);
  assert.deepEqual(first, second);
  assert.equal(first.chosen.length, 30);
  assert.equal(new Set(first.chosen.map(([r, c]) => r * 9 + c)).size, 30);
  assert.ok(first.chosen.some(([r, c]) => b[r][c] === null));
  assert.deepEqual(first.chosen.slice(0, 3), [[0, 1], [0, 2], [0, 3]]);
  assert.equal(first.killed, first.chosen.filter(([r, c]) => b[r][c]).length);
  assert.equal(b[0][0].t, 'K'); // input is unchanged
  for (const [r, c] of first.chosen) assert.equal(first.board[r][c], null);
  const full = board().map((row, r) => row.map((_, c) => piece('P', (r + c) % 2 ? 'r' : 'b')));
  assert.equal(rules.fourTwos(full, () => 0).killed, 30);
});

test('金蝉脱壳 swaps the threatened royal with a real candidate, never the attacker', () => {
  const b = board();
  b[4][0] = piece('R', 'r');
  b[4][4] = piece('K', 'b', true);
  b[0][0] = piece('P', 'b');
  b[1][1] = piece('M', 'b');
  const result = rules.escapeRoyal(b, [4, 0], [4, 4], 30, () => 0);
  assert.deepEqual(result.swappedAt, [0, 0]);
  assert.equal(result.remaining, 29);
  assert.deepEqual(result.captured, piece('P', 'b'));
  assert.deepEqual(result.board[0][0], piece('K', 'b', true));
  assert.deepEqual(result.board[4][4], piece('P', 'b'));
  result.board[4][4] = result.board[4][0];
  result.board[4][0] = null;
  assert.deepEqual(result.board[0][0], piece('K', 'b', true));
  assert.deepEqual(b[4][4], piece('K', 'b', true));
  assert.equal(rules.escapeRoyal(b, [4, 0], [4, 4], 0).swappedAt, null);
  b[0][0] = null;
  assert.equal(rules.escapeRoyal(b, [4, 0], [4, 4], 30).swappedAt, null);
});

test('欲擒故纵 marks at most three neighbors and explodes after the victim moves', () => {
  assert.deepEqual(rules.bombMarks(0, 0, () => 0), [[1, 0], [1, 1], [0, 1]]);
  const marks = rules.bombMarks(5, 5, () => 0);
  assert.equal(marks.length, 3);
  assert.equal(new Set(marks.map(String)).size, 3);
  assert.ok(marks.every(([r, c]) => Math.max(Math.abs(r - 5), Math.abs(c - 5)) === 1));
  const b = board();
  b[0][1] = piece('R', 'r');
  b[1][0] = piece('P', 'b');
  const pack = [{cells: rules.bombMarks(0, 0, () => 0), delay: 1}];
  // On the attacker's move the defending side's pack is not resolved.
  assert.deepEqual(b[0][1], piece('R', 'r'));
  const afterVictimMove = rules.resolveBombs(b, pack);
  assert.equal(afterVictimMove.killed, 2);
  assert.equal(afterVictimMove.exploded, 1);
  assert.deepEqual(afterVictimMove.packs, []);
  assert.equal(afterVictimMove.board[0][1], null);
  assert.equal(b[0][1].t, 'R');
  const delayed = rules.resolveBombs(b, [{cells: [[0, 1]], delay: 2}]);
  assert.equal(delayed.killed, 0);
  assert.equal(delayed.packs[0].delay, 1);
});

test('皇恩浩荡 spawns 30 non-royal kings and moves only unblocked followers', () => {
  const b = board();
  b[9][4] = piece('K', 'r', true);
  const opening = rules.spawn(b, 'r', 'K', 30, null, false, () => 0);
  assert.equal(opening.count, 30);
  assert.equal(opening.board.flat().filter(p => p?.t === 'K' && p.c === 'r').length, 31);
  assert.equal(opening.board.flat().filter(p => p?.royal).length, 1);
  assert.equal(b.flat().filter(Boolean).length, 1);
  const crowded = board();
  for (let r = 0; r < 10; r++) for (let c = 0; c < 9; c++) crowded[r][c] = piece('P', 'b');
  crowded[0][0] = crowded[0][1] = null;
  assert.equal(rules.spawn(crowded, 'r', 'K', 30).count, 2);

  const sync = board();
  sync[8][4] = piece('K', 'r', true); // already moved from [9,4]
  sync[5][1] = piece('K', 'r');
  sync[5][3] = piece('K', 'r');
  sync[5][5] = piece('K', 'r');
  sync[4][3] = piece('P', 'b');
  const result = rules.syncKings(sync, 'r', [9, 4], [8, 4]);
  assert.equal(result.moved, 2);
  assert.equal(result.board[4][1]?.t, 'K');
  assert.equal(result.board[5][3]?.t, 'K');
  assert.equal(result.board[4][5]?.t, 'K');
  assert.equal(result.board[8][4]?.royal, true);
  assert.equal(sync[5][1]?.t, 'K');
});

test('only the host can restart; only the side to move can act', () => {
  const s = {started: true, winner: null, draw: false, turn: 'b', choice: {r: 'four2', b: 'jinchan'}};
  assert.equal(rules.hostAcceptsAction(s, {type: 'restart'}, 'b'), false);
  assert.equal(rules.hostAcceptsAction(s, {type: 'restart'}, 'r'), true);
  assert.equal(rules.hostAcceptsAction(s, {type: 'move'}, 'r'), false);
  assert.equal(rules.hostAcceptsAction(s, {type: 'move'}, 'b'), true);
  assert.equal(rules.hostAcceptsAction(s, {type: 'choose'}, 'b'), false);
  assert.equal(rules.hostAcceptsAction(s, {type: 'other'}, 'b'), false);
});

test('guest accepts only newer well-shaped host snapshots, including after restart', () => {
  const snapshot = seq => ({seq, board: board(), choice: {r: null, b: null}, pendingBombs: {r: [], b: []}});
  const one = snapshot(1), two = snapshot(2), restart = snapshot(3);
  assert.equal(rules.receiveHostState(null, one), one);
  assert.equal(rules.receiveHostState(two, one), two);
  assert.equal(rules.receiveHostState(two, two), two);
  assert.equal(rules.receiveHostState(two, {...restart, board: []}), two);
  assert.equal(rules.receiveHostState(two, restart), restart);
});

test('page connection uses host authority and monotonic snapshots across restart', () => {
  function boot(search) {
    const elements = new Map();
    const el = () => ({
      style: {}, classList: {add() {}}, dataset: {}, children: [],
      appendChild(child) { this.children.push(child); },
      set innerHTML(value) { this._html = value; this.children = []; },
      get innerHTML() { return this._html; },
      textContent: '', value: '', scrollHeight: 0
    });
    const get = selector => {
      if (!elements.has(selector)) elements.set(selector, el());
      return elements.get(selector);
    };
    class Connection {
      constructor() { this.events = {}; this.sent = []; this.open = true; }
      on(event, fn) { this.events[event] = fn; }
      emit(event, value) { this.events[event](value); }
      send(message) { this.sent.push(structuredClone(message)); }
    }
    let peer;
    class Peer {
      constructor() { this.events = {}; peer = this; }
      on(event, fn) { this.events[event] = fn; }
      emit(event, value) { this.events[event](value); }
      connect() { this.connection = new Connection(); return this.connection; }
    }
    const html = fs.readFileSync(require.resolve('./index.html'), 'utf8');
    const script = html.match(/<script>\s*([\s\S]*?)<\/script>/)[1];
    vm.runInNewContext(script, {
      window: {ChaosXiangqiRules: rules},
      document: {querySelector: get, createElement: el},
      location: {search, pathname: '/games/chaos-xiangqi/', href: 'https://example.test/games/chaos-xiangqi/' + search},
      URLSearchParams, URL, Peer, history: {replaceState() {}},
      navigator: {clipboard: {writeText() {}}}
    });
    return {get, Connection, peer: () => peer};
  }
  const host = boot('');
  host.get('#createBtn').onclick();
  host.peer().emit('open', 'room-id');
  const link = new host.Connection();
  host.peer().emit('connection', link);
  link.emit('open');
  assert.equal(link.sent[0].state.seq, 1);
  link.emit('data', {type: 'action', action: {type: 'restart'}});
  assert.equal(link.sent.length, 1, 'guest restart must not broadcast');
  link.emit('data', {type: 'action', action: {type: 'choose', id: 'yuqin'}});
  assert.equal(link.sent[1].state.seq, 2);
  assert.equal(link.sent[1].state.choice.b, 'yuqin');
  host.get('#restartBtn').onclick();
  assert.equal(link.sent[2].state.seq, 3, 'restart must keep sequence monotonic');
  assert.equal(link.sent[2].state.choice.b, null);

  const guest = boot('?room=room-id');
  guest.get('#joinBtn').onclick();
  guest.peer().emit('open');
  const guestLink = guest.peer().connection;
  guestLink.emit('open');
  assert.deepEqual(guestLink.sent[0], {type: 'hello'});
  guestLink.emit('data', link.sent[1]);
  assert.match(guest.get('#skillHint').textContent, /欲擒故纵/);
  guestLink.emit('data', link.sent[2]);
  assert.doesNotMatch(guest.get('#skillHint').textContent, /欲擒故纵/);
  guestLink.emit('data', link.sent[1]);
  assert.doesNotMatch(guest.get('#skillHint').textContent, /欲擒故纵/);
});
