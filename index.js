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
app.use( ( req, res, next ) => {
	res.header( "Access-Control-Allow-Origin", "*" );
	res.header( "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" );
	next();
} );

// 4. Body parser middleware to auto-parse request body to JSON
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( bodyParser.json() );

// 5. Express router for polls
app.use( '/polls', pollsRouter );

// 6. Run the server
server.listen( port, () => {
	console.log( 'Servidor activo en puerto: %d', port );
} );