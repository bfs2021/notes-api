<div align="center">

<img src="assets/logo-512.png" width="96" alt="notes-api">

# notes-api

**A small REST API for notes: Express and SQLite, with tests.**

[![CI](https://github.com/marcus-beauregard/notes-api/actions/workflows/ci.yml/badge.svg)](https://github.com/marcus-beauregard/notes-api/actions/workflows/ci.yml)
[![License: GPL-2.0-or-later](https://img.shields.io/badge/license-GPL--2.0--or--later-blue.svg)](LICENSE)

</div>

## Quick start

```bash
npm install
npm start
# notes-api listening on 3000
```

Set ```PORT``` to move it. The SQLite file is created on first write.
The default file is ```notes.db``` beside ```db.js```; set ```NOTES_DB``` to override.

## Endpoints

| Method | Path | Does |
|---|---|---|
| GET | ```/notes?page=1&size=20``` | list, paginated |
| POST | ```/notes``` | create from ```{"title","body"}``` |
| GET | ```/notes/:id``` | read one, 404 if missing |
| PATCH | ```/notes/:id``` | update ```title``` and/or ```body``` |
| DELETE | ```/notes/:id``` | 204, or 404 if it was already gone |

```bash
curl -s -X POST localhost:3000/notes \
  -H 'content-type: application/json' \
  -d '{"title":"Buy milk","body":"and bread"}'

curl -s 'localhost:3000/notes?page=1&size=10'
```

Types are enforced: a non-string ```title``` gets a 400, not a driver 500.

## Develop

```bash
npm test    # node --test
```

## Known gaps

No ```updated_at``` (#10), pagination happens in JavaScript rather than SQL (#8), malformed JSON returns HTML (#7), and there is no health endpoint (#11).

## Contributing

Humans and automated agents are both welcome. There is no CLA — every commit carries a [DCO](https://developercertificate.org/) sign-off (**git commit -s**).

Start with a [good first issue](https://github.com/marcus-beauregard/notes-api/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22), or read [CONTRIBUTING.md](CONTRIBUTING.md).

## Licence

GPL-2.0-or-later — see [LICENSE](LICENSE). Copyright (C) 2026 Marcus Beauregard.

Versions published before 2026-11-19 remain available under MIT; this licence applies to the current tree and every release from here.
