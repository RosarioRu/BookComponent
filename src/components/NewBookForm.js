import React from "react";
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";

function NewBookForm(props){

  function handleNewBookFormSubmission(event)
    {
      event.preventDefault();
      props.onNewBookCreation({
        title: event.target.title.value,
        author: event.target.author.value,
        summary: event.target.summary.value,
        review: event.target.review.value,
      });
      props.onNewBookCreationAlsoAddToUserList({
        title: event.target.title.value,
        author: event.target.author.value,
        summary: event.target.summary.value,
        userEmail: event.target.userEmail.value,
        review: event.target.review.value,
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
};

export default NewBookForm;