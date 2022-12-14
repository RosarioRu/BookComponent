import React from 'react';
import NewBookForm from './NewBookForm';
import BookList from './BookList';
import BookDetail from './BookDetail';
import EditBookForm from "./EditBookForm";
import Book from './Book';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as a from './../actions';

class BookControl extends React.Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      selectedBook: null,
      editing: false 
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
        selectedBook: null,
        editing: false
      });
    } else {
      const { dispatch } = this.props;
      const action = a.toggleForm();
      dispatch(action);
    }
  }

  handleAddingNewBookToList = (newBook) => {
    const { dispatch } = this.props;
    const action = a.addBook(newBook);
    dispatch(action);
    const action2 = a.toggleForm();
    dispatch(action2);
  }

  handleChangingSelectedBook = (chosenBookId) => {
    const bookSelected = this.props.mainBookList[chosenBookId];
    this.setState({
      selectedBook: bookSelected,
    }); 
  }

  handleDeletingBook = (id) => {
    const { dispatch } = this.props;
    const action = a.deleteBook(id);
    dispatch(action);
    this.setState({
      selectedBook: null
    });
  }

  handleEditClick= () => {
    // const bookToUpdate = this.state.mainBookList.filter(book => book.id === id)[0];
    this.setState({
      editing: true
      // selectedBook: bookToUpdate
    });
  }

  handleEditingBookInList = (bookToEdit)=> {
    const { dispatch } = this.props;
    const action = a.addBook(bookToEdit);
    //usign addBook action creator above but should later update with edit/update creator.
    dispatch(action);
    this.setState({
      selectedBook: null,
      editing: false
    });
  }

  render() {
    
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
    else if (this.props.formVisibleOnPage) {
      currentlyVisibleState = <NewBookForm onNewBookCreation={this.handleAddingNewBookToList} />;
      buttonText = "Return to Book List";
    } else {
      currentlyVisibleState = <BookList bookList={this.props.mainBookList} onBookSelection={this.handleChangingSelectedBook} />;
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

BookControl.propTypes = {
  mainBookList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    mainBookList: state.mainBookList,
    formVisibleOnPage: state.formVisibleOnPage
  }
}

BookControl = connect(mapStateToProps)(BookControl);
export default BookControl;