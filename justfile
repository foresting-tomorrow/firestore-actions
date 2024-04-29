install:
    npm install

build: install
    npx ncc build index.js
