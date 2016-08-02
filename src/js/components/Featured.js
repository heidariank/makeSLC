import React from "react";
import { Link } from "react-router";
import ProjectStore from "../stores/ProjectStore";

export default class Featured extends React.Component{
	constructor(){
		super();
		const featuredID = ProjectStore.getFeatured();
		const projectList = ProjectStore.getAll();
		console.log("featuredID: ", featuredID);
		console.log("projectList: ", projectList);

		this.state = {
        featuredID: featuredID,
        projectList: projectList
    };
	}

	render(){
				//find featured project in project list
		var featured = {};
		for (var i = 0; i < this.state.projectList.length; i++) {
			if(this.state.projectList[i].ID == this.state.featuredID)
				featured = this.state.projectList[i];
		}
		console.log("featured: ", featured);
		var completePath = "/projectDetails/" + this.state.featuredID + "/";


		return (
        <div class="well" id="featured">
        	<h2><Link to={{ pathname: completePath }}>   Check out this month's featured project! </Link></h2>
          <h3><Link to={{ pathname: completePath }}> {featured.name} </Link></h3>
          <img src="/images/3D_printer.jpg" alt="img not found" width="400" />
	      <p>{featured.blurb}</p>
        </div>
		);
	}
}