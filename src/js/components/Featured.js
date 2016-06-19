import React from "react";
import { Link } from "react-router";

export default class Featured extends React.Component{
	render(){
		return (
        <div class="well" id="featured">
          <h2> Check out this month's featured project!</h2>
          <img src="/images/3D_printer.jpg" alt="img not found" width="400" />
	      <p>This project is super neat and great and good!</p>
        </div>
		);
	}
}