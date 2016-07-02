import React from "react";

import * as MakerActions from "../actions/MakerActions";
import MakerStore from "../stores/MakerStore";

export default class AddMaker extends React.Component{
	constructor(props) {
		super(props);
		this.getMakers = this.getMakers.bind(this);
		const makers = MakerStore.getAll();
		console.log("makers: ", makers);
    var maker = {
			name : "",
			text : "",
			email : "",
			image : "",
			ID : ""
    };

    const { params } = this.props;

    for(var i = 0; i < makers.length; i++){
    	if(makers[i].ID == params.title){
    		maker = makers[i];
    		break;
    	}
    }

		this.state = {
			makers: makers,
			maker : maker
		};
	}

  componentWillMount() {
    MakerStore.on("change", this.getMakers);
  }

  componentWillUnmount() {
    MakerStore.removeListener("change", this.getMakers);
  }

  componentDidMount() {
  	this.getMakers();
  	console.log(this.state.makers);
  }

  getMakers() {
    this.setState({
      makers: MakerStore.getAll()
    });
  }
  /*
   * Event handlers have a lot of repeated code :(
   * I had to copy existing data on every change because the change is not merged
   * with the existing object; it overwrites it entirely. I think this is because
   * it is a nested object.
   */
	handleNameChange(e){
		this.setState({
			maker: {name : e.target.value,
			text: this.state.maker.text,
			email: this.state.maker.email,
			image: this.state.maker.image,
			ID: this.state.maker.ID
		}});
	}

	handleTextChange(e){
		this.setState({
			maker: {name : this.state.maker.name,
			text: e.target.value,
			email: this.state.maker.email,
			image: this.state.maker.image,
			ID: this.state.maker.ID
		}});
	}

	handleEmailChange(e){
		this.setState({
			maker: {name : this.state.maker.name,
			text: this.state.maker.text,
			email: e.target.value,
			image: this.state.maker.image,
			ID: this.state.maker.ID
		}});
	}

	handleImageChange(e){
		this.setState({
			maker: {name : this.state.maker.name,
			text: this.state.maker.text,
			email: this.state.maker.email,
			image: e.target.value,
			ID: this.state.maker.ID
		}});
	}

	handleSubmit(e){
		if(this.state.maker.ID === 'undefined')
			MakerActions.createMaker(this.state.maker);
		else
			MakerActions.editMaker(this.state.maker);
	}


	render() {
		/*
		 *I've put this code in render instead of the constructor so the component will render when getMakers actually 
		 *returns data, otherwise the component will render with an empty makers. (async call returns after the constructor
		 *returns). 
		 *I use the following code snippet in a few places. It searches through a list till it finds the item. I would like
		 *to make the list behave like a hashset so I could change the find operation to O(1) instead of O(n)
		 */
		

		return(
			<div>
			  <h1>Add a new Maker here!</h1>
			  <form className="commentForm" onSubmit={this.handleSubmit.bind(this)}>
			  	<input type="text" placeholder="Maker's name" value={this.state.maker.name} onChange={this.handleNameChange.bind(this)}/>
			  	<br/> <hr/>
			  	<input type="text" placeholder="Description" value={this.state.maker.text} onChange={this.handleTextChange.bind(this)}/>
			  	<br/> <hr/>
			  	<input type="text" placeholder="email" value={this.state.maker.email} onChange={this.handleEmailChange.bind(this)}/>
			  	<br/> <hr/>
			  	<input type="text" placeholder="Image Path" value={this.state.maker.image} onChange={this.handleImageChange.bind(this)}/>
			  	<br/> <hr/>
			  	<input type="submit" value="Create"/>
		  	</form>	
			</div>
		);
	}
}