import React from "react";
import { Link } from "react-router";
import * as MakerActions from "../actions/MakerActions";

export default class Maker extends React.Component {
  deleteMaker(){
    MakerActions.deleteMaker(this.props.ID);
  }

  render() {
    const {name} = this.props;
    const {blurb} = this.props;
    const {ID}    = this.props;
    const {image} = this.props;

    var makerDetailsPath = "/makerDetails/" + ID + "/";
    var editMakerPath = "/addMaker/" + ID + "/";
    return (
      <div class="col-md-12" id="maker">
        <h4><Link to={{ pathname: makerDetailsPath }}>   {name} </Link> </h4>
        <img src={image} alt="img not found" width="80" />
        <p>{blurb}</p>
        <Link to={{ pathname: editMakerPath }}>   Edit </Link>
        <button onClick={this.deleteMaker.bind(this)}> Delete </button>
        <hr/>
      </div>
    );
  }
}
