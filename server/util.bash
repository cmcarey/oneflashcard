#! /bin/bash

set -e

function dbt {
  docker-compose up --build -V db
}

function test {
  docker-compose up --build -V --abort-on-container-exit
}

$@