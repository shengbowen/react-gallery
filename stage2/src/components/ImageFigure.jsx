import React, { PropTypes } from 'react';

class ImageFigure extends React.PureComponent{
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    if(this.props.arrange.isCenter) {
      this.props.setInverse();
    } else {
      this.props.setCenter();
    }
    e.stopPropagation();
    e.preventDefault();
  }

  render() {
    let styleObj = {};
    const { arrange, data } = this.props;

    if(arrange) {
      styleObj = {...arrange.pos}; //如果直接 styleObj=arrange
    }

    if(arrange.rotate) {
      ['Webkit', 'O', 'ms', ''].forEach(
        (prefix) => styleObj[`${prefix}Transform`] = `rotate(${arrange.rotate}deg)`
      );
    }

    if(arrange.isCenter) {
      styleObj.zIndex = 11;
    }

    let figureClass = 'img-figure' + (arrange.isInverse ? ' img-figure--inverse' : '');

    return (
      <figure className={ figureClass } style={ styleObj } onClick={ this.handleClick }>
        <img src={ data.imageUrl } alt={ data.title } />
        <figcaption>
          <h2 className="img-figure__title">{ data.title }</h2>
          <div className="img-figure__back">
            <p>{ data.description }</p>
          </div>
        </figcaption>
      </figure>
    )
  }
}

ImageFigure.PropTypes = {
  arrange: PropTypes.shape({
    pos: PropTypes.object,
    rotate: PropTypes.number,
    isCenter: PropTypes.bool,
    isInverse: PropTypes.bool
  }),
  setCenter: PropTypes.func
}

export default ImageFigure;
