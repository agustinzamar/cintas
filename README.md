# Sistema de venta de entradas

## Pre-Requisites

- Docker

## Installation

1. Clone this repo `git clone https://github.com/Crystal-Desarrollo/venta-entradas.git`
2. cd `venta-entradas`
3. Use the following command to install all the backend dependencies
    ```bash
     docker run --rm \
     -u "$(id -u):$(id -g)" \
     -v $(pwd):/opt \
     -w /opt \
     laravelsail/php80-composer:latest \
     composer install
     ```  
4. `./vendor/bin/sail up -d` to start the docker container
5. `./vendor/bin/sail php artisan migrate --seed` to migrate the database and insert the initial data
6. `./vendor/bin/sail npm run install`to install the frontend dependencies
7. `./vendor/bin/sail npm run dev` to start the vite compiler
8. Access to `http://localhost` on the browser to see the system

## Development

1. Run `./vendor/bin/sail up -d` to start the docker container
2. Run `./vendor/bin/sail npm run dev` to build react

## Optional

- [Create an alias for sail](https://laravel.com/docs/9.x/sail#configuring-a-shell-alias)
