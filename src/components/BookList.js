import React from "react";
import Book from "./Book";
import PropTypes from "prop-types";


function BookList(props){

  const controlStyles = {
    border: "1px solid black",
    padding: "2%",
    margin: "2%",
    width: "25%"
  }

  return (
    <React.Fragment>
    <div style={controlStyles}>
      <h1>All Books</h1>
      <hr/>
      {Object.values(props.bookList).map( (book) => //loops through list passed down from BookControl as a prop of BookList
        <Book 
          title={book.title}
          author={book.author}
          summary={book.summary}
          key={book.id}
          id={book.id}
          whenBookClicked={props.onBookSelection}
        />
      )}
      </div>
    </React.Fragment>
  );
}

BookList.propTypes = {
  bookList: PropTypes.object,
  onBookSelection: PropTypes.func
};

export default BookList;