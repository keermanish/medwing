import React from 'react';
import PropTypes from 'prop-types';

import './Input.css';

const Input = (props) => {
  return (
    <div className="form-input">
      <label>
        <span>{props.label}</span>
        <input {...props} />
        {props.error && <span className="error">{props.error}</span> }
      </label>
    </div>
  )
};

Input.propTypes = {
  error: PropTypes.string,
  label: PropTypes.string
};

Input.defaultProps = {
  label: '',
  error: ''
};

export default Input;


