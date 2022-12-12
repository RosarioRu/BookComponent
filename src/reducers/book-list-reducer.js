const reducer = (state = {}, action) => {

  const { title, author, summary, id } = action;

  switch (action.type) {
  case 'ADD_BOOK': 
    return Object.assign({}, state, {
      [action.id]: {
        // title: title,
        // author: author,
        // summary: summary,
        // id: id
        title: action.title,
        author: action.author,
        summary: action.summary,
        id: action.id
      }
    });
  case 'DELETE_BOOK':
    let newState = {...state};
    delete newState[id];
    return newState;
  case 'UPDATE_BOOK':
    let copyOfState = {...state};
    const bookToUpdate = copyOfState[id];
    const updatedBook = {...bookToUpdate, title: (action.title || bookToUpdate.title), author: (author || bookToUpdate.author), summary: (summary || bookToUpdate.summary)};
    return {...copyOfState, [id] : updatedBook};
  default:
    return state;
  }

};

export default reducer;