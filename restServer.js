'use strict';
// if you don't use dynamic inports it can be inside the function
const express = require('express');
const cors = require('cors');
const path = require('path');

const errorMessage = `
#############################################
Usage: node restServer.js <configFileName>

For example: node restServer config.json
#############################################
`;

if (process.argv.length < 3) {
    console.log(errorMessage);
} else {
    const [, , configFileName] = process.argv; // it only reads the third parameter
    try {
        const config = require(path.join(__dirname, configFileName));
        startServer(config); // calling the function startServer

    } catch (error) {
        console.log(error);
        console.log(`Hm... ConfigFile not found: ${configFileName}`);
    }
} // main program ends here -- and server gets started


function startServer(config) {

    const app = express();

    // const { port, host } = require('./config.json');
    const { port, host } = config;

    const storageEnginePath = path.join(__dirname, config.engineFolder, config.storageEngine.folder); // where the datastorage layer is
    const dataStoragePath = path.join(storageEnginePath, config.storageEngine.dataStorageFile); // thats the dataStorageLayer.js in the object

    const storagePath = path.join(__dirname, config.allStoragesFolder, config.storage.folder);
    console.log(storagePath);

    const Datastorage = require(dataStoragePath);
    const storage = new Datastorage(storagePath, config.storage.storageConfigFile);

    app.use(cors());
    app.use(express.json());

    app.get('/api', (req, res) => res.json(storage.RESOURCE));

    app.get(`/api/${storage.RESOURCE}`, (req, res) =>
        storage.getAll().then(result => res.json(result))
    );

    app.get(`/api/${storage.RESOURCE}/:id`, (req, res) =>
        storage.get(req.params.id).then(result => res.json(result))
    );

    app.post(`/api/${storage.RESOURCE}`, (req, res) =>
        storage.insert(req.body)
            .then(result => res.json(result))
            .catch(err => res.json(err))
    );

    app.put(`/api/${storage.RESOURCE}`, (req, res) =>
        storage.update(req.body)
            .then(result => res.json(result))
            .catch(err => res.json(err))
    );

    app.delete(`/api/${storage.RESOURCE}/:id`, (req, res) =>
        storage.remove(req.params.id)
            .then(result => res.json(result))
            .catch(err => res.json(err))
    );

    app.all('*', (req, res) => res.json('not supported'));

    app.listen(port, host, () => console.log(`Restserver ${host}:${port} serving`));
}

