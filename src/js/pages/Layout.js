import React from "react";
import { Link } from "react-router";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Nav from "../components/layout/Nav";

/*
 * this.props.children refers to the different 'pages' defined in the router. As it currently stands,
 * there is only one child, and it is the content displayed on the page i.e. the child component(s). In
 * this case the child component is either Home or Settings as declared in client.js. Pretty freaking cool!
 */

export default class Layout extends React.Component {
  render() {
    const { location } = this.props;
    const containerStyle = {
      marginTop: "60px"
    };
    return (
      <div>
      <Header/>
        <Nav location={location} />

        <div class="container" style={containerStyle}>

          <div class="row">
            <div class="col-lg-12">
            
              {this.props.children}

            </div>
          </div>
          <Footer/>
        </div>
      </div>

    );
  }
}