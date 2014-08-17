var config 			= require(__dirname + '/../config/config'),
    util			= require(__dirname + '/../helpers/util'),
    curl			= require(__dirname + '/../lib/curl'),
    logger         	= require(__dirname + '/../lib/logger'),
    mongo			= require(__dirname + '/../lib/mongoskin');

exports.get_wireless = function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	var data = {},
		start = function () {
			logger.log('info', 'Getting Wireless');
			mongo.collection('networks')
				.find({}).toArray(send_response);
		},
		send_response = function (err, result) {
			if (err) {
				logger.log('warn', 'Error getting the networks');
				return next(err);
			}

			if(result.length === 0) {
				return res.status(500).send({message: 'no networks found'});
			}

			res.send(result);
		};

	start();
};

exports.post_access = function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	var data = {},
		start = function () {
			logger.log('info', 'Putting access');
			logger.log('info', req.body);
			mongo.collection('networks')
					.update({_id : req.body.subscriber_number}, {$set: req.body}, {upsert:true}, respond);
		},
		respond = function (err, result) {
			if (err) {
				logger.log('warn', 'Error putting the data');
				console.log(err);
				return next(err);
			}

			send_response(null, ['success']);
		},
		send_response = function (err, result) {
			if (err) {
				logger.log('warn', 'Error putting the data');
				return next(err);
			}

			if(result.length === 0) {
				return res.status(500).send({message: 'access not found'});
			}

			res.send(result);
		};

	start();
};

exports.post_wireless = function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	var data = {},
		start = function () {
			logger.log('info', 'Putting Wireless');
			logger.log('info', req.body);
			data = req.body;
			data._id = data.ip;
			mongo.collection('networks')
					.update({_id : data._id}, {$set: data}, {upsert:true}, format_insert);
		},
		format_insert = function (err, result) {
			if (err) {
				logger.log('warn', 'Error putting the data');
				console.log(err);
				return next(err);
			}

			send_response(null, data);
		},
		send_response = function (err, result) {
			if (err) {
				logger.log('warn', 'Error putting the data');
				return next(err);
			}

			if(result.length === 0) {
				return res.status(500).send({message: 'user not found'});
			}

			res.send(result);
		};

	start();
};
