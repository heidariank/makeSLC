import React from "react";
import { Link } from "react-router";

export default class Project extends React.Component{
	render() {
		const { name } = this.props;
		const {ID}    = this.props;
    	var completePath = "/projectDetails/" + ID + "/";

		return (
	      <div class="col-md-12" id="maker">
	        <h4>{name}</h4>
	        <img src="/images/3D_printer.jpg" alt="img not found" width="100" />
	        <p>This project is super neat and great and good!</p>
	        <Link to={{ pathname: completePath }}>   Details </Link>
	        <hr/>
	      </div>
		);
	}
}