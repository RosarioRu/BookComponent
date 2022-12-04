import React from "react";
import PropTypes from "prop-types";


function BookDetail(props) {
  const { book } = props;
  return(
    <React.Fragment>
      <h1>Book Details</h1>
      <h3>{props.book.title}</h3>
      <h5>By {props.book.author}</h5>
      {/* instead of saying 'props.book.summary' can just say book.summary because of object deconstruction on line 6: */}
      <p><em>{book.summary}</em></p> 
      <p>{book.id}</p>

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