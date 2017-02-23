import { actionsTypes } from 'actions/stage';

const defaultState = {
  imageDatas: [],
  imgArrangeArr: [],
}

export default function stage(state = defaultState, action) {
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

      let imgArrangeArr = [].concat(state.imgArrangeArr);
      imgArrangeArr[action.index] = {
        ...imgArrangeArr[action.index],
        isInverse: !imgArrangeArr[action.index].isInverse
      }

      return {
        ...state,
        imgArrangeArr
      }

    default:
      return state; //不能省掉，会报错
  }
};