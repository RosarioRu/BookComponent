import React from "react";
import PropTypes from "prop-types";
import {v4} from 'uuid';
import ReusableForm from "./ReusableForm";

function NewBookForm(props){

  function handleNewBookFormSubmission(event)
    {
      event.preventDefault();
      props.onNewBookCreation({
        title: event.target.title.value,
        author: event.target.author.value,
        summary: event.target.summary.value,
        id: v4()
      });
    }

  return (
    <React.Fragment>
      <ReusableForm 
        formSubmissionHandler={handleNewBookFormSubmission} 
        buttonText="Add Book"
      />
      {/* <form onSubmit={handleNewBookFormSubmission}>
        <input required
          type='text'
          name='title'
          placeholder='Book title' 
        />
        <input required
          type="text"
          name="author"
          placeholder="Author"
        />
        <input required
          name="summary"
          placeholder="brief summary of book"
        />
        <button type='submit'>Add book</button>
      </form> */}
    </React.Fragment>
  );
}

NewBookForm.propTypes = {
  onNewBookCreation: PropTypes.func
};

export default NewBookForm;