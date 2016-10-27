import React from "react";

import * as MakerActions from "../actions/MakerActions";
import MakerStore from "../stores/MakerStore";
import ImageUpload from "./ImageUpload"

export default class AddMaker extends React.Component{
  componentWillMount() {
  	this.getMaker = this.getMaker.bind(this);
	this.getMaker();
    MakerStore.on("change", this.getMaker);
  }

  componentWillUnmount() {
    MakerStore.removeListener("change", this.getMaker);
  }

  componentDidMount() {
  	this.getMaker();
  	/*console.log(this.state.makers);*/
  }

  getMaker() {
  	var maker = {};
  	const makers = MakerStore.getAll()
  	const { params } = this.props;

    for(var i = 0; i < makers.length; i++){
    	if(makers[i].ID == params.title){
    		maker = makers[i];
    		break;
    	}
    }
    if(maker){
	    this.setState({
	    	name: maker.name,
	      	ID: maker.ID,
	      	blurb: maker.blurb,
	      	email: maker.email,
	      	image: maker.image
	    });
	}
  }

	handleNameChange(e){
		this.setState({
			name: e.target.value
		});
	}

	handleBlurbChange(e){
		this.setState({
			blurb: e.target.value
		});
	}

	handleEmailChange(e){
		this.setState({
			email: e.target.value
		});
	}

	handleImageChange(e){
		this.setState({
			image: e.target.value
		});
	}

	handleImageFileChange(e) {
	    e.preventDefault();

	    let reader = new FileReader();
	    let file = e.target.files[0];

	    reader.onloadend = () => {
	      this.setState({
	        file: file,
	      });
	    }

	    /*reader.readAsDataURL(file)*/
	    reader.readAsText(file);
  }

	handleImageSubmit(e){
		e.preventDefault();
		console.log(this.state.file);
	}

	handleSubmit(e){
		var maker = {
			name: this.state.name,
			ID: this.state.ID,
			email: this.state.email,
			blurb: this.state.blurb,
			image: this.state.image,
			file: this.state.file
		};
		if(!this.state.ID)
			MakerActions.createMaker(maker);
		else
			MakerActions.editMaker(maker);
	}


	render() {
		var buttonText = (!this.state.ID) ? "Create" : "Save";
		return(
			<div>
			  <h1>Add a new Maker here!</h1>
			  <form className="commentForm" onSubmit={this.handleSubmit.bind(this)}>
			  	<input type="text" name="name" placeholder="Maker's name" value={this.state.name} onChange={this.handleNameChange.bind(this)} required/>
			  	<br/> <hr/>
			  	<input type="text" placeholder="Description" value={this.state.blurb} onChange={this.handleBlurbChange.bind(this)} required/>
			  	<br/> <hr/>
			  	<input type="text" placeholder="email" value={this.state.email} onChange={this.handleEmailChange.bind(this)} required/>
			  	<br/> <hr/>
			  	<input type="text" placeholder="Image Path" value={this.state.image} onChange={this.handleImageChange.bind(this)}/>
			  	<br/> <hr/>
		  		<input className="fileInput" type="file" onChange={this.handleImageFileChange.bind(this)} accept="image"/>
			  	<input type="submit" value={buttonText}/>
		  	</form>	
		  	<br/>
        	<br/>
		  	<form onSubmit={this.handleImageSubmit.bind(this)}>
      			<button type="submit">Upload Image</button>
        	</form>
			</div>
		);
	}
          		/*<input type="file" encType="multipart/form-data" accept="image/*" />*/
        	/*<ImageUpload />*/
}