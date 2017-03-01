import { actionsType } from 'actions/comment';

const defaultState = {
  1: [],
  2: []
};

function imageComment(state=[], action) {
  switch(action.type) {
    case actionsType.ADD_COMMENT:
      return [
        ...state,
        {
          user: action.user,
          text: action.text
        }
      ];
    case actionsType.REMOVE_COMMENT:
      return [
        ...state.slice(0, action.index - 1),
        ...state.slice(action.index + 1)
      ];
    default:
      return state;
  }
}

export default function comments(state=defaultState, action) {
  if(typeof action.imageId !== 'undefined') {
    return {
      ...state,
      [action.imageId]: imageComment(state[action.imageId], action)
    };
  }
  return state;
}