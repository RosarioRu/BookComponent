import React from "react";
import PropTypes from "prop-types";

function Review(props){//props (read-only) from Reviews component
  return (
    <React.Fragment>
        
        <p>{props.review}</p>
        {/* <h3>{props.title}</h3>
        <h6><em>by {props.author}</em></h6>
       */}
        <hr/>
    
    </React.Fragment>
  );
}

Review.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  review: PropTypes.string,
};

export default Review;