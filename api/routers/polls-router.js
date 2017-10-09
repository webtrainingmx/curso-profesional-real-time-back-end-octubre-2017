const pollsRouter = require( 'express' ).Router();
const polls = require( './../data/polls' );
const _ = require( 'lodash' );

// GET all polls
pollsRouter.get( '/', ( request, response ) => {
	response.json( polls );
} );


// CREATE a new poll
pollsRouter.post( '/', ( request, response ) => {
	const poll = request.body;
	console.log( "Body", poll );
	polls.push( poll );

	response.json( poll );
} );

pollsRouter.param( 'id', function( request, response, next, id ) {
	console.log( "ID in params: ", id );
	const poll = _.find( polls, { id: parseInt( id, 10 ) } );
	// console.log( "Poll found:", poll );
	if ( poll ) {
		request.poll = poll;
		next();
	} else {
		response.json( { "error": "ID not found" } );
	}
} );


pollsRouter.get( '/:id', function( req, res ) {
	const poll = req.poll;
	res.json( poll || {} );
} );

pollsRouter.put( '/:id', ( request, response ) => {
	const pollToUpdate = request.body;

	if ( pollToUpdate.id ) {
		delete pollToUpdate.id;
	}

	const pollIndex = _.findIndex( polls, { id: + request.params.id } );

	if ( ! polls[ pollIndex ] ) {
		response.json( {
			error: "Error when looking for ID " + request.params.id
		} );
	} else {
		const updatedPoll = _.assign( polls[ pollIndex ], pollToUpdate );
		response.json( updatedPoll );
	}
} );

pollsRouter.delete( '/:id', ( request, response ) => {
	const pollIndex = _.findIndex( polls, { id: +request.params.id } );

	if ( ! polls[ pollIndex ] ) {
		response.json( {
			error: "Error when looking for ID " + request.params.id
		} );
	} else {
		const deletedPoll = polls[ pollIndex ];

		polls.splice( pollIndex, 1 );

		response.json( deletedPoll );
	}
} );

// Error handler, when no route was defined when throw an error!
pollsRouter.use( ( error, request, response, next ) => {
	if ( error ) {
		response.status( 500 ).send( error );
	}
} );

module.exports = pollsRouter;