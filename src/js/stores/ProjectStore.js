import { EventEmitter } from "events";
import dispatcher from "../dispatcher"; //CUI

class ProjectStore extends EventEmitter{
	constructor(){
		super();
		this.featuredID = 123;

		//CUI
		var component = this;
		this.projects = [];

		fetch('/Projects.json')
		    .then(function(response) {
		        return response.json();
		    }).then(function(json) {
		    		//console.log("These are the projects you're looking for: ", json);
		        component.projects = json;
		        component.emit("change");
		    });

		//End of CUI
	}

	createProject(project) {
		//CUI
/*		const ID = Date.now();

		this.projects.push({
			name,
			ID,
			makerID: '123',
			imageList: []
		});*/

		this.projects.push(project)
		this.emit("change");
	}

	getFeatured() {
		return this.featuredID;
	}

	getAll() {
		return this.projects;
	}

	getProjects(makerID) {

		var makersProjects = [];
		if(typeof makerID === 'undefined'){
			return this.projects;
		}
		for (var i = this.projects.length - 1; i >= 0; i--) {
				if(this.projects[i].makerID == makerID){
					makersProjects.push(this.projects[i]);
				}
			}
		return makersProjects;
	}
	
	handleActions(action){
		switch(action.type){
			case "CREATE_PROJECT": {
				this.createProject(action.project);
				break;
			}
		}
	}
}


const projectStore = new ProjectStore;
dispatcher.register(projectStore.handleActions.bind(projectStore));//CUI
export default projectStore;