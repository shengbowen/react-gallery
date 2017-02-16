import React from 'react';
import { render, findDOMNode } from 'react-dom';

import ImageFigure from './ImageFigure';
import ControllerUnit from './ControllerUnit';

let imageDatas = require('json-loader!../data/imageData.json');

const genImageURL = imageDataArr => {
  imageDataArr.forEach(imageData => {
    imageData.imageURL = require('../images/' + imageData.name);
  })
  return imageDataArr;
}

const getRangeRandom = (low, high) => Math.floor(Math.random() * (high- low) + low);

// 获取-30 到 30 的整数
const get30DegRandom = () => (Math.random() > 0.5 ? 1 : -1) * Math.ceil(Math.random() * 30);


imageDatas = genImageURL(imageDatas); //添加图片地址

class Gallery extends React.Component {
  constructor() {
    super();
    // this.inverse = this.inverse.bind(this);
    this.state = { imgsArr: [
      /**
       * {
       *    pos: {
       *        left:  0,
       *        right: 0
       *     },
       *    rotate: 0,
       *    isInverse: false,
       *    isCenter: false
       * }
       */
    ] };
    this.Constant = {
      centerPos: {
          left: 0,
          right: 0
        },
        hPosRange: { //水平方向的图片位置取值范围
          leftSecX: [0, 0],
          rightSecX: [0, 0],
          y: [0, 0]
        },
        vPosRange: { //垂直方向的图片位置取值范围
          x: [0, 0],
          topY: [0, 0]
        }
    }
  }

  // 组件挂在以后， 为每张图片计算位置的范围
  componentDidMount() {
    const stageDOM =this.refs.stage,
          stageWidth = stageDOM.scrollWidth,
          stageHight = stageDOM.scrollHeight,
          halfStageW = Math.ceil(stageWidth / 2),
          halfStageH = Math.ceil(stageHight / 2);

    const imgFigure = findDOMNode(this.refs.imgFigure0),
          imgWidth = imgFigure.scrollWidth,
          imgHeight = imgFigure.scrollHeight,
          halfImgW = Math.ceil(imgWidth / 2),
          halfImgH = Math.ceil(imgHeight / 2);

    this.Constant = {
      centerPos: {
        left: halfStageW - halfImgW,
        top: halfStageH - halfImgH
      },
      hPosRange: {
        leftSecX: [-halfImgW, halfStageW - halfImgW * 3],
        rightSecX: [halfStageW + halfImgW, stageWidth - halfImgW],
        y: [-halfImgH, stageHight - halfImgH]
      },
      vPosRange: {
        topY: [-halfImgH, halfStageH - halfImgH * 3],
        x: [halfStageW - imgWidth, halfStageW]
      }
    };

    this.setCenter(0);

  }

  /**
   * 设置中心图片 并重新布局
   * @param centerIndex 指定中心图片
   */
  setCenter(centerIndex) {

    const imgsArr = this.state.imgsArr,
          Constant = this.Constant,
          centerPos = Constant.centerPos,
          hPosRange = Constant.hPosRange,
          vPosRange = Constant.vPosRange,
          hPosRangeLeftSecX = hPosRange.leftSecX,
          hPosRangeRightSecX = hPosRange.rightSecX,
          hPosRangeY = hPosRange.y,
          vPosRangeTopY = vPosRange.topY,
          vPosRangeX = vPosRange.x;

    var imgsTopArr = [],
        topImgNum = Math.floor(Math.random() * 2), //取一张或不取图片放在中心图片的上方
        topImgSpliceIndex = 0,
        imgsCentArr = imgsArr.splice(centerIndex, 1);

    //居中centerIndex 垂直方向的图片
    imgsCentArr[0] = {
      pos: centerPos,
      isCenter: true,
    };

    //取出要布局的上侧的图片
    topImgSpliceIndex = Math.floor(Math.random() * (imgsArr.length - topImgNum));
    imgsTopArr = imgsArr.splice(topImgSpliceIndex, topImgNum);

    //布局位于上侧的图片
    imgsTopArr.forEach((value, index) => {
      imgsTopArr[index] =  {
        pos: {
          top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
          left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
        },
        rotate: get30DegRandom(),
        isCenter: false
      }
    });

    //布局左右两侧的图片
    for(let i = 0, j = imgsArr.length, k = j / 2; i < j; i++ ) {
      let hPosRangeLORX = null;

      //前半部分布局在左边，有半部分布局在右边
      hPosRangeLORX = i < k ? hPosRangeLeftSecX :hPosRangeRightSecX;

      imgsArr[i] = {
        pos: {
          left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1]),
          top: getRangeRandom(hPosRangeY[0], hPosRangeY[1])
        },
        rotate: get30DegRandom(),
        isCenter: false
      }
    }

    if(imgsTopArr && imgsTopArr[0]) {
      imgsArr.splice(topImgSpliceIndex, 0, imgsTopArr[0]);
    }

    imgsArr.splice(centerIndex, 0, imgsCentArr[0]);

    this.setState({ imgsArr: imgsArr});

  }

  /**翻转图片闭包
   * @param index 用来标记要翻转图片的index
   * @return {Function} 返回一个函数
   */
  inverse(index) {
    return () => {
      let imgsArr = this.state.imgsArr;
      imgsArr[index].isInverse = !imgsArr[index].isInverse;
      this.setState({
        imgsArr: imgsArr
      });
    }
  }

  /**
   * @param index  用来标记要居中的图片index
   * @return {Function}
   */
  reSetCenter(index) {
    return () => {
      this.setCenter(index);
    }
  }

  render() {
    const controllerUnits = [],
          imgFigures = [];

    imageDatas.forEach(function(val, index) {
      // imgFigures.push(<ImageFigure { ...val } key={index} />);

      if(!this.state.imgsArr[index]) {
        this.state.imgsArr[index] =  {
          pos: {
            left: 0,
            top: 0
          },
          rotate: 0,
          isInverse: false,
          isCenter: false
        }
      }

      imgFigures.push(<ImageFigure data={ val } key={index}
           ref={'imgFigure' + index} imgStyle={ this.state.imgsArr[index] }
           inverse={ this.inverse(index) } setCenter={ this.reSetCenter(index) }/>);

      controllerUnits.push(<ControllerUnit key={index} arrange={this.state.imgsArr[index]}
           inverse={this.inverse(index)} setCenter={ this.reSetCenter(index) }/>);
    }.bind(this));

    return (
      <section className="stage" ref="stage">
        <section className="img-sec">
          {imgFigures}
        </section>
        <nav className="controller-nav">
          {controllerUnits}
        </nav>
      </section>
    );
  }
}

export default Gallery;


