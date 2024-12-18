#!/bin/bash
# Description: script para rellenar la base de datos con los jugadores y equipos por defecto
# Prerequisites: Se necesita el servidor de la api levantado
# Author: @antoniolandin

API_URL="http://localhost:3500/api"

script_dir=$(dirname "$(realpath "$0")")

parse_json_array() {
    filename="${script_dir}/${1}"
    jq -c '.[]' "$filename"
}

declare -A usuarios
usuarios=(
    [1]="antonio@example.com"
    [2]="maria@example.com"
    [3]="carlos@example.com"
    [4]="ana@example.com"
    [5]="luis@example.com"
)

# Check if the server is up
if ! curl -s $API_URL > /dev/null 2>&1; then
    echo "Server is down."
    exit 1
else
    echo "Server is up"
fi

# post equipos
parse_json_array json_files/equipos.json | while read line; do
    echo $line
    curl -s -X POST -H "Content-Type: application/json" -d "$line" "${API_URL}/equipos"
done

# post jugadores
parse_json_array json_files/jugadores.json | while read line; do
    curl -s -X POST -H "Content-Type: application/json" -d "$line" "${API_URL}/jugadores"
done

parse_json_array json_files/usuarios.json | while read line; do
    curl -s -X POST -H "Content-Type: application/json" -d "$line" "${API_URL}/usuarios/register"
done

# post equipos fantasy
contador=1
while read -r line; do
    token=$(node ${script_dir}/generateToken.js ${contador} "${usuarios[$contador]}")
    curl -s -X POST -H "Authorization: Bearer $token" -H "Content-Type: application/json" -d "$line" "${API_URL}/fantasy_equipos"
    contador=$((contador+1))
done < <(parse_json_array json_files/fantasy_equipos.json)

# post jugadores fantasy
for i in {1..5} 
do
    token=$(node "${script_dir}/generateToken.js" "${i}" "${usuarios[$i]}")
    for j in {1..5} 
    do
        id_jugador=$((RANDOM%51 + 1))
        curl -s -X POST -H "Authorization: Bearer $token" -H "Content-Type: application/json" -d "{\"id_jugador\":${id_jugador}, \"id_equipo_fantasy\":${i}}" "${API_URL}/fantasy_equipos/jugadores"
    done
done

# post partidos
parse_json_array json_files/partidos.json | while read line; do
    curl -s -X POST -H "Content-Type: application/json" -d "$line" "${API_URL}/partidos"
done

exit 0
