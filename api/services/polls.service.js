const sqlService = require( './sql.service' );

const pollsService = {
	getAll: function() {
		const pollModel = sqlService.getModelFor( 'Poll' );
		return pollModel.findAll();
	}
};

module.exports = pollsService;