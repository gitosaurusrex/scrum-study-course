// Loads the course's browser scripts into a Node vm context for validation and tests.
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const DIST = path.join(__dirname, '..', 'dist');
const FILES = [
  'js/core.js',
  'js/progress-validation.js',
  'js/data/sources.js',
  'js/data/modules-shared.js',
  'js/data/modules-tracks.js',
  'js/data/questions-shared.js',
  'js/data/questions-tracks.js',
  'js/data/scenarios.js',
  'js/data/flashcards.js',
  'js/data/plans.js',
  'js/store.js',
  'js/ui.js'
];

function memoryStorage(opts) {
  const data = new Map();
  opts = opts || {};
  return {
    getItem: (k) => (data.has(k) ? data.get(k) : null),
    setItem: (k, v) => {
      if (opts.failWrites && opts.failWrites()) throw new Error('QuotaExceededError');
      data.set(k, String(v));
    },
    removeItem: (k) => data.delete(k),
    _data: data
  };
}

function load(options) {
  options = options || {};
  const ctx = vm.createContext({ console, localStorage: options.localStorage || memoryStorage() });
  for (const f of FILES) {
    const code = fs.readFileSync(path.join(DIST, f), 'utf8');
    vm.runInContext(code, ctx, { filename: f });
  }
  return ctx.SSS;
}

module.exports = { load, memoryStorage, DIST };
