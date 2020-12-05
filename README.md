# React/Express/MongoDB/Node/+ Boilerplate

This project is a starting point for a React app that also has a local API server using Express.

There are 2 different package.json files, one for the server and one for the client. This is due to using the Node `experimental-modules`

## Server

## Client

The client build process compiles the React app located in `/src/client` into a bundled located at `/static/[filename].bundle.js`.

## Running the project

In order to run the server, use `npm run start`, and the server will start on port 3000 (http://localhost:3000).

## Development

Nodemon will watch the server files by running `npm run start:dev`.

Webpack will watch the client files by running `npm run build:watch`.
