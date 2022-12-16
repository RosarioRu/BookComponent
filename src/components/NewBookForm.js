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
  onNewBookCreation: PropTypes.func
};

export default NewBookForm;