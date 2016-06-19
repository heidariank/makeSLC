import React from "react";

import Featured from "../components/Featured"
import Maker from "../components/Maker";
import Makers from "../components/Makers";
import Project from "../components/Project";
import Projects from "../components/Projects";

export default class Home extends React.Component {
  constructor() {
    super();
    // const m = ['Duane Johnson', 'Leonardo Da Vinci', 'samerbuna'];
    const m = [
      {name: 'DUANE', text: 'Duane does a lot of things like makings stuff and coding.'},
      {name: 'Leonardo', text: 'Leo invented the helicopter.'}
    ];
    var variableMakerList = m;
    const p = ['Arduino project', 'ESP server', 'Oak table', 'Hover board'];
    var variableProjectList = p;
    this.state = {
        m: m,
        variableMakerList: variableMakerList,
        p: p,
        variableProjectList: variableProjectList,
    };
  }

  changeMakers(maker){
    var newMakers = [];
    for(var i = 0; i < this.state.m.length; i++){
      console.log('one');
      if(this.state.m[i].name.toUpperCase().includes(maker.toUpperCase())){
        newMakers.push(this.state.m[i]);
      }
    }
    this.state.variableMakerList = newMakers;
    this.setState(this.state.variableMakerList);
  }

  changeProjects(project){
    var newProjects = [];
    for (name in this.state.p){
      if(this.state.p[name].includes(project)){
        newProjects.push(this.state.p[name]);
      }
    }
    this.state.variableProjectList = newProjects;
    this.setState(this.state.variableProjectList);
  }

  render() {
    const makers = this.state.variableMakerList.map((person, i) => <Maker key={i} title={person.name} text={person.text}/> );
    const projects = this.state.variableProjectList.map((title, i) => <Project key={i} title={title}/> );

    return (
      <div>
          <Featured />
          <Makers changeMakers={this.changeMakers.bind(this)} makers={makers} />
          <Projects changeProjects={this.changeProjects.bind(this)} projects={projects} />
      </div>
    );
  }
}
