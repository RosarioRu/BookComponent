import bookListReducer from "../../reducers/book-list-reducer";


describe('bookListReducer', () => {
  test("Should return default state if there is no action type passed into the reducer", () => {
    expect(bookListReducer({}, {type: null})).toEqual({});
  });
});
