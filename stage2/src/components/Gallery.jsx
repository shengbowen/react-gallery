import React from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';

import { actions } from 'actions/stage';
import ImageFigure from '../components/ImageFigure';
import ControllerUnit from '../components/ControllerUnit';

class Gallery extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const stageDom = this.stage,
          stageWidth = stageDom.scrollWidth,
          stageHeight = stageDom.scrollHeight,
          halfStageW = Math.ceil(stageWidth / 2),
          halfStageH = Math.ceil(stageHeight / 2);

    const imgFigure = findDOMNode(this.imgFigure0),
          imgWidth = imgFigure.scrollWidth,
          imgHeight = imgFigure.scrollHeight,
          halfImgW = Math.ceil(imgWidth / 2),
          halfImgH = Math.ceil(imgHeight / 2);

    this.stageInfo = {
      centerPos: {
        left: halfStageW - halfImgW,
        top: halfStageH - halfImgH
      },
      hPosRange: {
        leftSecX: [-halfImgW, halfStageW - halfImgW * 3],
        rightSecX: [halfStageW + halfImgW, stageWidth - halfImgW],
        y: [-halfImgH, stageHeight - halfImgH]
      },
      vPosRange: {
        topY: [-halfImgH, halfStageH - halfImgH * 3],
        x: [halfStageW - imgWidth, halfStageW]
      }
    };

    const { imgArrangeArr, dispatch } = this.props;
    dispatch(actions.setCenter(0, imgArrangeArr, this.stageInfo));
  }

  setCenter(index) {
    const { dispatch, imgArrangeArr } = this.props;
    return () => {
      dispatch(actions.setCenter(index, imgArrangeArr, this.stageInfo));
    }
  }

  setInverse(index) {
    const { dispatch } = this.props;
    return () => {
      dispatch(actions.setInverse(index));
    }
  }

  render() {
    const controllerUnits = [],
          imgFigures = [];

    const { imageDatas, imgArrangeArr, dispatch } = this.props;

    imageDatas.forEach((value, index) => {
      imgFigures.push(
        <ImageFigure data={ value } key={ index } ref={(input) => { this[`imgFigure${index}`] = input; }}
          arrange={ imgArrangeArr[index] } setCenter={ this.setCenter(index) } setInverse={ this.setInverse(index) } />
      );

      controllerUnits.push(
        <ControllerUnit key={index} />
      );
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