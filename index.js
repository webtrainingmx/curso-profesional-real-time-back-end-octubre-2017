const express = require( 'express' );
const app = express();
const path = require( 'path' );
const server = require( 'http' ).createServer( app );

const morgan = require( 'morgan' );
const bodyParser = require( 'body-parser' );

const io = require( 'socket.io' )( server );
const port = process.env.PORT || 3300;

const pollsRouter = require( './api/routers/polls-router' );
const allowCrossDomain = require( './api/middlewares/cors.middleware' );

const pollsService = require( './api/services/polls-dummy.service' );

// 1. Morgan middleware for logging
app.use( morgan( 'dev' ) );

// 2. Express static index.html file
app.get( '/', ( req, res ) => {
	res.sendFile( path.join( __dirname, 'index.html' ) );
} );

// 3. Enable CORS on ExpressJS to avoid cross-origin errors when calling this server using AJAX
// We are authorizing all domains to be able to manage information via AJAX (this is just for development)

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

	socket.on( 'new-vote', ( answer ) => {

		console.log( "Answer has been received!", answer );

		// Save vote
		const vote = pollsService.transformAnswerToVote( answer );
		pollsService.saveVoteToPoll( vote );
		const poll = pollsService.getById( vote.poll_id );

		// Here we send the poll with new votes
		io.emit( 'vote-received', {
			poll: poll
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