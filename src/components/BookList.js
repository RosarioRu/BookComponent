import React from "react";
import Book from "./Book";
import PropTypes from "prop-types";


function BookList(props){
  return (
    <React.Fragment>
      <hr/>
      {props.bookList.map( (book) => //loops through list passed down from BookControl as a prop of BookList
        <Book 
          title={book.title}
          author={book.author}
          summary={book.summary}
          key={book.id}
          id={book.id}
          whenBookClicked={props.onBookSelection}
          // key={index}
        />
      )}
    </React.Fragment>
  );
}

BookList.propTypes = {
  bookList: PropTypes.array,
  onBookSelection: PropTypes.func
};

export default BookList;