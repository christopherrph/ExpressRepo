// logger.js
const winston = require('winston');

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message }) => {
    return `Winston: ${timestamp} [${level.toUpperCase()}]: ${message}`;
  })
);

// Create a Winston logger
const logger = winston.createLogger({
  level: 'info', // Set the default logging level
  format: logFormat,
  transports: [
    // Log to the console
    new winston.transports.Console(),
    // Log to a file
    new winston.transports.File({ filename: 'logs/app.log' }),
  ],
});

module.exports = logger;