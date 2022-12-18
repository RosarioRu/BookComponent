import React, { useState, useEffect } from 'react';
import NewBookForm from './NewBookForm';
import BookList from './BookList';
import BookDetail from './BookDetail';
import EditBookForm from "./EditBookForm";
import { db, auth } from './../firebase.js';
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import UserBooks from './UserBooks';
// import { onAuthStateChanged, getAuth } from '@firebase/auth';



function BookControl() {
  
  const tableStyles = {
    width: "70%",
    float: "center",
    tableLayout: "fixed"
  }

  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [mainBookList, setMainBookList] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);

  // const [theCurrentUser, setTheCurrentUser] = useState(null);
  const [userBookList, setUserBookList] = useState([]);

  
  // useEffect(() => {
  //   const auth = getAuth();
  //   onAuthStateChanged(auth, (user) => {
  //     if (user != null) {
  //       setTheCurrentUser(user.email);
  //       console.log("inside:" + theCurrentUser);
  //     } else {
  //       setTheCurrentUser(null);
  //     }
  //   });
    
  // });
  
  //renders All Books list
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
            review: doc.data().review,
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

  


  // onAuthStateChanged(auth, (user) => {
  //   console.log("onauth beginning " + user.displayName);
  //   let email;
  //   if (user != null) {
  //     email = user.email;
  //   } else {
  //     email = "noBooksYet";
  //   }
    
  //   console.log("onAuthStateChanged user is: " + email);
  //   return email;
  // });

  //renders User's Book List 
  useEffect(() => {
    let userCollection;
    if (auth.currentUser === null) {
      userCollection = "noBooksYet";
    } else {
      userCollection = `${auth.currentUser.email}`
    }
    const unSubscribe = onSnapshot(
      collection(db, userCollection),
      (collectionSnapshot) => {
        const usersb = [];
        collectionSnapshot.forEach((doc) => {
          usersb.push({
            title: doc.data().title,
            author: doc.data().author,
            summary: doc.data().summary,
            id: doc.id,
            userEmail: doc.data().userEmail
          });
        });
        setUserBookList(usersb);
      },
      (error) => {
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

  //Adds book to All Books list in firestore
  const handleAddingNewBookToList = async (newBookData) => {
    await addDoc(collection(db, "books"), newBookData);
    setFormVisibleOnPage(false);
  }

  // //Adds book to user's book list in firestore
  // const handleAddingNewBookToUserList = async (newBookData) => {
  //   await addDoc(collection(db, auth.currentUser.email), newBookData);
  //   setFormVisibleOnPage(false);
  // }

  const handleAddingNewBookToUserList = async (newBookData) => {
    await addDoc(collection(db, auth.currentUser.email), newBookData);
    setFormVisibleOnPage(false);
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


  const handleEditingBookInList = async (bookToEdit) => {
    const bookReference = doc(db, "books", bookToEdit.id);
    await updateDoc(bookReference, bookToEdit);
    setEditing(false);
    setSelectedBook(null);
  }


    
  

  if (auth.currentUser == null) {
    return(
      <React.Fragment>
        <h1>Please sign in to see your books</h1>
        <BookList 
          bookList={mainBookList} 
          onBookSelection={handleChangingSelectedBook} 
        />;
      </React.Fragment>
    )
  } else if (auth.currentUser != null) {
    
    let currentlyVisibleState = null;
    let alsoThis = null;
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
          onNewBookCreation={handleAddingNewBookToList} onNewBookCreationAlsoAddToUserList={handleAddingNewBookToUserList}/>;
      buttonText = "Return to Book List";
    } else {
      currentlyVisibleState = 
        <BookList 
          bookList={mainBookList} 
          onBookSelection={handleChangingSelectedBook} 
          />;
      alsoThis = 
        <UserBooks
          userBooks={userBookList} 
        /> 
      buttonText = "Add a Book";
      
    }
    
    return(
      <React.Fragment>
        <table className="table" style={tableStyles}>
        <tbody>
          <tr>
            <td>
              {currentlyVisibleState}
            </td>
            <td>
              {alsoThis}
              <p>{auth.currentUser.displayName}</p>
            </td>
          </tr>
          <tr>
            <td>
              {error ? null : <button onClick = {handleClick}>{buttonText}</button>}
            </td>
          </tr>
        {/* {currentlyVisibleState}
        {alsoThis} */}
        {/* {error ? null : <button onClick = {handleClick}>{buttonText}</button>} */}
        </tbody>
        </table>
      </React.Fragment>
    );

  }
}


export default BookControl;