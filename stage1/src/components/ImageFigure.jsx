import React from 'react';

// class ImageFigure extends React.PureComponent { //两种方式有明显区别
class ImageFigure extends React.Component{
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    if(this.props.imgStyle.isCenter) {
      this.props.inverse();
    }else {
      this.props.setCenter();
    }

    e.stopPropagation();
    e.preventDefault();
  }

  render() {

    var styleObj = {};

    //如果props中指定了样式就是用
    if(this.props.imgStyle) {
      styleObj = this.props.imgStyle.pos;
      // console.log(styleObj)
    }

    if(this.props.imgStyle.rotate) {
      ['Webkit', 'O', 'ms', ''].forEach(
        (prefix) => styleObj[`${prefix}Transform`] = `rotate(${this.props.imgStyle.rotate}deg)`
      )
    }

    if(this.props.imgStyle.isCenter) {
      styleObj.zIndex = 11;
    }

    var figureClass = 'img-figure' + (this.props.imgStyle.isInverse ? ' img-figure--inverse' : '');

    return (
      <figure className={ figureClass } style={ styleObj }>
        <img src={ this.props.data.imageURL } alt={ this.props.data.title } onClick={ this.handleClick }/>
        <figcaption>
          <h2 className="img-figure__title">{ this.props.data.title }</h2>
          <div className="img-figure__back" onClick={ this.handleClick }>
            <p>{this.props.data.description}</p>
          </div>
        </figcaption>
      </figure>
    )
  }
}


/*//另一种写法，相应的在使用时要将属性结构出来 如 <ImageFigure {...data} />
const ImageFigure = ({imageURL, title}) => {
  return (
      <figure>
        <img src={ imageURL } alt={ title }/>
        <figcaption>
          <h2>{ title }</h2>
        </figcaption>
      </figure>
    )
}*/

export default ImageFigure;