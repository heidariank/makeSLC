import React from "react";
import { Link } from "react-router";

export default class Maker extends React.Component {
  render() {
    const { title } = this.props;
    const {text} = this.props;
    return (
      <div class="col-md-12" id="maker">
        <h4>{title}</h4>
        <img src="/images/samer.jpg" alt="img not found" width="80" />
        <p>{text}</p>
        <Link to="details" props={{title: title}}>Details</Link>
        <hr/>
      </div>
    );
  }
}
