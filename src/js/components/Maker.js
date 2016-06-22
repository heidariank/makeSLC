import React from "react";
import { Link } from "react-router";

export default class Maker extends React.Component {
  render() {
    const {title} = this.props;
    const {blurb} = this.props;
    const {ID}    = this.props;
    var completePath = "/details/" + ID + "/";
    return (
      <div class="col-md-12" id="maker">
        <h4>{title}</h4>
        <img src="/images/samer.jpg" alt="img not found" width="80" />
        <p>{blurb}</p>
        <Link to={{ pathname: completePath }}>   Details </Link>
        <hr/>
      </div>
    );
  }
}
