import React from "react";
import Book from "./Book";

//Below are "props" that are passed down to the Book component.
const mainBookList = [ //in future, this data will come from a database or a Redux store
  {
    title: "The Sun Also Rises",
    author: "Ernest Hemingway",
    summary: "A guy and his expat friends being depressed in Europe."
  },
  {
    title: "Goodnight Moon",
    author: "Margaret W",
    summary: "A bunny says goodnight to all the things in his bedroom."
  }
];


function BookList(){
  return (
    <React.Fragment>
      <hr/>
      {mainBookList.map((book, index) =>
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

export default BookList;