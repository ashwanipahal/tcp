#!/usr/bin/env bash

# Creates an .env from ENV variables for use with react-native-config

if [ ! -z "$ENV" ]; then
   ENV_WHITELIST=${ENV_WHITELIST:-"^RWD_APP"}
   printf "Creating an .env file with the following whitelist:\n"
   if [[ "$ENV" = "dev" ]]; then
     set | egrep -e $ENV_WHITELIST > src/env/.env.dev
     printf "\n.env created with contents:\n"
     cat src/env/.env.dev
   elif [[ "$ENV" = "int" ]]; then
     set | egrep -e $ENV_WHITELIST > src/env/.env.int
     printf "\n.env created with contents:\n"
     cat src/env/.env.int
   elif [[ "$ENV" = "uat" ]]; then
     set | egrep -e $ENV_WHITELIST > src/env/.env.uat
     printf "\n.env created with contents:\n"
     cat src/env/.env.uat
   elif [[ "$ENV" = "prod" ]]; then
     set | egrep -e $ENV_WHITELIST > src/env/.env.prod
     printf "\n.env created with contents:\n"
     cat src/env/.env.prod
   else
     set | egrep -e $ENV_WHITELIST > src/env/.env.local
     printf "\n.env created with contents:\n"
     cat src/env/.env.local
   fi
fi




