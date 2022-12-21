import React from "react";
import PropTypes from "prop-types";
import Review from "./Review";


function Reviews(props) {
  
  return(
    <React.Fragment>
      <h3>Reviews</h3>
      {Object.values(props.listOfReviews).map( (review, index) => //loops through list passed down from BookControl as a prop of Reviews
        <Review 
          // title={review.bookTitle}
          // author={review.bookAuthor}
          review={review}
          key={index}
        />
      )}
      <hr/>
    </React.Fragment>
  ); 
}



Reviews.propTypes = {
  listOfReviews: PropTypes.array,
};

export default Reviews;