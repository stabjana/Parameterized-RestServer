'use strict';

const path = require('path');

const errorMessage = `
#############################################
Usage: node testServer.js <configFileName>

For example: node testServer config.json
#############################################
`;

if (process.argv.length < 3) {
    console.log(errorMessage);
} else {
    const [, , configFileName] = process.argv; // it only reads the third parameter
    try {
        const config = require(path.join(__dirname, configFileName));
        console.log(config); // if you dont giv the name it will not run

    } catch (error) {
        console.log(`Hey, File not found: ${configFileName}`);
    }
}
// we pass the config to our server and we can use it in the server