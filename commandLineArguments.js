'use strict';

// we have a process object available

// console.log(process);
// console.log(process.argv);
// console.log('length', process.argv.length);


console.log(process.argv[0]);

const [, , ...values] = process.argv;
console.log(values);

const [, , w, , q] = process.argv;
console.log(w, q);

// we get everything as a string

console.log('+++++++++++++');
for (let i = 0; i < values.length; i++) {
    console.log(`argv[${i}] = ${process.argv[i]}`);
}
console.log('values');
for (let i = 0; i < values.length; i++) {
    console.log(`values[${i}] = ${values[i]}`);
}