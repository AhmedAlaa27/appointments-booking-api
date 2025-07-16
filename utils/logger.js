const pino = require("pino");

const loggerOptions = {
    level: process.env.LOG_LEVEL || "info",
    transport: {
        target: "pino-pretty",
        options: {
            colorize: true,
            translateTime: "SYS:standard",
            ignore: "pid,hostname,method,url,userAgent,ip,statusCode,duration,endpoint,user,database,status,error,context",
            messageFormat: "{msg}",
            errorLikeObjectKeys: ["err", "error"],
        },
    },
};

const logger = pino(loggerOptions);

const loggerMiddleware = (req, res, next) => {
    const start = Date.now();

    logger.info(
        {
            method: req.method,
            url: req.originalUrl,
            ip: req.ip,
            userAgent: req.headers["user-agent"],
        },
        `➡️  Incoming ${req.method} ${req.originalUrl}`
    );

    res.on("finish", () => {
        const duration = Date.now() - start;

        logger.info(
            {
                method: req.method,
                url: req.originalUrl,
                statusCode: res.statusCode,
                duration: `${duration}ms`,
            },
            `✅ Completed ${req.method} ${req.originalUrl} with ${res.statusCode} in ${duration}ms`
        );
    });

    next();
};

module.exports = {
    logger,
    loggerMiddleware,
};
