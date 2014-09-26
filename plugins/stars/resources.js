var Hapi = require('hapi');
var Request = require('request');
var Boom = require('boom');

var secret = require('./../../config/secret.json').secret;

exports.getStarsCount = function(request, reply) {

  	var options = {
			uri: 'https://api.github.com/repos/joyent/node',
			method: 'GET',
			headers : {
	            'User-Agent' : secret.useragent,
	        }
	};

	var callback = function(error, response, body) {
		if(!error && response.statusCode == 200) {
			var jsonObject = JSON.parse(body);
			var starsCount = { stars_count: jsonObject.stargazers_count };
			reply(starsCount);
		} else if(!error && response.statusCode != 200){
			reply({
				statusCode: response.statusCode,
				message: "Could not retrieve stars count from node repo.",
				error: JSON.parse(body).message
			});
		} else {
			reply(Boom.badImplementation());
		}
	}

	Request(options, callback);

};
