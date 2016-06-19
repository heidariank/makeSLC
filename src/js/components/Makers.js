import React from "react";

import Maker from "./Maker";

export default class Makers extends React.Component {
	handleChange(e){
		const maker = e.target.value;
		this.props.changeMakers(maker);
	}

	render() {
		return (
		  <div class="well" id="makers">
          <h2> Makers: </h2>
          <input type="text" placeholder="Search for a Maker" onChange={this.handleChange.bind(this)} />
          <hr/>
          <div >{this.props.makers}</div>
    	</div>
		);
	}
}