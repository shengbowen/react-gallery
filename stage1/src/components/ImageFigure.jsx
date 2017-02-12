import React from 'react';

class ImageFigure extends React.PureComponent {
  constructor() {
    super();
  }

  render() {
    return (
      <figure className="img-figure">
        <img src={ this.props.data.imageURL } alt={ this.props.data.title }/>
        <figcaption>
          <h2 className="img-figure__title">{ this.props.data.title }</h2>
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