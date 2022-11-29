import React from "react";
import Book from "./Book";
import PropTypes from "prop-types";


function BookList(props){
  return (
    <React.Fragment>
      <hr/>
      {props.bookList.map((book, index) => //loops through list passed down from BookControl as a prop of BookList
        <Book 
          title={book.title}
          author={book.author}
          summary={book.summary}
          key={index}
        />
      )}
    </React.Fragment>
  );
}

BookList.proptypes = {
  bookList: PropTypes.array
};

export default BookList;