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
  default:
    return state;
  }

};

export default reducer;