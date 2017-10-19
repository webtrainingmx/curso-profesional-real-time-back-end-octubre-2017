const sqlService = require( './sql.service' );

const pollsService = {
	getAll: function() {

		const Poll = sqlService.getModelByName( 'poll' );
		const Question = sqlService.getModelByName( 'question' );
		const Answer = sqlService.getModelByName( 'answer' );
		const Vote = sqlService.getModelByName( 'vote' );

		return Poll.findAll( {
			include: [ {
				model: Question,
				as: 'question',
			}, {
				model: Answer,
				as: 'answers',
			}, {
				model: Vote,
				as: 'votes',
			} ],
		} );//.on('sql', console.log);
	},

	getById( id ) {
		const Poll = sqlService.getModelByName( 'poll' );
		const Question = sqlService.getModelByName( 'question' );
		const Answer = sqlService.getModelByName( 'answer' );
		const Vote = sqlService.getModelByName( 'vote' );

		return Poll.findOne( {
			where: {
				id: id
			},
			include: [ {
				model: Question,
				as: 'question',
			}, {
				model: Answer,
				as: 'answers',
			}, {
				model: Vote,
				as: 'votes',
			} ]
		} );
	},

	testConnection: function() {
		sqlService.testConnection();
	}
};

module.exports = pollsService;