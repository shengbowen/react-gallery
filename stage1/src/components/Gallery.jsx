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


