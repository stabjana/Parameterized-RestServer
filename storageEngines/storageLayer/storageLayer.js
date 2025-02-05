'use strict';

const path = require('path');

const { readStorage, writeStorage } = require('./readerWriter');
// const {adapt}=require('./personAdapter');
// const storageFilePath=path.join(__dirname,'employees.json');
// const resource = 'persons';


module.exports = class StorageLayer {
    #adapt;
    #storageFilePath;
    #storageConfig; // pass the config object to the class as a parameter

    constructor(storageFolder, storageConfigFile) {
        this.#storageConfig = require(path.join(storageFolder, storageConfigFile)); // I am taking that to the storageConfig /*  storageConfigFile?? in the config file? */
        this.#adapt = require(path.join(storageFolder, this.#storageConfig.adapterFile)); // requiring that file to this adapt -- from the adapter function
        this.#storageFilePath = path.join(storageFolder, this.#storageConfig.storageFile); // and for this we take the storageFile

        // now we have initialized the object
    }

    // new
    get PRIMARY_KEY() {
        return this.#storageConfig.primary_Key;
    }

    get RESOURCE() {
        return this.#storageConfig.resource
    }


    // copied functions updated with this.#

    async getAllFromStorage() {
        return await readStorage(this.#storageFilePath); // replace storageFilePath with this.#storageFilePath
    }

    async getFromStorage(value, key = this.PRIMARY_KEY) {
        const dataArray = await readStorage(this.#storageFilePath);
        return dataArray.filter(item => item[key] == value);
        // return (await readStorage(storageFilePath)).filter(item=>item[key]==value);
    }

    async addToStorage(newObject) {
        const storage = await readStorage(this.#storageFilePath);
        storage.push(this.#adapt(newObject));
        return await writeStorage(this.#storageFilePath, storage);
    }

    async removeFromStorage(value) { // value is for primary_key
        const storage = await readStorage(this.#storageFilePath);
        const ind = storage.findIndex(item => item[this.PRIMARY_KEY] == value);
        if (ind < 0) return false;
        storage.splice(ind, 1);
        return await writeStorage(this.#storageFilePath, storage);
    }

    async getKeys() {
        const storage = await readStorage(this.#storageFilePath);
        const keys = new Set(storage.flatMap(item => Object.keys(item)));
        return [...keys];
    }

    async updateStorage(modifiedObject) {
        const storage = await readStorage(this.#storageFilePath);
        const oldObject = storage.find(item => item[this.PRIMARY_KEY] == modifiedObject[this.PRIMARY_KEY]);
        if (oldObject) {
            Object.assign(oldObject, this.#adapt(modifiedObject));
            return await writeStorage(this.#storageFilePath, storage);
        }
        return false;
    }
}

/* const { adapt } = require('./computerAdapter');
const storageFilePath = path.join(__dirname, 'computers.json');
const resource = 'computers';

const PRIMARY_KEY='id'; //hard coded, not nice
 */