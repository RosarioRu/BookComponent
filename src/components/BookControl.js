import React from 'react';
import NewBookForm from './NewBookForm';
import BookList from './BookList';
import BookDetail from './BookDetail';
import Book from './Book';

class BookControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      mainBookList: [], //list of books added to SHARED state
      selectedBook: null //new local(?) state slice for book details
    };
  }

  // handleClick = () => {
  //   this.setState(
  //     {
  //       formVisibleOnPage: true
  //     }
  //   );
  // }

  // handleClick = () => {
  //   this.setState({formVisibleOnPage: true});
  // }

  //this handleClick method allows toggling! 
  handleClick = () => {
    if (this.state.selectedBook != null) {
      this.setState({
        formVisibleOnPage: false,
        selectedBook: null
      });
    } else {
      this.setState(prevState => ({
        formVisibleOnPage: !prevState.formVisibleOnPage
      }));
    }
  }

  handleAddingNewBookToList = (newBook) => {
    const newMainBookList = this.state.mainBookList.concat(newBook);
    this.setState({
      mainBookList: newMainBookList, 
      formVisibleOnPage: false
    });
  }

  handleChangingSelectedBook = (chosenBookId) => {
    const bookSelected = this.state.mainBookList.filter(book => book.id === chosenBookId)[0];
    this.setState({
      selectedBook: bookSelected,
    }); 
  }

  handleDeletingBook = (id) => {
    const newMainBookList = this.state.mainBookList.filter(book=> book.id !== id);
    this.setState({
      mainBookList: newMainBookList,
      selectedBook: null
    });
  }
      

  render() {
    
    let currentlyVisibleState = null;
    let buttonText = null;  

    if (this.state.selectedBook != null) {
      currentlyVisibleState = <BookDetail book={this.state.selectedBook} onClickingDelete={this.handleDeletingBook} />;
      buttonText = "Return to Book List";
    }
    else if (this.state.formVisibleOnPage) {
      currentlyVisibleState = <NewBookForm onNewBookCreation={this.handleAddingNewBookToList} />;
      buttonText = "Return to Book List";
    } else {
      currentlyVisibleState = <BookList bookList={this.state.mainBookList} onBookSelection={this.handleChangingSelectedBook} />;
      buttonText = "Add a Book";
    }

    return(
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick = {this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }

}

export default BookControl;