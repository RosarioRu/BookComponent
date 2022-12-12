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

  test("Should return default state if there is no action type passed into the reducer", () => {
    expect(bookListReducer({}, {type: null})).toEqual({});
  });

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

  test("Should update an existing ticket when partial changes are submitted", () => {
    action = {
      type: "UPDATE_BOOK",
      id: 1,
      title: "NEW UPDATED TITLE TEST!"
    };
    expect(bookListReducer(currentState, action)).toEqual({
      1: {
        title: "NEW UPDATED TITLE TEST!",
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
    });
  });

});
