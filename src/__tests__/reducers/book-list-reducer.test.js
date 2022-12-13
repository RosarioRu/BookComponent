import bookListReducer from "../../reducers/book-list-reducer";


describe('bookListReducer', () => {

  let action;
  const bookData = { 
    title: "Goodnight Moon",
    author: "Margaret W.",
    summary: "A bunny says goodnight to everything in his bedroom.",
    id: 1
  };
  const currentState= {
    1: {
      title: "Title 1",
      author: "Author 1",
      summary: "A summary of book 1.",
      id:1
    },
    2: {
      title: "Title 2",
      author: "Author 2",
      summary: "A summary of book 2.",
      id: 2
    }
  };

  //test 1
  test("Should return default state if there is no action type passed into the reducer", () => {
    expect(bookListReducer({}, {type: null})).toEqual({});
  });

  //test 2
  test("Should sucessfully add a new 'book' to mainBookList with the bookData provided", () => {
    const { title, author, summary, id } = bookData;
    action = {
      type: "ADD_BOOK",
      title: title,
      author: author, 
      summary: summary,
      id: id
    };
    expect(bookListReducer({}, action)).toEqual({
      [id]: {
        title: title,
        author: author,
        summary: summary,
        id: id
      }
    });
  });

  //test 3
  test("Should delete ticket with key of 2", () => {
    action = {
      type: "DELETE_BOOK",
      id: 2
    };
    expect(bookListReducer(currentState, action)).toEqual({
      1: {
        title: "Title 1",
        author: "Author 1",
        summary: "A summary of book 1.",
        id:1
      }
    });
  });

  //test 4
  test("Should update an existing ticket when partial changes are submitted", () => {
    action = {
      type: "UPDATE_BOOK",
      id: 1,
      // title: "NEW UPDATED TITLE TEST!",
      author: "Jimminy Cricket"
    };
    expect(bookListReducer(currentState, action)).toEqual({
      1: {
        // title: "NEW UPDATED TITLE TEST!",
        title: "Title 1",
        author: "Jimminy Cricket",
        summary: "A summary of book 1.",
        id:1
      },
      2: {
        title: "Title 2",
        author: "Author 2",
        summary: "A summary of book 2.",
        id: 2
      }
    });
  });

  //test 5: checking that if we provide a null value the reducer will still work to update a book - in preperation for a partially completed/provided form. 
  test("Should keep existing title when title provided in the action is 'null' but update the summary", () => {
    action = {
      type: "UPDATE_BOOK",
      id: 1,
      title: null,
      summary: "Updates the summary successfully."
    };
    expect(bookListReducer(currentState, action)).toEqual({
      1: {
        title: "Title 1",
        author: "Author 1",
        summary: "Updates the summary successfully.",
        id:1
      },
      2: {
        title: "Title 2",
        author: "Author 2",
        summary: "A summary of book 2.",
        id: 2
      }
    });
  });

});
