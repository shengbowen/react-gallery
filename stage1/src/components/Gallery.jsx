import React from 'react';
// import { render } from 'react-dom';

import ImageFigure from './ImageFigure';



let imageDatas = require('json-loader!../data/imageData.json');

console.log(imageDatas[0]);

const genImageURL = imageDataArr => {
  imageDataArr.forEach(imageData => {
    imageData.imageURL = require('../images/' + imageData.name);
  })
  return imageDataArr;
}

imageDatas = genImageURL(imageDatas); //添加图片地址

class Gallery extends React.PureComponent {
  constructor() {
    super();
  }

  getInitialState() {
    return {
      Constant: {
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
  }

  // 组件挂在以后， 为每张图片计算位置的范围
  componentDidMount() {
    const stageDOM = React.findDOMNode(this.ref.stage),
          stageWidth = stageDOM.scrollWidth,
          stageHight = stageDOM.scrollHeight,
          halfStageW = Math.ceil(stageWidth / 2),
          halfStageH = Math.ceil(stageHight / 2);

    const imgFigure = React.findDOMNode(this.ref.imgFigure0),
          imgWidth = imgFigure.scrollWidth,
          imgHeight = imgFigure.scrollHeight,
          halfImgW = Math.ceil(imgWidth / 2),
          halfImgH = Math.ceil(imgHeight / 2);

    this.setState({Constant: {
      centerPos: {
        left: halfStageW - halfImgW,
        top: halfStageH - halfImgH
      },
      hPosRange: {
        leftSecX: [-halfImgW, halfStageW - halfImgW / 2 * 3],
        rightSecX: [halfStageW + halfImgW, stageWidth - halfImgW],
        y: [-halfImgH, stageHight - halfImgH]
      },
      vPosRange: {
        topY: [-halfImgH, halfStageH - halfImgH / 2 * 3],
        x: [halfStageW - imgWidth, halfStageW]
      }
    }});

  }

  render() {
    const controllerUnits = [],
          imgFigures = [];

    imageDatas.forEach(function(val, index) {
      // imgFigures.push(<ImageFigure { ...val } key={index} />);
      imgFigures.push(<ImageFigure data={ val } key={index} ref={'imgFigure' + index}/>);
    });

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


