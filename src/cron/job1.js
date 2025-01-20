const cron = require('node-cron');

const scheduleJob1 = () => {
  cron.schedule('*/3 * * * * *', () => {
    console.log('Job 1: Running every 3 seconds');
  });
};

module.exports = scheduleJob1;