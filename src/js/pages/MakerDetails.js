import React from "react";

import Project from "../components/Project";
import Projects from "../components/Projects";
import MakerStore from "../stores/MakerStore";
import ProjectStore from "../stores/ProjectStore";

export default class Details extends React.Component {
  constructor() {
  	super();
  	// const makers = [
   //    {name: 'DUANE', 
	  //     blurb: 'Duane does a lot of things like makings stuff and coding.', 
	  //     ID: '123', 
	  //     text: 'This is a much longer description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
	  //     projects: [
	  //     	'one', 'two']
	  // },
   //    {name: 'Leonardo', 
	  //     blurb: 'Leo invented the helicopter.', 
	  //     ID: '1234',
	  //     text: 'This is a much longer description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		 //  projects: [
	  //     	{name: 'automatic taco thrower', ID: '123'},
	  //     	{name: 'robot monkey trainer', ID: '1234'}]
	  //  }
   //  ];
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
      		<h1>{maker.name}</h1>
      		<img src="/images/samer.jpg" alt="img not found" width="180" />
      		<h4> {maker.blurb}</h4>
      		<h5> {maker.email}</h5>
      		<p> {maker.text}</p>
          <h1> {maker.ID} </h1>
      		<Projects projects={projects} makerID={maker.ID}/>
      	</div>
    );
  }
}
