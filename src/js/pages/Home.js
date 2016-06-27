import React from "react";

import Featured from "../components/Featured"
import Makers from "../components/Makers";
import Projects from "../components/Projects";

export default class Home extends React.Component {
  render() {
    return (
      <div>
          <Featured />
          <Makers  />
          <Projects />
      </div>
    );
  }
}
