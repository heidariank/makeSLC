import { EventEmitter } from "events";

class MakerStore extends EventEmitter{
	constructor(){
		super();
		this.makers = [
	      {	
	      	name: 'DUANE Johnson', 
	      	ID: "123", 
	      	blurb: 'Duane does a lot of things like makings stuff and coding.',
	      	text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
	      	projects: [123],
	      	email: 'theRock@awesome.com',
	      	image: 'no image yet'
	  	  },
	      {
	      	name: 'Leonardo da Vinci', 
	      	ID: "1234", 
	      	blurb: 'Leo invented the helicopter.',
	      	text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
	      	projects: [1234],
	      	email: 'theRock@awesome.com',
	      	image: 'no image yet'
	      }
	    ];
	}

	createMaker(name) {
		const ID = Date.now();

		this.makers.push({
			name,
			ID,
			blurb: 'dk',
			text: 'klasjdflkja',
			projects: [],
			email: 'lkajjfncn nal',
			image: 'no image'
		});

		this.emit("change");
	}

	getAll() {
		return this.makers;
	}
}

const makerStore = new MakerStore;
//uncomment this line to make makerStore global and thus have access to it through the console.
//Add a new maker by typing makerStore.createMaker("Name") into the console
// window.makerStore = makerStore; 
export default makerStore;