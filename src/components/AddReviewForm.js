import React from "react";
import PropTypes from "prop-types";

function AddReviewForm(props){

  function handleUpdatingBookFormSubmission(event)
    {
      event.preventDefault();
      props.onEditBook({ //this triggers handleEditingBookInList in BookControl! Sends this object to that function
        title: props.book.title,
        author: props.book.author,
        summary: props.book.summary,
        id: props.book.id,
        review: event.target.review.value,
      });
    }

  return (
    <React.Fragment>
      

      <form onSubmit={handleUpdatingBookFormSubmission}>
        {/* <input required
          type='text'
          name='title'
          placeholder='Book title' 
        />
        <input required
          type="text"
          name="author"
          placeholder="Author"
        />
        <input 
          type="text"
          name="summary"
        /> */}

        <label htmlFor="review">Your Review: </label>
        <textarea type="text" name="review" placeholder="Optional review for this book goes here..."></textarea>

        {/* <input type='text' name='userEmail' value={auth.currentUser.email} hidden/> */}

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