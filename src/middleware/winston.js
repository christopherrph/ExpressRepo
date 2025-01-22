const winston = require('winston');

const logger = winston.createLogger({
  level: 'info', // Logging level (e.g., 'error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly')
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(), // Log to the console
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }), // Log errors to a file
    new winston.transports.File({ filename: 'logs/combined.log' }) // Log all messages to a combined file
  ],
});

module.exports = logger;