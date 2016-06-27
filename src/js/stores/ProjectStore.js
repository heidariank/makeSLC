import { EventEmitter } from "events";

class ProjectStore extends EventEmitter{
	constructor(){
		super();
		// this.projects = ['Arduino project', 'ESP server', 'Oak table', 'Hover board'];

		this.projects = [
	      {	
	      	name: 'cool project', 
	      	ID: "123", 
	      	makerID: '123',
	      	imageList: [
	      		{picture: '/images/3D_printer.jpg', caption: 'text'},
	      		{picture: '/images/3D_printer.jpg', caption: 'even more text'}
	      	]
	  	  },
	      {
      		name: 'super cool project', 
	      	ID: "1234", 
	      	makerID: '1234',
	      	imageList: [
	      		{picture: '/images/3D_printer.jpg', caption: 'I began with a 3d printer and some other stuff. I meditated every morning and ate lots of vegetables.'},
	      		{picture: '/images/3D_printer.jpg', caption: 'The next step was to believe in myself and not have no in my heart. Life is a garden. Dig it.'}
	      	]
	      }
	    ];
	}

	createProject(name) {
		const ID = Date.now();

		this.projects.push({
			name,
			ID,
			makerID: '123',
			imageList: []
		});

		this.emit("change");
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
}

const projectStore = new ProjectStore;
export default projectStore;