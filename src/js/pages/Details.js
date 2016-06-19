import React from "react";

export default class Details extends React.Component {
  render() {
    const { title } = this.props;
    console.log(title);
    return (
      <h1>Details for {title}</h1>
    );
  }
}
