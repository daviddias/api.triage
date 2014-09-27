var Hapi 		= require('hapi');
var Request = require('request');
var Boom 		= require('boom');
var secret 	= require('./../../config/secret.json').secret;
var logger  = require('./../../modules/logger.js');

exports.getStarsCount = function(request, reply) {

  var options = {
		uri: 'https://api.github.com/repos/joyent/node',
		method: 'GET',
		headers : {
      'User-Agent' : secret.useragent,
    }
	};

	function receiveStarsCount(error, response, body) {
		if(!error && response.statusCode === 200) {
			var starsCount = JSON.parse(body).stargazers_count;
			reply({starsCount: starsCount});
		} else {
      reply(Boom.expectationFailed('Could not retrieve the star count, check status.github.com to see if the service is up'));
      logger.error('Error Getting starts: ' + error.detail);
    }
	}

	Request(options, receiveStarsCount);

};
