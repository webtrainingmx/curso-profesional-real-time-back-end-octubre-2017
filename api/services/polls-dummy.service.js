const pollsRouter = require( 'express' ).Router();
const polls = require( './../data/polls' );
const _ = require( 'lodash' );

const pollsDummyService = {
	_instance: null,
	init: () => {
		this._instance = {
			polls: polls
		};
	},
	getInstance: () => {
		if ( ! this._instance ) this.init();
		return this._instance;
	},
	save: ( poll ) => {
		this._instance.polls.push( poll );
	},
	getById: ( id ) => {
		const poll = _.find( polls, { id: parseInt( id, 10 ) } );
		return poll ? poll : false;
	},
	update: ( poll ) => {
		const pollIndex = _.findIndex( polls, { id: poll.id } );

		if ( ! this._instance.polls[ pollIndex ] ) {
			return false;
		} else {
			return _.assign( this._instance.polls[ pollIndex ], poll );
		}
	},
	delete: ( poll ) => {
		const pollIndex = _.findIndex( this._instance.polls, { id: poll.id } );
		if ( ! this._instance.polls[ pollIndex ] ) {
			return false;
		} else {
			const deletedPoll = this._instance.polls[ pollIndex ];
			this._instance.polls.splice( pollIndex, 1 );
			return deletedPoll;
		}
	}
};

module.exports = pollsDummyService;