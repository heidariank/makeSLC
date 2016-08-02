import React from "react";
import { Link } from "react-router";

export default class Project extends React.Component{
	render() {
		const { name } = this.props;
		const {ID}    = this.props;
		const { imageList }    = this.props;
		const {blurb} = this.props;
		var picturePath = imageList[0].picture;
  		var completePath = "/projectDetails/" + ID + "/";

		return (
	      <div class="col-md-12">
	        <h4><Link to={{ pathname: completePath }}>   {name} </Link></h4>
	        <img src={picturePath} alt="img not found" width="100" />
	        <p>{blurb}</p>
	        <hr/>
	      </div>
		);
	}
}