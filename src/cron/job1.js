const cron = require('node-cron');

const scheduleJob1 = () => {
    cron.schedule('*/10 * * * *', () => {
        console.log('Job 1: Running every 10 minutes');
    });
};

module.exports = scheduleJob1;