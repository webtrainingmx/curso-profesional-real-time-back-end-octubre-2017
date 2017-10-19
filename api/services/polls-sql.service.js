const sqlService = require( './sql.service' );

const pollsService = {
	getAll: function() {

		const Poll = sqlService.getModelByName( 'poll' );
		return Poll.findAll();
	},

	testConnection: function() {
		sqlService.testConnection();
	}
};

module.exports = pollsService;