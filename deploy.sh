#!/bin/sh
echo Building Cianna Lighting web app

echo Fetching most recent changes on main branch
git pull

echo Updating node modules
npm run install-modules

echo building production ready client
cd client && npm run build

echo building production ready server
cd ../server && npm run build

echo stopping previous process
pm2 kill

echo starting production application
pm2 start dist/server.js

exit 1
