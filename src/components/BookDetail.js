import React from "react";
import PropTypes from "prop-types";


function BookDetail(props) {
  const { book } = props;
  return(
    <React.Fragment>
      <h1>{book.title}</h1>
      <h5>By {props.book.author}</h5>
      <p>{book.summary}</p> 
      <p><em>{book.review}</em></p>
      {/* <p>{book.id}</p> */}

      <button onClick={()=>props.onClickingDelete(book.id)}>Delete book</button>

      <button onClick={props.onClickingEdit}>Make changes</button>

      <hr/>
    </React.Fragment>
  ); 
}



BookDetail.propTypes = {
  book: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func
};

export default BookDetail;