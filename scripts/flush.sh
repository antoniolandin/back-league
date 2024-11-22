#!/bin/bash

path=$(pwd)
script_dir=$(dirname "$(realpath "$0")")

# go to project root
cd "$script_dir/.."

npx sequelize-cli db:drop
npx sequelize-cli db:create
npx sequelize-cli db:migrate

# go to the original path
cd $path
