import React, { PropTypes } from 'react';
import { hashHistory } from 'react-router';

const EditButton = ({data}) => {

  const handleClick = (imageId) => {
    return (e) => {
      e.stopPropagation();
      const path = `/view/${imageId}`;
      hashHistory.push(path);
    }
  }

  return (
    <button className="img-figure__edit" onClick={ handleClick(data.id) }></button>
  )
}

EditButton.PropTypes = {

}

export default EditButton;