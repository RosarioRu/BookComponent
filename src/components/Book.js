import React from "react";
import PropTypes from "prop-types";

function Book(props){//props (read-only) from BookList component
  return (
    <React.Fragment>
      <div onClick={()=>props.whenBookClicked(props.id)}>
        <h3>{props.title}</h3>
        <h6><em>by {props.author}</em></h6>
        {/* <h3>{props.id}</h3> */}
        {/* <p><em>{props.summary}</em></p> */}
        <hr/>
      </div>
    </React.Fragment>
  );
}

Book.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  id: PropTypes.string, //or is this id: PropTypes.string?
  summary: PropTypes.string,
  review: PropTypes.string,
  whenBookClicked: PropTypes.func,
};

export default Book;