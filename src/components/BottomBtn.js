import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';

const BottomBtn = ({ text, colorClass, icon, onBtnClick }) => (
  <button
    onClick={onBtnClick}
    type="button"
    className={`btn btn-clock no-border ${colorClass}`}
  >
    <FontAwesomeIcon className="mr-2" size="lg" icon={icon} />
    {text}
  </button>
);

BottomBtn.propTypes = {
  text: PropTypes.string,
  colorClass: PropTypes.string,
  icon: PropTypes.element.isRequired,
  onBtnClick: PropTypes.func
};

BottomBtn.defaultProps = {
  title: '新建'
};

export default BottomBtn;
