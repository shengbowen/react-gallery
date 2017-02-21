import React from 'react';
import { connect } from 'react-redux';

import { actions } from 'actions/stage';
import ImageFigure from '../components/ImageFigure';

class Gallery extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const controllerUnits = [],
          imgFigures = [];

    const { imageDatas, imgArrangeArr, dispatch } = this.props;

    if(!imageDatas.length) dispatch(actions.initState());

    imageDatas.forEach((value, index) => {
      imgFigures.push(
        <ImageFigure data={ value } key={ index } ref={ `imgFigure${index}` }
          arrange={ imgArrangeArr[index] }/>
      )
    });

    return (
      <section className="stage" ref={(stage) => {this.stage = stage;}}>
        <section className="img-sec">
          { imgFigures }
        </section>
        <nav className="controller-nav">
          { controllerUnits }
        </nav>
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.stage
  }
};

export default connect(mapStateToProps)(Gallery);