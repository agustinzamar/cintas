#!/bin/bash
git pull origin master \
&& composer install \
&& php artisan migrate \
&& nvm install 16 \
&& nvm use 16 \
&& npm install \
&& npm run build
