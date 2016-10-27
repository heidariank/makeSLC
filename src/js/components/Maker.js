import React from "react";
import { Link } from "react-router";
import * as MakerActions from "../actions/MakerActions";

export default class Maker extends React.Component {
  deleteMaker(){
    MakerActions.deleteMaker(this.props.ID);
  }
        /*<div width="50px" text-overflow="ellipsis" white-space="nowrap" overflow="hidden">{blurb}</div>*/
        /*<button onClick={this.deleteMaker.bind(this)}> Delete </button>*/

  render() {
    const {name} = this.props;
    const {blurb} = this.props;
    const {ID}    = this.props;
    const {image} = this.props;

    var makerDetailsPath = "/makerDetails/" + ID + "/";
    var editMakerPath = "/addMaker/" + ID + "/";

    var shortBlurb = blurb.substring(0,140);
    if (blurb.length > 140) {
      shortBlurb = shortBlurb + "..."
    }
    return (
      <div class="col-md-12" id="maker">
        <h4><Link to={{ pathname: makerDetailsPath }}>   {name} </Link> </h4>
        <img src={image} alt="img not found" width="80" />
        <p>{shortBlurb}</p>
        <Link to={{ pathname: editMakerPath }}>   Edit </Link>
        <hr/>
      </div>
    );
  }
}
