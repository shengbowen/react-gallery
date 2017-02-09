import React from 'react';
import { render } from 'react-dom';



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
    return (
      <section className="stage">
        <section className="img-sec"></section>
        <nav className="controller-nav"></nav>
      </section>
    );
  }
}

export default Gallery;


