#! /usr/bin/env bash

./node_modules/.bin/tailwind build ./style.css -c ./tailwind.config.js -o ./project/tailwind-ubuntu.css
chown 1000:1000 ./project/tailwind-ubuntu.css
chmod g+w ./project/tailwind-ubuntu.css