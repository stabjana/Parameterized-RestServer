# Parameterized version of the server

## Rest Server:

copy all the storageLayer, server, and storage files from previous project,
then modify

here update config json with storages and folders

```js
{
    "port":4000,
    "host":"localhost",
    "engineFolder":"storageEngines",
    "storageFolder":"storages",
    "storageEngine":{
        "folder":"storageLayer",
        "dataStorageFile":"dataStorageLayer.js"
    },
        "storage":{
            "folder":"computerStorage",
            "storageConfigFile":"storageConfig.json"
        }
}
```

Filename: storageConfig.json
needs to match the one in the config.json

```js
{
    "storageFile":"computers.json",
    "adapterFile":"computerAdapter.js",
    "primaryKey":"id",
    "resource":"computers"
}
```

### storage Layer

we need to create a class with a constructor, that takes the storageConfig.json values as parameters to use in the functions

I am taking that to the storageConfig

requiring that file to this adapt -- from the adapter function

// copied functions updated with this.#
// replace storageFilePath with this.#storageFilePath

### dataStorage

#### for the persons:

then create a new file: configPerson

```js
{
    "port":4001,
    "host":"localhost",
    "engineFolder":"storageEngines",
    "storageFolder":"storages",
    "storageEngine":{
        "folder":"storageLayer",
        "dataStorageFile":"dataStorageLayer.js"
    },
        "storage":{
            "folder":"personStorage",
            "storageConfigFile":"storageConfig.json"
        }
}
```

## create commandLineArguments

```js
console.log(process);
console.log(process.argv);
```

contains operating system and lots of useful things

#### after running you can pass whatever ypou write in the command line:

```shell
 node commandLineArguments.js 1 2 3 4 5
```

```shell
node commandLineArguments.js 1 2 3 4 5
[
  '/usr/local/bin/node',
  '/Users/s2400789/Documents/BC_Studies/12_Node-Advanced/week4/param-Version/commandLineArguments.js',
  '1',
  '2',
  '3',
  '4',
  '5'
```

```shell
node commandLineArguments.js 12345
[
  '/usr/local/bin/node',
  '/Users/s2400789/Documents/BC_Studies/12_Node-Advanced/week4/param-Version/commandLineArguments.js',
  '12345'
]
```

```shell
 node commandLineArguments.js 1 2 3 jhkjhk "this is a
string"
[
  '/usr/local/bin/node',
  '/Users/s2400789/Documents/BC_Studies/12_Node-Advanced/week4/param-Version/commandLineArguments.js',
  '1',
  '2',
  '3',
  'jhkjhk',
  'this is a string'
]
```

```js
console.log("length", process.argv.length);
```

```shell
 node commandLineArguments.js 1 2 3 jhkjhk "this is a string"
length 7
```

we get everything as a string and we can get rid of the first 2 arguments that contain:
argv[0] => program name (node)
argv[1] => filepath

```js
const [, , ...values] = process.argv;
console.log(values);
```

```shell
node commandLineArguments.js 1 2 3 jhkjhk "this is a string"
[ '1', '2', '3', 'jhkjhk', 'this is a string' ]

console.log('+++++++++++++');
for (let i = 0; i < values.length; i++) {
    console.log(`argv[${i}] = ${process.argv[i]}`);
}

console.log('values');
for (let i = 0; i < values.length; i++) {
    console.log(`values[${i}] = ${values[i]}`);
}
```

### creating a test server

```js
"use strict";

const path = require("path");

const [, , configFileName] = process.argv;

if (process.argv.length < 3) {
  console.log("Please provide a parameter");
} else {
  const config = require(path.join(__dirname, configFileName));
  console.log(config); // if you dont giv the name it will not run
}
```

we pass the config to our server and we can use it in the server

### use it

now we can see the files:

```shell
node testServer.js configPerson.json;
```

we need to change the restServer to run it from command line

but then you can provide your argument for starting the server via console. Cool!

### then

put the testServer.js code to the restServer.js

# This can now run several servers at a time from the same file

Not functioning:
get keys
computers keys : empty array
# Parameterized-RestServer
