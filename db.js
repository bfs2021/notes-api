// SPDX-License-Identifier: GPL-2.0-or-later
// Copyright (C) 2026 Marcus Beauregard

const path = require('path');
const Database = require('better-sqlite3');
const db = new Database(process.env.NOTES_DB || path.join(__dirname, 'notes.db'));
db.exec('CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, body TEXT, created_at TEXT)');

module.exports = {
  all: () => db.prepare('SELECT * FROM notes ORDER BY created_at DESC').all(),
  get: (id) => db.prepare('SELECT * FROM notes WHERE id = ?').get(id),
  create: (title, body) => {
    const r = db.prepare('INSERT INTO notes (title, body, created_at) VALUES (?, ?, ?)')
      .run(title, body, new Date().toISOString());
    return db.prepare('SELECT * FROM notes WHERE id = ?').get(r.lastInsertRowid);
  },
  update: (id, fields) => {
    const keys = Object.keys(fields);
    if (keys.length === 0) return db.prepare('SELECT * FROM notes WHERE id = ?').get(id);
    const assignments = keys.map((key) => `${key} = ?`).join(', ');
    const values = keys.map((key) => fields[key]);
    db.prepare(`UPDATE notes SET ${assignments} WHERE id = ?`).run(...values, id);
    return db.prepare('SELECT * FROM notes WHERE id = ?').get(id);
  },
  remove: (id) => db.prepare('DELETE FROM notes WHERE id = ?').run(id),
};
