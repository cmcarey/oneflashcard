#! /bin/bash

set -e

PREARGS="-f integration_tests.docker-compose.yml"
POSTARGS="--build -V --abort-on-container-exit"

function db_build {
  docker-compose $PREARGS up $POSTARGS db
}

function test {
  docker-compose $PREARGS up $POSTARGS
}

$@