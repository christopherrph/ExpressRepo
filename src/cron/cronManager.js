// cron/cronManager.js
const cron = require('node-cron');
const job1 = require('./job1');
const job2 = require('./job2');

const cronJobs = [
  job1,
  job2
];

const startCronJobs = () => {
  cronJobs.forEach(job => job());
};

module.exports = { startCronJobs };