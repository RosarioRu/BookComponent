import React from "react";
import PropTypes from "prop-types";
import { auth } from "./../firebase.js";

function AddReviewForm(props){

  function handleUpdatingBookFormSubmission(event)
    {
      event.preventDefault();
      props.onEditBook({ //this triggers handleAddingReviewToAnExistingBook in BookControl! Sends this object to that function
        bookTitle: props.book.title,
        bookAuthor: props.book.author,
        review: event.target.review.value,
        userEmail: event.target.userEmail.value,
      });
    }

  return (
    <React.Fragment>
      <form onSubmit={handleUpdatingBookFormSubmission}>
        <label htmlFor="review">Your Review: </label>
        <textarea required type="text" name="review" placeholder="Your review for this book goes here..."></textarea>
        <input type='text' name='userEmail' value={auth.currentUser.email} hidden/>
        <button type='submit'>Add Review</button>
      </form>
    </React.Fragment>
  );
}

AddReviewForm.propTypes = {
  book: PropTypes.object,
  onEditBook: PropTypes.func
};


export default AddReviewForm;