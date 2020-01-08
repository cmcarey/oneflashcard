#! /bin/bash

set -e

function dbt {
  docker-compose up --build -V db
}

function core {
  docker-compose up --build -V core
}

function test {
  docker-compose up --build -V --abort-on-container-exit
}

$@