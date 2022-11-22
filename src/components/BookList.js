import React from "react";
import Book from "./Book";

function BookList(){
  return (
    <React.Fragment>
    <Book 
      title = "The Sun Also Rises"//these are "props" that are passed down to the Book component.
      author = "Ernest Hemingway"//these are "props"
      summary = "A guy and his expat friends being depressed in Europe."//these are "props"
    />
    <Book 
      title = "Goodnight Moon"
      author = "Margaret W"
      summary = "A bunny says goodnight to all the things in his bedroom."
    />
    </React.Fragment>
  );
}

export default BookList;