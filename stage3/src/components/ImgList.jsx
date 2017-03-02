import React from 'react';
import { connect } from 'react-redux';

const Img = ({ imageUrl, title, description }) => {
  return (
    <div className="img-list-item">
      <img src={ imageUrl } alt={ title } className="pic" width="180" height="180"/>
      <div className="info">
        <h1 className="title">{ title }</h1>
        <p className="description">{ description }</p>
      </div>
    </div>
  )
}

class ImgList extends React.PureComponent {

  render() {

    const { imageDatas } = this.props;
    return (
      <div className="img-list">
        { imageDatas.map((item,i) => (<Img {...item} key={i} />)) }
      </div>
    )
  }

}

const mapStateToProps = (state) => ({...state.stage});

export default connect(mapStateToProps)(ImgList);