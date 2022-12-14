import * as actions from './../../actions';


describe("Book List actions", () => {

  it("addBook should create ADD_BOOK action", () => {
    expect(actions.addBook({
      title: "The Sun Also Rises",
      author: "Ernest Hemingway",
      summary: "A guy and his expat friends are depressed in Europe.",
      id: 1
    })).toEqual({
      type: "ADD_BOOK",
      title: "The Sun Also Rises",
      author: "Ernest Hemingway",
      summary: "A guy and his expat friends are depressed in Europe.",
      id: 1
    });
  });


  it("deleteBook should create DELETE_BOOK action", () => {
    expect(actions.deleteBook(1)).toEqual({
      type: "DELETE_BOOK",
      id: 1
    });
  });

  it("toggleForm should create TOGGLE_FORM action", () => {
    expect(actions.toggleForm()).toEqual({
      type: "TOGGLE_FORM"
    });
  });

});