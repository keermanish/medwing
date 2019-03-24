import React from 'react';
import PropTypes from 'prop-types';

import './Button.css';

const Button = (props) => {
  return (
    <button className={props.variant} {...props}>{props.children}</button>
  )
};

Button.propTypes = {
  variant: PropTypes.string
};

Button.defaultProps = {
  variant: ''
};

export default Button;
