var Hapi       = require('hapi');
var resources  = require('./resources.js');

module.exports = function (server) {
    server.route({ 
    method: 'GET',
    path: '/stars',
    handler: resources.getStarsCount,
    config: { }
  });
};

