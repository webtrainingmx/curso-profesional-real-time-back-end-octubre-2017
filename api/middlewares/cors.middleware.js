function allowCrossDomain( req, res, next ) {
	// Instead of "*" you could only specific origins
	res.header( 'Access-Control-Allow-Origin', '*' );
	// Supported HTTP verbs
	res.header( 'Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE' );
	res.header( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Api-Token' );
	next();
}

module.exports = allowCrossDomain;