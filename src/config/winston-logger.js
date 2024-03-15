const {createLogger, format, transports} = require('winston');
const {combine, printf,timestamp, label, prettyPrint} = format;
const DailyRotateFile = require('winston-daily-rotate-file');



const logger = createLogger({
    level: 'info',
    format: combine(
        label({ label: 'FileProject' }),
        timestamp(),
        prettyPrint(),
        printf(info => `[${info.timestamp}] [${info.label}] ${info.message}`)
    ),
    //silent:true,
    exitOnError: true,
    transports: [
        new transports.Console(),
        new DailyRotateFile({
            filename: 'logs/application-%DATE%.log',
            datePattern: 'DD.MM.YYYY',
            zippedArchive: true,
            maxSize: '250mb',
            maxFiles: '14d'
        })    ]
});

module.exports = logger;
