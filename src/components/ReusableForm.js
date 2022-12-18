import React from "react";
import PropTypes from "prop-types";
import { auth } from "./../firebase.js";


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
        <label htmlFor="review">Your Review: </label>
        <textarea type="text" name="review" placeholder="Optional review for this book goes here..."></textarea>

        <input type='text' name='userEmail' value={auth.currentUser.email} hidden/>

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