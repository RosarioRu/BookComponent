
export const deleteBook = id => ({
  type: "DELETE_BOOK",
  id
});

export const toggleForm = () => ({
  type: "TOGGLE_FORM"
});

export const addBook = (book) => ({
  type: "ADD_BOOK",
  title: book.title,
  author: book.author,
  summary: book.summary,
  id: book.id
});