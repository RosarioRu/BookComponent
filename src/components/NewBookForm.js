import React from "react";
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";



function NewBookForm(props){

  function formatProperly(string) {
    let proper = "";
    let stringAsArray = string.split(" ");
    stringAsArray.forEach(function(word) {
      proper = proper.concat((word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() + " "));
    })
    return proper.trim();
  };

  function handleNewBookFormSubmission(event)
    {
      event.preventDefault();
      props.onNewBookCreation({ //triggers handleAddingNewBookToList in book control
        title: formatProperly(event.target.title.value),
        author: formatProperly(event.target.author.value),
        summary: event.target.summary.value,
        // review: event.target.review.value,
      });
      props.onNewBookCreationAlsoAddToUserList({
        title: formatProperly(event.target.title.value),
        author: formatProperly(event.target.author.value),
        summary: event.target.summary.value,
        // userEmail: event.target.userEmail.value,
        // review: event.target.review.value,
      });
      props.onNewBookCreationAlsoAddToReviewCollection({
        bookTitle: formatProperly(event.target.title.value),
        bookAuthor: formatProperly(event.target.author.value),
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