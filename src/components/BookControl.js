import React, { useState, useEffect } from 'react';
import NewBookForm from './NewBookForm';
import BookList from './BookList';
import BookDetail from './BookDetail';
import EditBookForm from "./EditBookForm";
import { db, auth } from './../firebase.js';
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';


function BookControl() {

  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [mainBookList, setMainBookList] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db, "books"),
      (collectionSnapshot) => {
        const books = [];
        //do something with ticket newBookData
        collectionSnapshot.forEach((doc) => {
          books.push({
            title: doc.data().title,
            author: doc.data().author,
            summary: doc.data().summary,
            id: doc.id
          });
        });
        setMainBookList(books);
      },
      (error) => {
        //do something with error
        setError(error.message);
      }
    );
    return () => unSubscribe();
  }, []);

  
  const handleClick = () => {
    if (selectedBook != null) {
      setFormVisibleOnPage(false);
      setSelectedBook(null);
      setEditing(false);
    } else {
      setFormVisibleOnPage(!formVisibleOnPage);
    }
  }

  const handleAddingNewBookToList = async (newBookData) => {
    await addDoc(collection(db, "books"), newBookData);
    // const newMainBookList = mainBookList.concat(newBook);
    // setMainBookList(newMainBookList);
    setFormVisibleOnPage(false)
    }

  const handleChangingSelectedBook = (chosenBookId) => {
    const selection = mainBookList.filter(book => book.id === chosenBookId)[0];
    setSelectedBook(selection);
  }

  const handleDeletingBook = async (id) => {
    await deleteDoc(doc(db, "books", id));
    setSelectedBook(null);
  }

  const handleEditClick= () => {
    setEditing(true);
  }

  // const handleEditingBookInList = (bookToEdit)=> {
  //   const editedMainBookList = mainBookList.filter(book => book.id !== selectedBook.id)
  //   .concat(bookToEdit);
  //   setMainBookList(editedMainBookList);
  //   setEditing(false);
  //   setSelectedBook(null);
  // }

  const handleEditingBookInList = async (bookToEdit) => {
    const bookReference = doc(db, "books", bookToEdit.id);
    await updateDoc(bookReference, bookToEdit);
    setEditing(false);
    setSelectedBook(null);
  }


    
  

  if (auth.currentUser == null) {
    return(
      <React.Fragment>
        <h1>Please sign in to see all Books</h1>
      </React.Fragment>
    )
  } else if (auth.currentUser != null) {
    
    let currentlyVisibleState = null;
    let buttonText = null;  

    if (error) {
      currentlyVisibleState = <p>Error: {error}</p>
    } else if (editing) {
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
        {error ? null : <button onClick = {handleClick}>{buttonText}</button>}
      </React.Fragment>
    );

  }
}


export default BookControl;