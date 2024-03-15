const {createLogger, format, transports} = require('winston');
const {combine, printf,timestamp, label, prettyPrint} = format;


const logger = createLogger({
    level: 'info',
    format: combine(
        label({ label: 'FileProject' }),
        timestamp(),
        printf(info => `[${info.timestamp}] [${info.label}] ${info.message}`)
    ),
    //silent:true,
    exitOnError: true,
    transports: [
        new transports.Console(),
        new transports.File({filename: 'logfile.log'})
    ]
});

module.exports = logger;
