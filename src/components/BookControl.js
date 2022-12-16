import React from 'react';
import NewBookForm from './NewBookForm';
import BookList from './BookList';
import BookDetail from './BookDetail';
import EditBookForm from "./EditBookForm";
import React, { useState } from 'react';


function BookControl() {

  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [mainBookList, setMainBookList] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [editing, setEditing] = useState(false);

  // constructor(props) {
  //   super(props);
  //   console.log(props);
  //   this.state = {
  //     formVisibleOnPage: false,
  //     selectedBook: null,
  //     editing: false 
  //   };
  // }

  
  const handleClick = () => {
    if (selectedBook != null) {
      setFormVisibleOnPage(false);
      setSelectedBook(null);
      setEditing(false);
    } else {
      setFormVisibleOnPage(!formVisibleOnPage);
    }
  }

  const handleAddingNewBookToList = (newBook) => {
    const newMainBookList = mainBookList.concat(newBook);
    setMainBookList(newMainBookList);
    setFormVisibleOnPage(false)
    }

  const handleChangingSelectedBook = (chosenBookId) => {
    const selection = mainBookList.filter(book => book.id === chosenBookId)[0];
    setSelectedBook(selection);
  }

  const handleDeletingBook = (id) => {
    const newMainBookList = mainBookList.filter(book => book.id !== id);
    setMainBookList(newMainBookList);
    setSelectedBook(null);
  }

  const handleEditClick= () => {
    setEditing(true);
  }

  const handleEditingBookInList = (bookToEdit)=> {
    const editedMainBookList = mainBookList.filter(book => book.id !== selectedBook.id)
    .concat(bookToEdit);
    setMainBookList(editedMainBookList);
    setEditing(false);
    setSelectedBook(null);
  }

    
  let currentlyVisibleState = null;
  let buttonText = null;  

  if (editing) {
    currentlyVisibleState = 
      <EditBookForm 
        book={selectedBook} 
        onEditBook={handleEditingBookInList} />
    buttonText="Never mind";
  } else if (selectedBook != null) {
    currentlyVisibleState = 
      <BookDetail 
        book={selectedBook} 
        onClickingDelete={handleDeletingBook} 
        onClickingEdit={handleEditClick} />;
    buttonText = "Return to Book List";
  } else if (formVisibleOnPage) {
    currentlyVisibleState = 
      <NewBookForm 
        onNewBookCreation={handleAddingNewBookToList} />;
    buttonText = "Return to Book List";
  } else {
    currentlyVisibleState = 
      <BookList 
        bookList={mainBookList} 
        onBookSelection={handleChangingSelectedBook} />;
    buttonText = "Add a Book";
  }
  

  return(
    <React.Fragment>
      {currentlyVisibleState}
      <button onClick = {handleClick}>{buttonText}</button>
    </React.Fragment>
  );

}


export default BookControl;