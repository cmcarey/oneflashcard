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

Testing is done using Jest. A mocked database interface is created and used in place of real DB interactions.

Tests can be run a single time using the command:

```
> yarn test
```

They can be run in interactive mode (re-running on file change) using:

```
> yarn test.dev
```

# Status

- [x] Implement user tests
- [x] Implement user routes
- [ ] Implement user DB backend

<!-- -->

- [x] Implement card tests
- [x] Implement card routes
- [ ] Implement card DB backend

<!-- -->

- [x] Implement tag tests
- [x] Implement tag routes
- [ ] Implement tag DB backend

# Other TODOs

- [ ] Update card tests to use tags (`new`/`update` tests)
- [ ] Test across account boundaries (attempting to modify something belonging to another user)
- [ ] Status checks 
- [ ] E2E testing