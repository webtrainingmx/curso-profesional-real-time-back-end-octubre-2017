const Sequelize = require( 'sequelize' );

const DATABASE_NAME = 'pangular_db';
const DATABASE_USERNAME = 'pangular_user';
const DATABASE_PASSWORD = 'vFfRUfCZmABDLfuC';
const DATABASE_HOST = 'localhost';
const DATABASE_DIALECT = 'mysql';

const MODELS = {
		'poll': {
			id: {
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			user_id: {
				type: Sequelize.INTEGER
			},
		},
		'question': {
			id: {
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			poll_id: Sequelize.INTEGER,
			label: Sequelize.STRING
		},
		'answer': {
			id: {
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			label: Sequelize.STRING,
			question_id: Sequelize.INTEGER,
			poll_id: Sequelize.INTEGER
		},
		'vote': {
			id: {
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			user_id: {
				type: Sequelize.INTEGER,
				allowNull: true
			},
			answer_id: Sequelize.INTEGER,
			question_id: Sequelize.INTEGER,
			poll_id: Sequelize.INTEGER
		}
	}
;


//
// sequelize.authenticate().then( () => {
// 	console.log( 'Connection succesful' );
// } ).catch( e => {
// 	console.error( e );
// } );

class SequelizeService {
	constructor() {
		this.sequelize = new Sequelize( DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, {
			host: DATABASE_HOST,
			dialect: DATABASE_DIALECT,
			pool: {
				max: 5,
				min: 0,
				idle: 10000
			}
		} );
		this.init();
	}

	init() {
		this.defineModels();
		this.defineAssociations();
	}

	defineModels() {
		for ( const model in MODELS ) {
			this.sequelize.define( model, MODELS[ model ], { timestamps: false, underscored: true } );
		}
	}


	defineAssociations() {
		const Question = this.getModelByName( 'question' );
		const Poll = this.getModelByName( 'poll' );

		// Question.belongsTo( Poll );
		Poll.hasOne( Question );
	}

	getModelByName( modelName ) {
		if ( this.sequelize.isDefined( modelName ) ) {
			return this.sequelize.models[ modelName ];
		}
	}
}

module.exports = new SequelizeService();