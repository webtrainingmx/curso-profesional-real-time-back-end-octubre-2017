const pollsRouter = require( 'express' ).Router();
const pollsService = require( './../services/polls-dummy.service' );
const pollsMySQLService = require( './../services/polls-sql.service' );

// GET all polls
pollsRouter.get( '/', ( request, response ) => {
	pollsMySQLService.getAll().then( ( polls ) => {
		response.json( polls );
	}, ( error ) => {
		response.json( error );
	} );
} );


// CREATE a new poll
pollsRouter.post( '/', ( request, response ) => {
	const poll = request.body;
	console.log( "Body", poll );
	const createdPoll = pollsService.save( poll );

	if ( ! createdPoll ) response.json( { "error": "Poll was not created!" } );

	response.status( 201 ).json( createdPoll );
} );

pollsRouter.param( 'id', function( request, response, next, id = null ) {
	console.log( "ID in params: ", id );
	const idToFind = parseInt( id, 10 );
	pollsMySQLService.getById( idToFind ).then( ( poll ) => {
		request.poll = poll;
		next();
	}, () => {
		response.json( { "error": "ID not found" } );
	} );
} );


pollsRouter.get( '/:id', function( req, res ) {
	const poll = req.poll;
	res.json( poll || { "error": "Poll not found" } );
} );

pollsRouter.put( '/:id', ( request, response ) => {
	const pollToUpdate = request.body;
	const updatedPoll = pollsService.update( pollToUpdate );

	if ( ! updatedPoll ) {
		response.json( {
			error: "Error when looking for ID " + request.params.id
		} );
	} else {
		response.json( updatedPoll );
	}
} );

pollsRouter.delete( '/:id', ( request, response ) => {
	const pollToDelete = request.body;
	const deletedPoll = pollsService.delete( pollToDelete );

	if ( ! deletedPoll ) {
		response.json( {
			error: "Error when looking for ID " + request.params.id
		} );
	} else {
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