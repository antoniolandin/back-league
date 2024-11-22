#!/bin/bash
# Description: script para rellenar la base de datos con los jugadores y equipos por defecto
# Prerequisites: Se necesita el servidor de la api levantado
# Author: @antoniolandin

API_URL="http://localhost:3500/api"

script_dir=$(dirname "$(realpath "$0")")

parse_json_array() {
    filename="${script_dir}/${1}"
    cat $filename | tr -d " " | tr -d "\n" | tr -d "[" | tr -d "]" | sed 's/,{/\n{/g'
}

# Check if the server is up
if ! curl -s $API_URL > /dev/null 2>&1; then
    echo "Server is down."
    exit 1
else
    echo "Server is up"
fi

# post equipos
parse_json_array equipos.json | while read line; do
    curl -s -X POST -H "Content-Type: application/json" -d $line "${API_URL}/equipos" > /dev/null 2>&1
done

# post jugadores
parse_json_array jugadores.json | while read line; do
    curl -s -X POST -H "Content-Type: application/json" -d $line "${API_URL}/jugadores" > /dev/null 2>&1
done

exit 0
