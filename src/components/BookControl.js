import React, { useState, useEffect } from 'react';
import NewBookForm from './NewBookForm';
import BookList from './BookList';
import BookDetail from './BookDetail';
import { db, auth } from './../firebase.js';
import { collection, addDoc, onSnapshot, doc, deleteDoc, query, where, getDocs} from 'firebase/firestore';
import UserBooks from './UserBooks';
import AddReviewForm from './AddReviewForm';


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
  const [userBookList, setUserBookList] = useState([]);

  //renders All Books list
  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db, "books"),
      (collectionSnapshot) => {
        const books = [];
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
        setError(error.message);
      }
    );
    return () => unSubscribe();
  }, []);

  
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


  //Adds book to All Books collection in firestore upon new book creation
  const handleAddingNewBookToList = async (newBookData) => {
    const titleEntered = newBookData.title;
    const q = query(collection(db, "books"), where("title", "==", titleEntered), where("author", "==", newBookData.author));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      await addDoc(collection(db, "books"), newBookData);
      setFormVisibleOnPage(false);
    }
  }
  
  //Adds book to User's Book List in firestore upon new book creation
  const handleAddingNewBookToUserList = async (newBookData) => {
    const titleEntered = newBookData.title;
    const q = query(collection(db, "books"), where("title", "==", titleEntered), where("author", "==", newBookData.author))
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
    await addDoc(collection(db, auth.currentUser.email), newBookData);
    setFormVisibleOnPage(false);
    }
  }

  //Adds review (if one is entered) to Review collection in firestore upon new book creation
  const handleAddingNewReviewToReviewList = async(newBookData) => {
    const titleEntered = newBookData.bookTitle;
    const q = query(collection(db, "books"), where("title", "==", titleEntered), where("author", "==", newBookData.bookAuthor))
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty && (newBookData.review !== "")) {
    await addDoc(collection(db, "reviews"), newBookData);
    } else {
      setFormVisibleOnPage(false);
    }
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


  //Adds another review to Review collection in firestore upon new review form (used to be called 'handleEditingBookInList')
  const handleAddingReviewToAnExistingBook = async(newBookData) => {
    const whichEmailToSearch = auth.currentUser.email;
    const q = query(collection(db, whichEmailToSearch), where("title", "==", newBookData.bookTitle), where("author", "==", newBookData.bookAuthor))
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      const copyOfNewBookData = {title: newBookData.bookTitle, author: newBookData.bookAuthor, summary: selectedBook.summary}
      await addDoc(collection(db, whichEmailToSearch), copyOfNewBookData);
    } else {
      console.log("book found");
    };

    await addDoc(collection(db, "reviews"), newBookData);
    setEditing(false);
    setSelectedBook(null);
  } 

  
  // branching that determines how the UI shold look:

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
        <AddReviewForm
          book={selectedBook}
          onEditBook={handleAddingReviewToAnExistingBook} />
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
          onNewBookCreation={handleAddingNewBookToList} 
          onNewBookCreationAlsoAddToUserList={handleAddingNewBookToUserList}
          onNewBookCreationAlsoAddToReviewCollection={handleAddingNewReviewToReviewList}/>
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
              <p>Signed in user: {auth.currentUser.displayName}</p>
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