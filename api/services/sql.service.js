const Sequelize = require( 'sequelize' );

const DATABASE_NAME = 'traffic_signals';
const DATABASE_USERNAME = 'sequelize_user';
const DATABASE_PASSWORD = 'sql_123';
const DATABASE_HOST = 'localhost';
const DATABASE_DIALECT = 'mysql';

const MODELS = {
	Poll: {
		id: Sequelize.INTEGER,
		user_id: Sequelize.INTEGER
	},
	Question: {
		id: Sequelize.INTEGER,
		poll_id: Sequelize.INTEGER,
		label: Sequelize.STRING
	},
	Answer: {
		id: Sequelize.INTEGER,
		label: Sequelize.STRING,
		question_id: Sequelize.INTEGER,
		poll_id: Sequelize.INTEGER

	},
	Vote: {
		id: Sequelize.INTEGER,
		user_id: {
			type: Sequelize.INTEGER,
			allowNull: true
		},
		answer_id: Sequelize.INTEGER,
		question_id: Sequelize.INTEGER,
		poll_id: Sequelize.INTEGER
	}
};

const sqlService = {
	_instance: null,
	init: function() {
		this._instance = new Sequelize( DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, {
			host: DATABASE_HOST,
			dialect: DATABASE_DIALECT,
			pool: {
				max: 5,
				min: 0,
				idle: 10000
			}
		} );
	},
	getInstance: function() {
		if ( ! this._instance ) this.init();
		return this._instance;
	},
	getModelFor: function( modelName ) {
		const seqInstance = sqlService.getInstance();

		return seqInstance.isDefined( modelName )
			? seqInstance.model( modelName )
			: seqInstance.define( modelName, MODELS[ modelName ], { timestamps: false } );
	},
	testConnection: function() {
		return this.getInstance().authenticate().then( () => {
			console.log( true );
		} ).catch( e => {
			console.error( e );
		} )
	}
};

module.exports = sqlService;