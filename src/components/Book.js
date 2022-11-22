import React from "react";

function Book(props){//props (read-only) from BookList component
  return (
    <React.Fragment>
      <h3>{props.title}</h3>
      <h3>{props.author}</h3>
      <p><em>{props.summary}</em></p>
      <hr/>
    </React.Fragment>
  );
}

export default Book;