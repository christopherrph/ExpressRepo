const { parentPort, workerData } = require('worker_threads');
const { findPrimesInRange } = require('./primeUtils'); // Import shared functions

const { start, end } = workerData;
const primes = findPrimesInRange(start, end);

// Send the result back to the main thread
parentPort.postMessage({ primes });