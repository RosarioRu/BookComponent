import React from "react";
import PropTypes from "prop-types";
import {v4} from 'uuid';

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
      <form onSubmit={handleNewBookFormSubmission}>
        <input
          type='text'
          name='title'
          placeholder='Book title' 
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
        />
        <input
          name="summary"
          placeholder="brief summary of book"
        />
        <button type='submit'>Add book</button>
      </form>
    </React.Fragment>
  );
}

NewBookForm.propTypes = {
  onNewBookCreation: PropTypes.func
};

export default NewBookForm;