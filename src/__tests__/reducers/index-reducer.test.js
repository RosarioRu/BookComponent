import rootReducer from '../../reducers/index';
import { createStore } from 'redux';
import formVisibleReducer from '../../reducers/form-visible-reducer';
import bookListReducer from '../../reducers/book-list-reducer';
import * as c from "./../../actions/ActionTypes";


let store = createStore(rootReducer);

describe("rootReducer", () => {

  test("Should return default state if no action type is recognized", () => {
    expect(rootReducer({}, { type: null})).toEqual({
      mainBookList: {},
      formVisibleOnPage: false
    });
  });

  test("Check that initial state of bookListReducer matches root reducer", () => {
    expect(store.getState().mainBookList).toEqual(bookListReducer(undefined, { type: null }));
  });

  test("Check that initial state of formVisibleReducer matches root reducer", () => {
    expect(store.getState().formVisibleOnPage).toEqual(formVisibleReducer(undefined, { type: null }));
  });

  test("Check that ADD_BOOK action works for bookListReducer and root reducer", () => {
    const action = {
      type: c.ADD_BOOK,
      title: "Goodnight Moon",
      author: "Margaret Wise",
      summary: "A bunny says goodnight to everything in his room.",
      id: 1
    }
    store.dispatch(action);
    expect(store.getState().mainBookList).toEqual(bookListReducer(undefined, action));
    // console.log(store.getState().mainBookList);
  });

  test("Check that TOGGLE_FORM action works for formVisibleReducer and root reducer", () => {
    const action = {
      type: c.TOGGLE_FORM
    }
    store.dispatch(action);
    expect(store.getState().formVisibleOnPage).toEqual(formVisibleReducer(undefined, action));
    // console.log(store.getState().formVisibleOnPage);
  });



});