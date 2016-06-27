import React from "react";

import Maker from "./Maker";
import MakerStore from "../stores/MakerStore"

export default class Makers extends React.Component {
  constructor() {
    super();
    this.getMakers = this.getMakers.bind(this);
    const m = MakerStore.getAll();
    var variableMakerList = m;
    
    this.state = {
        m: m,
        variableMakerList: variableMakerList,
    };
  }

  componentWillMount() {
    MakerStore.on("change", this.getMakers);
  }

  componentWillUnmount() {
    MakerStore.removeListener("change", this.getMakers);
  }

  handleChange(e){
  	const maker = e.target.value;

    var newMakers = [];
    for(var i = 0; i < this.state.m.length; i++){
      if(this.state.m[i].name.toUpperCase().includes(maker.toUpperCase())){
        newMakers.push(this.state.m[i]);
      }
    }
    this.state.variableMakerList = newMakers;
    this.setState(this.state.variableMakerList);
  }

  getMakers() {
    this.setState({
      m: MakerStore.getAll(),
    });
  }

	render() {
		const makers = this.state.variableMakerList.map((person) => <Maker key={person.ID} {...person}/> );

		return (
		  <div class="well" id="makers">
	      <h2> Makers: </h2>
	      <input type="text" placeholder="Search for a Maker" onChange={this.handleChange.bind(this)} />
	      <hr/>
	      <div >{makers}</div>
		</div>
		);
	}
}