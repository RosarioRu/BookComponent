import React from "react";
import ReusableForm from "./ReusableForm";
import PropTypes from "prop-types";

function EditBookForm(props){

  function handleUpdatingBookFormSubmission(event)
    {
      event.preventDefault();
      props.onEditBook({
        title: event.target.title.value,
        author: event.target.author.value,
        summary: event.target.summary.value,
        id: props.book.id
      });
    }

  return (
    <React.Fragment>
      <ReusableForm 
        formSubmissionHandler={handleUpdatingBookFormSubmission} 
        buttonText="Update Book"
      />
    </React.Fragment>
  );
}

EditBookForm.propTypes = {
  book: PropTypes.object,
  onEditBook: PropTypes.func
};


export default EditBookForm;