#!/bin/bash
composer install \
&& php artisan migrate \
&& nvm install 16 \
&& nvm use 16 \
&& npm install
