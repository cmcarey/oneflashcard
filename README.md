<div align="center">

<img src="media/logo.svg" width="450px" />

[Status](#status) | [Documentation](#documentation) | [Technical details](#server) | [Contributing](#contributing) | A project by [cmcarey](https://github.com/cmcarey) 🎉

![](https://img.shields.io/github/workflow/status/cmcarey/oneflashcard/CI?style=flat-square) ![](https://img.shields.io/github/languages/code-size/cmcarey/oneflashcard?style=flat-square) ![](https://img.shields.io/github/last-commit/cmcarey/oneflashcard?style=flat-square)

</div>

![](images/demo.png)

**oneflashcard** is a flashcard management system. Most flashcard applications only allow you to store a card in a set, with no nuance - so you cannot, for example, tag and later review only a _section_ of that set.

Oneflashcard eschews this concept of a set in favor of a system of tags; apply as many tags as you like to a card, and then later filter, review, and learn all of the cards that have a specific tag.

The application is currently in **pre-alpha** and is being developed as a personal project. I was irritated that no flashcard application had this feature, and so I am building one 🕺.

# Status

This project is still in early stage development. Some (quite important) missing features are:

🔑 SAML / OAuth authentication support  
🔥 Web client unit testing  
🗺 API annotation using OpenAPI  
💡 Basically the entire client  
📝 Documentation

# Server

## Structure

The server is written in strict **Typescript** and uses [`Koa`](https://koajs.com/) (with [`koa-router`](https://github.com/ZijianHe/koa-router) and [`koa-bodyparser`](https://github.com/koajs/bodyparser) helpers) to provide a REST api. **Schema validation** is handled using [`Joi`](https://github.com/hapijs/joi). **Password encryption** and **validation** is performed using [`bcrypt`](https://www.npmjs.com/package/bcrypt) and `10` salt rounds. The database backend is **Postgres**, and is interacted with using [`knex`](https://knexjs.org).

The server is packaged for deployment using **Docker**. The build process is multi-stage and compiles the Typescript source into pure Javascript for later execution.

The Postgres database similarly has a Dockerfile for initial deployment - all migrations are packaged as part of the image.

## Testing

![](images/testing.png)

Full **acceptance testing testing** is used for the server. A Postgres database is brought up and seeded for each test. The tests cover every API endpoint and all errors.

The tests are run using **Jest**. Each test truncates every table in the database to ensure no cross-test contamination.

The tests can be run locally on a system that has `docker` and `docker-compose` installed via running:

```
$ ./server/test/utils.bash acceptance test
```

This will build each element and run the acceptance tests.

Alternatively, the acceptance tests can be run in dev mode where the server automatically reloads and the tests automatically re-run when changes are made. This requires **tmux** be installed, and can be run via:

```
$ ./server/test/utils.bash acceptance dev
```

Running tests in this way will split the terminal into three panes (hence the tmux requirement), showing the database log, core server log, and test log -

![](images/acceptance_test_dev.png)

The test log is interactive and the tests can be run at any time by pressing `enter`. The tests also automatically re-run when any test files are changed. Quitting the test process (via either typing `q` or `ctrl-c`) will close both the DB and core processes as well.

## Deployment

![](images/ci.png)

**Github Actions** are used to run the CICD workflow. Currently, each change / PR triggers a full run of all tests. The tests are run in the same manner as they would be run locally.

# Documentation

The API endpoints are documented [here](./api.md). The format is currently adhoc, and will later be converted to OpenAPI.

# Contributing

This is a personal project, made public for demonstrative reasons.
