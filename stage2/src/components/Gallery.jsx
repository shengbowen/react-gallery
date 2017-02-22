import React from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';

import { actions } from 'actions/stage';
import ImageFigure from '../components/ImageFigure';

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

    const stage = {
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
    dispatch(actions.setCenter(0, imgArrangeArr, stage));
  }

  render() {
    const controllerUnits = [],
          imgFigures = [];

    const { imageDatas, imgArrangeArr, dispatch } = this.props;

    imageDatas.forEach((value, index) => {
      imgFigures.push(
        <ImageFigure data={ value } key={ index } ref={(input) => { this[`imgFigure${index}`] = input; }}
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