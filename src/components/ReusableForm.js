import React from "react";
import PropTypes from "prop-types";

function ReusableForm(props) {
  return(
    <React.Fragment>
      <form onSubmit={props.formSubmissionHandler}>
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
        <button type='submit'>{props.buttonText}</button>
      </form>
    </React.Fragment>
  );
}

ReusableForm.propTypes = {
  formSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string
};

export default ReusableForm;