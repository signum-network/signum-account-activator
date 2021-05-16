#!/bin/bash

if [ -v CI ]; then
  exit 0
fi

FILE=.env
if [ -f "$FILE" ]; then
    echo "$FILE exists...all fine!"
else
  cp .env.default $FILE
  echo "Copied Default Env File. Please check .env for further configuration."
fi
