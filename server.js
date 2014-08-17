var express		= require('express'),
    config		= require(__dirname + '/config/config'),
    logger		= require(__dirname + '/lib/logger'),
    http		= require('http'),
    bodyParser 	= require('body-parser'),
    io 			= require('socket.io'),
    app			= express();

http.globalAgent.maxSockets = 30;

logger.log('info', 'Initializing HckrStats back end on', process.env['NODE_ENV'], 'mode');

app.disable('x-powered-by');

logger.log('verbose', 'Binding external middlewares');
app.use(require('morgan')({format : 'dev', immediate : true}));
app.use(require('morgan')({format : 'dev'}));
app.use(require('method-override')());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(bodyParser.json({ type: 'application/vnd.api+json' }))
app.use(require('response-time')());
app.use(require('compression')());

logger.log('verbose', 'Binding custom middlewares');
app.use(require(__dirname + '/config/router')(express.Router(), logger));
app.use(require(__dirname + '/lib/error_handler')());

app.listen(config.port);
logger.log('info', 'Server listening on port', config.port);

module.exports = app;