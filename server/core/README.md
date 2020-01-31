# Server configuration

The server expects the following environment variables to be set:

| Var           | Explanation                       |
| ------------- | --------------------------------- |
| `PORT`        | Port to run the server on         |
| `DB_HOST`     | Hostname of the Postgres database |
| `DB_USER`     | DB username                       |
| `DB_PASS`     | DB password                       |
| `DB_DATABASE` | DB name                           |

# Testing

Testing is done using Jest. There are two ways to run the tests: using either the real database, or a mocked one.

Running against mock db: `yarn test.mock` or `yarn test.mock.dev` (for reloading).

Running against real db: `docker-compose -f dockerfiles/test.docker-compose.yml up -V`.

# Status

- [x] Implement user tests
- [x] Implement user routes
- [x] Implement user DB backend

<!-- -->

- [x] Implement card tests
- [x] Implement card routes
- [x] Implement card DB backend

<!-- -->

- [x] Implement tag tests
- [x] Implement tag routes
- [x] Implement tag DB backend

<!-- -->

- [x] E2E testing
- [ ] Update card tests to use tags (`new`/`update` tests)
- [ ] Test across account boundaries (attempting to modify something belonging to another user)
- [ ] Status checks
