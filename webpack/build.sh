#!/bin/sh

echo 'Start building 👷'
webpack --config webpack/webpack.config.prod.js --bail
cp index.html dist
cp index.html dist/200.html
echo '👏'
