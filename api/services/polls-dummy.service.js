const preloadedPolls = require( './../data/polls' );
const _ = require( 'lodash' );

let instance = null;

class PollsDummyService {
	constructor() {
		if ( ! instance ) this.init();
		return instance;
	}

	init() {
		instance = this;
		this.polls = preloadedPolls;
	}

	save( poll ) {
		this.polls.push( poll );
		return poll;
	}

	getAll() {
		return this.polls;
	}

	getById( id ) {
		const poll = _.find( this.polls, { id: parseInt( id, 10 ) } );
		return poll ? poll : false;
	}

	update( poll ) {
		const pollIndex = _.findIndex( this.polls, { id: poll.id } );

		if ( ! this.polls[ pollIndex ] ) {
			return false;
		} else {
			return _.assign( this.polls[ pollIndex ], poll );
		}
	}

	delete( poll ) {
		const pollIndex = _.findIndex( this.polls, { id: poll.id } );
		if ( ! this.polls[ pollIndex ] ) {
			return false;
		} else {
			const deletedPoll = this.polls[ pollIndex ];
			this.polls.splice( pollIndex, 1 );
			return deletedPoll;
		}
	}
}

// let x = new PollsDummyService();
// let y = new PollsDummyService();
//
// x.save({a: 1});
// y.save({b: 2});
//
// console.log(x.getAll());
// console.log(y.getAll());

module.exports = new PollsDummyService();