#!/bin/bash

path=$(pwd)
script_dir=$(dirname "$(realpath "$0")")

# go to project root
cd "$script_dir/.."

npx sequelize-cli db:create --env test
npx sequelize-cli db:migrate --env test

# go to the original path
cd $path
