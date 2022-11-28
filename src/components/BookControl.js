import React from 'react';
import NewBookForm from './NewBookForm';
import BookList from './BookList';
import Book from './Book';

class BookControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false
    };
  }

  render() {
    
    let currentlyVisibleState = null;

    if (this.state.formVisibleOnPage) {
      currentlyVisibleState = <NewBookForm />
    } else {
      currentlyVisibleState = <BookList />
    }

    return(
      <React.Fragment>
        {currentlyVisibleState}
      </React.Fragment>
    );
  }

}

export default BookControl;