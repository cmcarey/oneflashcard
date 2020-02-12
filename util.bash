#!/bin/bash

set -e

function server.dev {
  cd server/docker-compose
  docker-compose -f dev.docker-compose.yml up -V
}

function client.dev {
  cd webclient
  yarn start.dev
}

function client.dev.mockdb {
  cd webclient
  yarn start.dev.mockdb
}

$@