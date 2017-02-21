import React, { PropTypes } from 'react';

class ImageFigure extends React.PureComponent{
  constructor(props) {
    super(props);
  }

  render() {
    let styleObj = {};
    const { arrange, data } = this.props;

    if(arrange) {
      styleObj = arrange;
    }

    if(arrange.rotate) {
      ['Webkit', 'O', 'ms', ''].forEach(
        (prefix) => styleObj[`${prefix}Transform`] = `rotate(${arrange.rotate})`
      );
    }

    if(arrange.isCenter) {
      styleObj.zIndex = 11;
    }

    let figureClass = 'img-figure' + (arrange.isInverse ? ' img-figure--inverse' : '');

    return (
      <figure className={ figureClass } style={ styleObj }>
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

export default ImageFigure;
