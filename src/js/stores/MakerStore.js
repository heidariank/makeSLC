import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class MakerStore extends EventEmitter{
	constructor(){
		super();
		var component = this;
		this.makers = [];

		//TODO: From what I understand, the proper practice is to make all calls to the server
		//from the Actions. I should move this to MakerActions.js if I want to stick to flux
		//framework proper practices. 
		//fetch('/Makers.json')
		fetch('/api/get_makers')
		    .then(function(response) {
		        return response.json();
		    }).then(function(json) {
		        component.makers = json;
		        component.emit("change");
		    });

		//fetch('api/makers1');
		//console.log("makers in constructor", this.makers);
	}

	createMaker(maker) {
		this.makers.push(maker);
		this.emit("change");
	}

	deleteMaker(ID) {
		var i = 0;
		var amtToRemove = 0;
		for (i = this.makers.length - 1; i >= 0; i--) {
			if(this.makers[i].ID == ID){
				amtToRemove = 1;
				break;
			}
		}
		this.makers.splice(i, amtToRemove);
		this.emit("change");
	}

	editMaker(maker) {
		for (var i = this.makers.length - 1; i >= 0; i--) {
			if(this.makers[i].ID == maker.ID){
				this.makers[i] = maker;
				break;
			}
		}
	}

	getAll() {
		return this.makers;
	}

	handleActions(action){
		switch(action.type){
			case "CREATE_MAKER": {
				this.createMaker(action.maker);
				break;
			}
			case "DELETE_MAKER": {
				this.deleteMaker(action.ID);
				break;
			}
			case "EDIT_MAKER": {
				this.editMaker(action.maker);
				break;
			}
		}
	}
}

const makerStore = new MakerStore;
dispatcher.register(makerStore.handleActions.bind(makerStore));
//uncomment this line to make makerStore global and thus have access to it through the console.
//Add a new maker by typing makerStore.createMaker("Name") into the console
// window.makerStore = makerStore; 
export default makerStore;