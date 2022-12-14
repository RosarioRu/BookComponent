import * as c from './ActionTypes';

export const deleteBook = id => ({
  type: c.DELETE_BOOK,
  id
});

export const toggleForm = () => ({
  type: c.TOGGLE_FORM
});

export const addBook = (book) => ({
  type: c.ADD_BOOK,
  title: book.title,
  author: book.author,
  summary: book.summary,
  id: book.id
});