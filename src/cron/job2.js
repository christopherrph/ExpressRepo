const cron = require('node-cron');

const scheduleJob1 = () => {
  cron.schedule('*/5 * * * *', () => {
    console.log('Job 2: Running every 5 minutes');
  });
};

module.exports = scheduleJob1;