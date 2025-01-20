const cron = require('node-cron');

const scheduleJob1 = () => {
  cron.schedule('*/10 * * * * *', () => {
    console.log('Job 2: Running every 10 seconds');
  });
};

module.exports = scheduleJob1;