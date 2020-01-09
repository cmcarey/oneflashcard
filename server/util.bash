#! /bin/bash

set -e

cd $(dirname $0)

POSTARGS="--build -V --abort-on-container-exit"

function db_build {
  DC="integration_tests.docker-compose.yml"
  docker-compose -f $DC up $POSTARGS db
}

function test {
  DC="integration_tests.docker-compose.yml"
  docker-compose -f $DC up $POSTARGS
}

function watch {
  DC="integration_tests_watcher.docker-compose.yml"
  docker-compose -f $DC build
  tmux -f integration_tests/tmux.conf attach
}

function watch_db {
  DC="integration_tests_watcher.docker-compose.yml"
  docker-compose -f $DC up $POSTARGS db
  docker-compose -f $DC down
}

function watch_core {
  echo Waiting to start core
  sleep 3
  DC="integration_tests_watcher.docker-compose.yml"
  docker-compose -f $DC up $POSTARGS core
  docker-compose -f $DC down
}

function watch_integration_tests {
  echo Waiting to start tests
  sleep 6
  DC="integration_tests_watcher.docker-compose.yml"
  docker-compose -f $DC run --rm integration_tests
  docker-compose -f $DC down
}

$@