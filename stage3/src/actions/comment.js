export const actionsType = {
  ADD_COMMENT: 'ADD_COMMENT',
  REMOVE_COMMENT: 'REMOVE_COMMENT'
}

const addComment = (imageId, user, text) => {
  return {
    type: actionsType.ADD_COMMENT,
    imageId,
    user,
    text
  }
}

const removeComment = (imageId, index) => {
  return {
    type: actionsType.REMOVE_COMMENT,
    imageId,
    index
  }
}

export const actions = {
  addComment,
  removeComment
}