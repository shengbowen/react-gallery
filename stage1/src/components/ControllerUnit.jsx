import React from 'react';

class ControllerUnit extends React.PureComponent {

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    if(!this.props.arrange.isCenter) {
      this.props.setCenter();
    }else {
      this.props.inverse();
    }

    e.stopPropagation();
    e.preventDefault();
  }

  render() {
    let unitClass = 'controller-unit';

    if(this.props.arrange.isCenter) {
      unitClass += ' is-center';
    }

    if(this.props.arrange.isInverse) {
      unitClass += ' is-inverse';
    }

    return (
      <span className={unitClass} onClick={ this.handleClick }></span>
    )
  }
}

export default ControllerUnit;