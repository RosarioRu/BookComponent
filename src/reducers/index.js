import formVisibleReducer from './form-visible-reducer';
import bookListReducer from './book-list-reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  formVisibleOnPage: formVisibleReducer,
  mainBookList: bookListReducer
});

export default rootReducer;