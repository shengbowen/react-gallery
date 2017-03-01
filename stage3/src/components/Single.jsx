import React from 'react';
import { connect } from 'react-redux';
import { IndexLink } from 'react-router';
import Comment from '../components/Comment';

class Single extends React.PureComponent {
  render() {
    const imageData = this.props.imageDatas[this.props.params.imageId];

    return (
      <div className="single-wrap">
        <h1><IndexLink to='/' className="home-IndexLink">Go Back Home</IndexLink></h1>
        <div className="single-photo">
          <figure className="figure-wrap">
            <img src={ imageData.imageUrl } alt=""/>
            <figcaption>{ imageData.description }</figcaption>
          </figure>
          <Comment { ...this.props }/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    imageDatas: state.stage.imageDatas
  }
}

export default connect(mapStateToProps)(Single);