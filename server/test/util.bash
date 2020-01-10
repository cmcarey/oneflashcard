#! /bin/bash

set -e
cd $(dirname $0)
POSTARGS="--build -V --abort-on-container-exit"

function acceptance {
  cd acceptance/

  DC="docker-compose.yml"
  DC_DEV="dev.docker-compose.yml"

  function test {
    docker-compose -f $DC up $POSTARGS
  }

  function dev {
    tmux -f tmux.conf attach
  }

  function dev_db {
    docker-compose -f $DC_DEV up $POSTARGS db
    docker-compose -f $DC_DEV down
  }

  function dev_core {
    echo Starting core
    sleep 2
    docker-compose -f $DC_DEV up $POSTARGS core
    docker-compose -f $DC_DEV down
  }

  function dev_acceptance {
    echo Starting acceptance tests
    sleep 4
    docker-compose -f $DC_DEV run --rm acceptance
    docker-compose -f $DC_DEV down
  }

  $@
}

$@