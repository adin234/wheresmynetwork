var loc			= __dirname + '/../controllers/',
	wireless 	= require(loc + 'wireless')

module.exports	= function (router, logger) {

	router.del 	= router.delete;

	router.all('*', function (req, res, next) {
		//console.log(req);
		//logger.log('debug', '--REQUEST--', req);
		logger.log('debug', '--REQUEST BODY--', req.body);
		logger.log('debug', '--REQUEST QUERY--', req.query);
		next();
	});

	router.get('/wireless', wireless.get_wireless);
	router.post('/wireless', wireless.post_wireless);

	return router;
};