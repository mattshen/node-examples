const winston = require('winston');
const { createLogger, format } = require('winston');
const { combine, timestamp, label, printf } = format;

const transports = {
    console: new winston.transports.Console({ level: 'info' })
};

const myFormat = printf((info) => {
    if (info.meta && info.meta instanceof Error) {
        return `${info.timestamp} ${info.level} ${info.message} : ${info.meta.stack}`;
    }
    return `${info.timestamp} ${info.level}: ${info.message}`;
});

const errorStackTracerFormat = winston.format(info => {
    if (info.meta && info.meta instanceof Error) {
        info.message = `${info.message} ${info.meta.stack}`;
    }
    return info;
});

const logger = createLogger({
    level: 'debug',
    format: winston.format.combine(
        format.colorize(),
        format.timestamp(),
        format.splat(),
        myFormat
    ),
    transports: [transports.console],
});

try {
    const a = b.c;
} catch (e) {
    logger.error(e);
    logger.error("error",{crn: 123}, e);
    logger.log({
        level: 'info',
        message: e,
        crn: 123
    });
    //logger.error('Hello distributed log files!', e, {crn: 123});
}

//logger.error("message", new Error("an error"));
