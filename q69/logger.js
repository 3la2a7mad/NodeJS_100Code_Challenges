// Alaa Ahmad

const winston = require('winston');
require('winston-daily-rotate-file');

// Configure the transport for daily log rotation
const fileRotateTransport = new winston.transports.DailyRotateFile({
    filename: 'logs/app-%DATE%.log', // Filename pattern
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true, // Compress old log files
    maxSize: '20m',      
    maxFiles: '14d'      
});

const logger = winston.createLogger({
    level: 'info', // Log only if level is 'info' or higher
    format: winston.format.json(), 
    transports: [
        fileRotateTransport 
    ],
    exitOnError: false,
});

// For non-production environments, also log to the console with colors
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    }));
}

module.exports = logger;