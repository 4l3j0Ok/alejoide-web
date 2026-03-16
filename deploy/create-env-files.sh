#!/bin/bash
# Current directory
cdir=$(dirname "$0")

web_env_exists=false
projects_api_env_exists=false
[[ -f "$cdir/config/web/.env" ]] && web_env_exists=true
[[ -f "$cdir/config/projects-api/.env" ]] && projects_api_env_exists=true



if ! $web_env_exists; then
    echo "Creando archivo .env para web"
    [[ -f "$cdir/config/web/.env.example" ]] && cp "$cdir/config/web/.env.example" "$cdir/config/web/.env"
else
    echo "Archivo .env para web ya existe, saltando creación"
fi

if ! $projects_api_env_exists; then
    echo "Creando archivo .env para projects-api"
    [[ -f "$cdir/config/projects-api/.env.example" ]] && cp "$cdir/config/projects-api/.env.example" "$cdir/config/projects-api/.env"
else
    echo "Archivo .env para projects-api ya existe, saltando creación"
fi

