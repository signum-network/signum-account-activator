#!/bin/bash

FILE=.env
if [ -f "$FILE" ]; then
    echo "$FILE exists...all fine!"
else
  cp .env.default $FILE
  echo "Copied Default Env File. Please check .env for further configuration."
fi
