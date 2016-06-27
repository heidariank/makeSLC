import React from "react";
import { Link } from "react-router";

export default class Maker extends React.Component {
  render() {
    const {name} = this.props;
    const {blurb} = this.props;
    const {ID}    = this.props;
    const {image} = this.props;

    var completePath = "/makerDetails/" + ID + "/";
    return (
      <div class="col-md-12" id="maker">
        <h4>{name}</h4>
        <img src={image} alt="img not found" width="80" />
        <p>{blurb}</p>
        <Link to={{ pathname: completePath }}>   Details </Link>
        <hr/>
      </div>
    );
  }
}
