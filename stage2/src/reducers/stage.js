import { actionsTypes } from 'actions/stage';

const defaultState = {
  imageDatas: [],
  imgArrangeArr: [],
}

export default stage = (state = defaultState, action) => {
  switch (action.type) {
    case actionsTypes.INIT_STATE:
      return {
        ...state,
        imageDatas: action.imageDatas,
        imgArrangeArr: action.imgArrangeArr
      };

    case actionsTypes.SET_CENTER:
      return {
        ...state,
        imgArrangeArr: action.imgArrangeArr
      };

    case actionsTypes.SET_INVERSE:
      return {
        ...state,
        imgArrangeArr: [...imgArrangeArr, imgArrangeArr[action.index].isInverse = !imgArrangeArr[action.index].isInverse]
      }
  }
};