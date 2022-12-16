import React from "react";
import readImage from './../img/read.png';

function Header(){

  const headerStyles = {
    // border: "1px solid black",
    marginTop: "0%",
    paddingLeft: "2%",
    paddingRight: "2%",
    paddingTop: "2%",
    paddingBottom: "1%",
    fontFamily: "'apple chancery', 'cursive'",
    textAlign: "left",
    // backgroundImage:`url(${readImage})`,
    backgroundImage: "url("+readImage+")",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right",
    // backgroundPosition: "left",
  
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
    }
  }

  return (
    <h1 style={headerStyles}><span style={headerStyles.a}>Curators for</span><span style={headerStyles.b}> Little Readers</span></h1>
  );
}

export default Header;