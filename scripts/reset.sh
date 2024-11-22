#!/bin/bash
script_dir=$(dirname "$(realpath "$0")")
flush_script="${script_dir}/flush.sh"
fill_script="${script_dir}/fill.sh"

# color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
WHITE='\033[0;37m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
TURQUOISE='\033[0;36m'
GRAY='\033[0;90m'
NC='\033[0m'

# ctrl + c
trap ctrl_c INT
function ctrl_c(){
    echo -e "\n${RED}Saliendo...${NC}\n"
    tput cnorm && exit 1
}

echo -e "${BLUE}Reseteando db...${NF}"

# first flush
bash $flush_script > /dev/null 2>&1

echo -e "${GREEN}Base de datos reseteada con éxita${NF}"

echo -e "${BLUE}Populando db...${NF}"

# then fill
bash $fill_script > /dev/null 2>&1

if [ $? -eq 0 ]; then
    echo -e "${GREEN}Base de datos populada con éxito${NF}"
else
    echo -e "${RED}Error al popular la base de datos${NF}"
fi

