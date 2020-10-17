
npm install --save-dev @babel/core@7 @babel/cli@7

node_modules/.bin/babel --version
npx babel --version

npm install --save-dev @babel/preset-react@7

npx babel src --presets @babel/react --out-dir public

npm install --save-dev @babel/preset-env@7