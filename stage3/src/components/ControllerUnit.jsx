import React, { PropTypes } from 'react';

const ControllerUnit = ({ arrange, setInverse, setCenter }) => {
  let unitClass = 'controller-unit';

  if(arrange.isCenter) {
    unitClass += ' is-center';
  }

  if(arrange.isInverse) {
    unitClass += ' is-inverse';
  }

  const handleClick = (e) => {
    if(!arrange.isCenter) {
      setCenter();
    }else {
      setInverse();
    }
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <span className={ unitClass } onClick={ handleClick }></span>
  )
};

ControllerUnit.PropTypes = {
  arrange: PropTypes.shape({
    pos: PropTypes.object,
    rotate: PropTypes.number,
    isCenter: PropTypes.bool,
    isInverse: PropTypes.bool
  }),
  setInverse: PropTypes.func
};

export default ControllerUnit;