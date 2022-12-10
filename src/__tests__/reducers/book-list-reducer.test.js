import bookListReducer from "../../reducers/book-list-reducer";


describe('bookListReducer', () => {

  let action;
  const bookData = { 
    title: "Goodnight Moon",
    author: "Margaret W.",
    summary: "A bunny says goodnight to everything in his bedroom.",
    id: 1
  };

  test("Should return default state if there is no action type passed into the reducer", () => {
    expect(bookListReducer({}, {type: null})).toEqual({});
  });

  test("Should sucessfully add a new 'book' to mainBookList with the bookData provided", () => {
    const { title, author, summary, id } = bookData;
    action = {
      type: "ADD_TICKET",
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

});
