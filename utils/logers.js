const winston = require('winston')
const path = require('path')
const dt = new Date();
const timestamp = dt.getDate() + '-' + dt.getMonth() + '-' + dt.getFullYear()
const config = require('../config');

// configuration for logger.
const logger = winston.createLogger({
    level: 'info',
    timestamp: timestamp,
    format: winston.format.json(),
    colorize: 'true',
    // defaultMeta: { service: 'transactions-crawler' },
    transports: [
        new winston.transports.File({ filename: path.join('logs', `error_${timestamp}.log`), level: 'error' }),
        new winston.transports.File({ filename: path.join('logs', `info_${timestamp}.log`), level: 'info' }),
    ]
});

if (config.node_env !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}
module.exports = { logger }
