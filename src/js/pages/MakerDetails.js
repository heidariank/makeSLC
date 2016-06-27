import React from "react";

import Project from "../components/Project";
import Projects from "../components/Projects";
import MakerStore from "../stores/MakerStore";
import ProjectStore from "../stores/ProjectStore";

export default class Details extends React.Component {
  constructor() {
	 super();
   const makers = MakerStore.getAll();
    this.state = {
    	makers: makers
    };
  }

  render() {
    const { params } = this.props;

    var maker = {};
    for(var i = 0; i < this.state.makers.length; i++){
    	if(this.state.makers[i].ID == params.title){
    		maker = this.state.makers[i];
    		break;
    	}
    }
    var projects = ProjectStore.getProjects(maker.ID);
    projects = maker.projects.map((title, i) => <Project key={i} title={title}/> );

    return (
    	<div>
        <div id="makerDetails">
      		<h1>{maker.name}</h1>
      		<img src={maker.image} alt="img not found" width="180" />
      		<h4> {maker.blurb}</h4>
      		<h5> {maker.email}</h5>
      		<p> {maker.text}</p>
        </div>  
      		<Projects projects={projects} makerID={maker.ID}/>
      	</div>
    );
  }
}
