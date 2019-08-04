'use strict';

const fs = require('fs');
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [
    new winston.transports.File({ filename: './lmk_parser_log/error.log', level: 'error' }),
    new winston.transports.File({ filename: './lmk_parser_log/run.log', level: 'info' }),
  ]
});

fs.readFile('Layout.lmk', function(err, buffer) {
    if (err) {
        logger.error(err);
    } else {
        logger.info(buffer.toString());
        const data = buffer.toString().split('\n');
        const result = [];
        data.forEach(item => {
            if (/^\d/.test(item)) {
                const numbers = item.split(/\s+/);

                if (numbers.length > 3) {
                    const [ id, x, y ] = numbers;
                    result.push(`CIRCLE ${x},${y} 3000`);
                }
            }
        });

        fs.writeFileSync(('result.txt'), result.join('\n'));
    }
});
