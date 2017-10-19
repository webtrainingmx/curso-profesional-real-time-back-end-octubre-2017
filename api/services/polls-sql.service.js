const sqlService = require( './sql.service' );

const pollsService = {
	getAll: function() {

		const Poll = sqlService.getModelByName( 'poll' );

		const Question = sqlService.getModelByName( 'question' );

		return Poll.findAll( {
			include: [ {
				model: Question,
				as: 'question',
			} ],
		} );//.on('sql', console.log);
	},

	testConnection: function() {
		sqlService.testConnection();
	}
};

module.exports = pollsService;