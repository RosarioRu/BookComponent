import React from 'react';
import NewBookForm from './NewBookForm';
import BookList from './BookList';
import Book from './Book';

class BookControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      mainBookList: [] //list of books added to state
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
    this.setState(prevState => ({
      formVisibleOnPage: !prevState.formVisibleOnPage
    }));
  }

  onNewBookCreation = () => {
  }

  render() {
    
    let currentlyVisibleState = null;
    let buttonText = null;  

    if (this.state.formVisibleOnPage) {
      currentlyVisibleState = <NewBookForm onNewBookCreation />;
      buttonText = "Return to Book List";
    } else {
      currentlyVisibleState = <BookList bookList={this.state.mainBookList}/>;
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