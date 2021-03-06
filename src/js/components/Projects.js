import React from "react";

import Project from "./Project";
import * as ProjectActions from "../actions/ProjectActions";
import ProjectStore from "../stores/ProjectStore"

export default class Projects extends React.Component {
	constructor(props){
		super(props);
		const {makerID} = this.props;
		console.log(makerID);
		
    this.getProjects = this.getProjects.bind(this);
    const p = ProjectStore.getProjects(makerID);
    var variableProjectList = p;

  	this.state = {        
  		p: p,
      variableProjectList: variableProjectList,
      makerID: makerID,
  	};
	}

	componentWillMount() {
    ProjectStore.on("change", this.getProjects);
  }

  componentWillUnmount() {
    ProjectStore.removeListener("change", this.getProjects);
  }

	handleChange(e){
		const project = e.target.value;

	    var newProjects = [];

	    for(var i = 0; i < this.state.p.length; i++){
      if(this.state.p[i].name.toUpperCase().includes(project.toUpperCase())){
        newProjects.push(this.state.p[i]);
      }
    }
	    this.state.variableProjectList = newProjects;
	    this.setState(this.state.variableProjectList);
	}

  getProjects() {
    this.setState({
      p: ProjectStore.getProjects(this.state.makerID),
      variableProjectList: ProjectStore.getProjects(this.state.makerID)
    });
  }

  createProject() {
    var proj = {
      name: "Bob",
      makerID: "123",
      blurb: "This is just a test. Don't get excited",
      imageList: [
        {"picture": "/images/Frink.jpg", "caption": "The next step was to believe in myself and not have no in my heart. Life is a garden. Dig it."}
      ]
    };
    ProjectActions.createProject(proj);
  }

	render() {

		const projects = this.state.variableProjectList.map((proj) => <Project key={proj.ID} {...proj}/> );

		return (
		  <div class="well" id="projects">
          <h2> Projects: </h2>
          <input type="text" placeholder="Search for a Project" onChange={this.handleChange.bind(this)} />
          <hr/>
          <div >{projects}</div>
          <button onClick={this.createProject.bind(this)}> Create </button>
        </div>
		);
	}
}