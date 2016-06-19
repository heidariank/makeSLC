import React from "react";

import Maker from "./Project";

export default class Projects extends React.Component {
	handleChange(e){
		const project = e.target.value;
		this.props.changeProjects(project);
	}
	render() {
		return (
		  <div class="well" id="projects">
          <h2> Projects: </h2>
          <input type="text" placeholder="Search for a Project" onChange={this.handleChange.bind(this)} />
          <hr/>
          <div >{this.props.projects}</div>
        </div>
		);
	}
}