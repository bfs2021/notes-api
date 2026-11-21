'use strict';
// Verifies the default database path is resolved against the code, not the
// working directory, so the server serves the same notes.db from anywhere.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFile } = require('node:child_process');
const { promisify } = require('node:util');

const run = promisify(execFile);
const repoDir = path.join(__dirname, '..');

test('default notes.db lives next to db.js, not in the working directory', async () => {
  const workDir = fs.mkdtempSync(path.join(os.tmpdir(), 'notes-api-cwd-'));
  const dbFile = path.join(repoDir, 'notes.db');
  const existedBefore = fs.existsSync(dbFile);
  const script = `
    require(${JSON.stringify(path.join(repoDir, 'db'))});
  `;
  try {
    await run(process.execPath, ['-e', script], { cwd: workDir });
    assert.strictEqual(fs.existsSync(path.join(workDir, 'notes.db')), false,
      'no database must be created in the working directory');
    assert.strictEqual(fs.existsSync(dbFile), true,
      'the database must live next to db.js');
  } finally {
    if (!existedBefore) fs.rmSync(dbFile, { force: true });
    fs.rmSync(workDir, { recursive: true, force: true });
  }
});
