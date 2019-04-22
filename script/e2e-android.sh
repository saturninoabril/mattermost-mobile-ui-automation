#!/bin/bash

$(npm bin)/appium --port 4723 > appium.log & echo $! > appium.pid
echo "Starting appium server pid @" $(cat appium.pid)

sleep 5
echo "Starting actual E2E tests"
$(npm bin)/tape src/android/index.js | tap-spec

sleep 5

if ps -p $(cat appium.pid)> /dev/null; then
  echo "Stopping appium server pid @" $(cat appium.pid)
  kill -KILL $(cat appium.pid)
fi

# Should delete appium.log and appium.pid but let those stay to easily inspect logs for Appium debugging
# Just added those to .gitignore
