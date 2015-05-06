var bunyan = require('bunyan');
var logger = bunyan.createLogger({
  name: 'armentum',
  streams: [{
    type: 'rotating-file',
    level: 'trace',
    path: './logs/armentum.log',
    period: '1d',
    count: 5,
  }]
});

module.exports = logger;
