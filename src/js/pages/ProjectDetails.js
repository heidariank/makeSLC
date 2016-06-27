import React from "react";
import ProjectStore from "../stores/ProjectStore";

export default class ProjectDetails extends React.Component {
	constructor() {
  	super();
   	const projects = ProjectStore.getAll();
    this.state = {
    	projects: projects
    };
  }

  render() {
  	const { params } = this.props;

  	var Image = React.createClass({
  		render() {
  			const { picture } = this.props;
  			const { caption } = this.props;
  			return(
  				<div>
  					<img src={picture} width="280"/>
  					<h4> {caption} </h4>
  					<hr/>
  				</div>
  			);
  		}
  	});

    var project = {};
    for(var i = 0; i < this.state.projects.length; i++){
    	if(this.state.projects[i].ID == params.title){
    		project = this.state.projects[i];
    		break;
    	}
    }

    const images = project.imageList.map((image, i) => <Image key={i} {...image}/> );

    return (
    	<div>
      <h1> {project.name} </h1>
      <div> {images} </div>
      </div>
    );
  }
}
