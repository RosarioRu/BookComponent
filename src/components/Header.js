import React from "react";
import readImage from './../img/read.png';
import { Link } from "react-router-dom";

function Header(){

  const headerStyles = {
    border: "1px solid black",
    marginTop: "0%",
    marginBottom: "5%",
    paddingLeft: "2%",
    paddingRight: "2%",
    paddingTop: "2%",
    paddingBottom: "5%",
    fontFamily: "'apple chancery', 'cursive'",
    textAlign: "left",
    // backgroundImage:`url(${readImage})`,
    backgroundImage: "url("+readImage+")",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right",
    // backgroundPosition: "left",
    position: "relative",
  
    a: {
      // border: "1px solid black",
      // fontSize: "large",
      display: "inline",
      padding: "3px",
      // paddingLeft: "7%",
      paddingLeft: "3px",
      paddingRight: "2px",
      fontFamily: "serif",
      fontSize: "small"
    },
    b: {
      // border: "1px solid black",
      fontSize: "xx-large",
      padding: "3px",
      paddingRight: "6px",
      paddingBottom: "5px",
      // fontWeight: "bolder",
      fontFamily: "serif",
      fontStyle: "oblique"
    },
    c: {
      // border: "1px solid black",
      width: "15%",
      position: "absolute",
      bottom: "0",
      marginLeft: "1px"
    }
  }

  return (
    <React.Fragment>
    <div style={headerStyles}>
      <h1><span style={headerStyles.a}>Curators for</span><span style={headerStyles.b}> Little Readers</span></h1>
      <div style={headerStyles.c}>
        <Link to="/"><button type="button" className="btn btn-outline-secondary btn-sm">Home</button></Link>
        <Link to="/sign-in"><button type="button" className="btn btn-outline-secondary btn-sm">Log In</button></Link>
      </div>
    </div>
    </React.Fragment>
  );
}

export default Header;