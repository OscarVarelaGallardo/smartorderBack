import winston from 'winston';
import fs from 'fs';
import path from 'path';
import { timeStamp } from 'console';

// Ruta absoluta a la carpeta de logs
const logDirectory = path.join(__dirname, '../logs');

// Asegúrate de que la carpeta exista
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, { recursive: true });
}

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: path.join(logDirectory, 'error.log'), level: 'error' }),
        new winston.transports.File({ filename: path.join(logDirectory, 'combined.log') })
    ]
});

// Archivo de acceso (por ejemplo para morgan)
const accessLogStream = fs.createWriteStream(path.join(logDirectory, 'access.log'), { flags: 'a' });

export { logger, logDirectory, accessLogStream };