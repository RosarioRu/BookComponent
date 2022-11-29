import React from "react";

function NewBookForm(props){

  function handleNewBookFormSubmission(event)
    {
      event.preventDefault();
      console.log(event.target.title.value);
      console.log(event.target.author.value);
      console.log(event.target.summary.value);
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

export default NewBookForm;