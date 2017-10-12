const express = require( 'express' );
const app = express();
const path = require( 'path' );
const server = require( 'http' ).createServer( app );

const morgan = require( 'morgan' );
const bodyParser = require( 'body-parser' );

const io = require( 'socket.io' )( server );
const port = process.env.PORT || 3300;

const pollsRouter = require( './api/routers/polls-router' );

// 1. Morgan middleware for logging
app.use( morgan( 'dev' ) );

// 2. Express static index.html file
app.get( '/', ( req, res ) => {
	res.sendFile( path.join( __dirname, 'index.html' ) );
} );

// 3. Enable CORS on ExpressJS to avoid cross-origin errors when calling this server using AJAX
// We are authorizing all domains to be able to manage information via AJAX (this is just for development)
function allowCrossDomain( req, res, next ) {
	// Instead of "*" you could only specific origins
	res.header( 'Access-Control-Allow-Origin', '*' );
	// Supported HTTP verbs
	res.header( 'Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE' );
	res.header( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Api-Token' );
	next();
}

app.use( allowCrossDomain );

// 4. Body parser middleware to auto-parse request body to JSON
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( bodyParser.json() );

// 5. Express router for polls
app.use( '/api/v1/polls', pollsRouter );

// 6. Socket.io configuration
io.on( 'connection', ( socket ) => {

	console.log( 'User connected' );

	socket.on( 'new-message', ( data ) => {
		console.log( "Message has been received!", data );

		io.emit( 'message-received', {
			username: socket.username,
			message: data,
			text: data
		} );
	} );

	socket.on( 'new-vote', ( data ) => {

		console.log( "Vote has been received!", data );

		// Here we should send the VOTE instead of the ANSWER
		io.emit( 'vote-received', {
			data: data
		} );
	} );

	socket.on( 'disconnect', () => {
		console.log( 'user-disconnected' );

		socket.emit( 'user-disconnected', () => {

		} );
	} );
} );

// 7. Run the server
server.listen( port, () => {
	console.log( 'Servidor activo en puerto: %d', port );
} );