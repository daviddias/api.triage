var config = require('config');
var Hapi = require('hapi');
var Boom = require('boom');

var https = require('https');

exports.getStarsCount = function (request, reply) {

  var options = {
			host: 'api.github.com',
			port: 443,
			path: '/repos/joyent/node',
			method: 'GET',
			headers : {
	            'User-Agent' : 'nodejs'
	        }
	};

	var callback = function(req) {
		var jsonString = '';
		req.on('data', function(chunk) {
			jsonString += chunk;
		});

		req.on('end', function() {
			//TODO: stargazers_count, watchers and watchers_count fields have the same value on the object returned. Choose the right one.
			var jsonObject = JSON.parse(jsonString);
			var starsCount = { stars_count : jsonObject.stargazers_count};
			reply(starsCount);
		});

	};

	var req =  https.request(options, callback);
	req.on('error', function(e) {
		reply(Boom.badImplementation('Could not retrieve stars count from node.js github repo.'));
	});

	req.end();

};
