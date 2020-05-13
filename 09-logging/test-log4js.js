const log4js = require('log4js');
/**
log4js.addLayout('json', function(config) {
    return function(logEvent) { return JSON.stringify(logEvent, Object.getOwnPropertyNames(logEvent)) + config.separator; }
});

log4js.configure({
    appenders: {
        out: { type: 'stdout', layout: { type: 'json', separator: '\n' } }
    },
    categories: {
        default: { appenders: ['out'], level: 'info' }
    }
});
 **/

var logger = log4js.getLogger();
logger.level = 'debug';

try {
    const a = b.c;
} catch (e) {
    //console.log(JSON.stringify(e));
    logger.error('Hello distributed log files!', e);
}
