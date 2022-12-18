import React from "react";
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";



function NewBookForm(props){

  function handleNewBookFormSubmission(event)
    {
      event.preventDefault();
      props.onNewBookCreation({ //triggers handleAddingNewBookToList in book control
        title: event.target.title.value,
        author: event.target.author.value,
        summary: event.target.summary.value,
        // review: event.target.review.value,
      });
      props.onNewBookCreationAlsoAddToUserList({
        title: event.target.title.value,
        author: event.target.author.value,
        summary: event.target.summary.value,
        // userEmail: event.target.userEmail.value,
        // review: event.target.review.value,
      });
      props.onNewBookCreationAlsoAddToReviewCollection({
        bookTitle: event.target.title.value,
        bookAuthor: event.target.author.value,
        // bookAuthor: event.target.author.value,
        review: event.target.review.value,
        userEmail: event.target.userEmail.value,
      });
    }

  return (
    <React.Fragment>
      <ReusableForm 
        formSubmissionHandler={handleNewBookFormSubmission} 
        buttonText="Add Book"
      />
    </React.Fragment>
  );
}

NewBookForm.propTypes = {
  onNewBookCreation: PropTypes.func,
  onNewBookCreationAlsoAddToUserList: PropTypes.func,
  onNewBookCreationAlsoAddToReviewCollection: PropTypes.func,
};

export default NewBookForm;