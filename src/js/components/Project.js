import React from "react";
import { Link } from "react-router";

export default class Project extends React.Component{
	render() {
		const { title } = this.props;

		return (
	      <div class="col-md-12" id="maker">
	        <h4>{title}</h4>
	        <img src="/images/3D_printer.jpg" alt="img not found" width="100" />
	        <p>This project is super neat and great and good!</p>
	        <Link to="details" params={{title: title}}>Details</Link>
	        <hr/>
	      </div>
		);
	}
}