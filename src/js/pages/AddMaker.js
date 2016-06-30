import React from "react";

import * as MakerActions from "../actions/MakerActions";
import MakerStore from "../stores/MakerStore";

export default class AddMaker extends React.Component{
	constructor() {
		super();
		// this.getMakers = this.getMakers.bind(this);
		var name = "";
		var text = "";
		var email = "";
		var image = "";
		// const m = MakerStore.getAll();
		// console.log("maker list:", m);
		this.state = {
			name : name,
			text : text,
			email : email,
			image : image
			// m: m
		};
	}

	handleNameChange(e){
		this.setState({name : e.target.value});
		
	}

	handleTextChange(e){
		this.setState({text : e.target.value});
	}

	handleEmailChange(e){
		this.setState({email : e.target.value});
	}

	handleImageChange(e){
		this.setState({image : e.target.value});
	}

	handleSubmit(e){
		console.log("state: ", this.state);
		MakerActions.createMaker(this.state);
	}

  // getMakers() {
  //   this.setState({
  //     m: MakerStore.getAll(),
  //   });
  // }

	render() {
		return(
			<div>
			  <h1>Add a new Maker here!</h1>
			  <form className="commentForm" onSubmit={this.handleSubmit.bind(this)}>
			  	<input type="text" placeholder="Maker's name" value={this.state.name} onChange={this.handleNameChange.bind(this)}/>
			  	<br/> <hr/>
			  	<input type="text" placeholder="Description" value={this.state.text} onChange={this.handleTextChange.bind(this)}/>
			  	<br/> <hr/>
			  	<input type="text" placeholder="email" value={this.state.email} onChange={this.handleEmailChange.bind(this)}/>
			  	<br/> <hr/>
			  	<input type="text" placeholder="Image Path" value={this.state.image} onChange={this.handleImageChange.bind(this)}/>
			  	<br/> <hr/>
			  	<input type="submit" value="Create"/>
		  	</form>	
			</div>
		);
	}
}