import React from 'react';
import NewBookForm from './NewBookForm';
import BookList from './BookList';
import BookDetail from './BookDetail';
import EditBookForm from "./EditBookForm";
import React, { useState } from 'react';


function BookControl() {

  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [mainBookList, setMainBookList] = useState([]);

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
    if (this.state.selectedBook != null) {
      setFormVisibleOnPage(false);
      this.setState({
        formVisibleOnPage: false,
        selectedBook: null,
        editing: false
      });
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
    const bookSelected = this.props.mainBookList[chosenBookId];
    this.setState({
      selectedBook: bookSelected,
    }); 
  }

  const handleDeletingBook = (id) => {
    const newMainBookList = mainBookList.filter(book => book.id !== id);
    setMainBookList(newMainBookList);
  }

  const handleEditClick= () => {
    this.setState({
      editing: true
    });
  }

  const handleEditingBookInList = (bookToEdit)=> {
    const editedMainBookList = mainBookList.filter(book => book.id !== this.state.selectedBook.id)
    .concat(bookToEdit);
    setMainBookList(editedMainBookList);
  }

    
  let currentlyVisibleState = null;
  let buttonText = null;  

  if (this.state.editing) {
    currentlyVisibleState = <EditBookForm book={this.state.selectedBook} onEditBook={this.handleEditingBookInList} />
    buttonText="Never mind"
  }
  else if (this.state.selectedBook != null) {
    currentlyVisibleState = <BookDetail book={this.state.selectedBook} onClickingDelete={this.handleDeletingBook} onClickingEdit={this.handleEditClick} />;
    buttonText = "Return to Book List";
  }
  else if (formVisibleOnPage) {
    currentlyVisibleState = <NewBookForm onNewBookCreation={this.handleAddingNewBookToList} />;
    buttonText = "Return to Book List";
  } else {
    currentlyVisibleState = <BookList bookList={mainBookList} onBookSelection={this.handleChangingSelectedBook} />;
    buttonText = "Add a Book";
  }
  

  return(
    <React.Fragment>
      {currentlyVisibleState}
      <button onClick = {this.handleClick}>{buttonText}</button>
    </React.Fragment>
  );

}


export default BookControl;