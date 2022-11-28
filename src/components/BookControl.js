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
    return(
      <React.Fragment>

      </React.Fragment>
    );
  }

}

export default BookControl;