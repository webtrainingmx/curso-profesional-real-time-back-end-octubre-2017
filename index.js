const express = require( 'express' );
const app = express();
const path = require( 'path' );
const server = require( 'http' ).createServer( app );
const io = require( 'socket.io' )( server );
const port = process.env.PORT || 3300;


app.get( '/', ( req, res ) => {
	res.sendFile( path.join( __dirname, 'index.html' ) );
} );

server.listen( port, () => {
	console.log( 'Servidor activo en puerto: %d', port );
} );




