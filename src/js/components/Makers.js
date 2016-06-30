import React from "react";

import { Link } from "react-router";
import Maker from "./Maker";
import * as MakerActions from "../actions/MakerActions";
import MakerStore from "../stores/MakerStore";

export default class Makers extends React.Component {
  constructor() {
    super();
    this.getMakers = this.getMakers.bind(this);
    var makerList = MakerStore.getAll();
    
    this.state = {
        makerList: makerList,
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
    for(var i = 0; i < this.state.makerList.length; i++){
      if(this.state.makerList[i].name.toUpperCase().includes(maker.toUpperCase())){
        newMakers.push(this.state.makerList[i]);
      }
    }
    this.state.makerList = newMakers;
    this.setState(this.state.makerList);
  }

  getMakers() {
    this.setState({
      makerList: MakerStore.getAll(),
    });
  }

  createMaker() {
    MakerActions.createMaker(Date.now().toString());
  }

	render() {
		const makers = this.state.makerList.map((person) => <Maker key={person.ID} {...person}/> );

		return (
		  <div class="well" id="makers">
	      <h2> Makers: </h2>
	      <input type="text" placeholder="Search for a Maker" onChange={this.handleChange.bind(this)} />
	      <hr/>
	      <div >{makers}</div>
        <button onClick={this.createMaker.bind(this)}> Create </button>
        <Link to="/addMaker"> Add a new Maker! </Link>
		</div>
		);
	}
}