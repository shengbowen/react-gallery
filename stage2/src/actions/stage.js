export const actionsTypes = {
  // RESET_POSITION: 'RESET_POSITION',
  SET_CENTER: 'SET_CENTER',
  SET_INVERSE: 'SET_INVERSE',
  INIT_STATE: 'INIT_STATE'
};

const getRangeRandom = (low, high) => Math.floor(Math.random() * (high - low) + high);

const get30DegRandom = () => (Math.random() > 0.5 ? 1 : -1) * Math.ceil(Math.random() * 30);

/**
 *初始化state，读取json文件获取图片地址信息，初始化图片舞台布局信息
 */
const initState = () => {
  let imageDatas = require('json-loader!../data/imageData.json');
  let imgArrangeArr = [];

  imageDatas.forEach((image, index) => {
    image.imageUrl = require('../images/' + image.name);
    imgArrangeArr.push({
      id: index,
      pos: {
        left: 0,
        right: 0
      },
      rotate: 0,
      isInverse: false,
      isCenter: false
    });
  });

  return {
    type: actionsTypes.INIT_STATE,
    imageDatas,
    imgArrangeArr
  }
};

const setCenter = (centerIndex, imgArrangeArr, stage) => {
  const centerPos = stage.centerPos,
    hPosRange = stage.hPosRange,
    vPosRange = stage.vPosRange,
    hPosRangeLeftSecX = hPosRange.leftSecX,
    hPosRangeRightSecX = hPosRange.rightSecX,
    hPosRangeY = hPosRange.y,
    vPosRangeTopY = vPosRange.tooY,
    vPosRangeX = vPosRange.x;

  let imgsTopArr = [],
    topImgNum = Math.floor(Math.random() * 2); //取一张或不取图片放在中心图片的上方
  topImgSpliceIndex = 0,
    imgsCenterArr = imgArrangeArr.splice(centerIndex, 1);

  //居中centerIndex 垂直方向的图片
  imgsCenterArr[0] = {
    ...imgsCenterArr[0],
    pos: centerPos,
    isCenter: true
  };

  //取出布局上侧的图片
  topImgSpliceIndex = Math.floor(Math.random() * (imgArrangeArr.length - topImgNum));
  imgsTopArr = imgArrangeArr.splice(topImgSpliceIndex, topImgNum);

  //布局位于上侧的图片
  imgsTopArr.forEach((value, index) => {
    imgsTopArr[index] = {
      ...imgsTopArr[index],
      pos: {
        top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
        left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
      },
      rotate: get30DegRandom()
    }
  });

  //布局左右侧的图片
  for (let i = 0, j = imgArrangeArr.length, k = j / 2; i < j; i++) {
    let hPosRangeLORX = null;

    //前半部分布局在左边，后半部分布局在右边
    hPosRangeLORX = i < k ? hPosRangeLeftSecX : hPosRangeRightSecX;

    imgArrangeArr[i] = {
      ...imgArrangeArr,
      pos: {
        left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1]),
        top: getRangeRandom(hPosRangeY[0], hPosRangeY[1])
      },
      rotate: get30DegRandom()
    }
  }

  if (imgsTopArr && imgsTopArr[0]) {
    imgArrangeArr.splice(topImgSpliceIndex, 0, imgsTopArr[0]);
  }

  imgArrangeArr.splice(centerIndex, 0, imgsCenterArr[0]);

  return {
    type: actionsTypes.SET_CENTER,
    imgArrangeArr,
    centerIndex
  }
};

const setInverse = (index) => {
  return {
    type: actionsTypes.setInverse,
    index
  }
};

export const actions = {
  initState,
  setCenter,
  setInverse
}