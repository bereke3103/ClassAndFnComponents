import React from 'react';
import classes from './Button.module.css';
const Button = ({ type, children, onClick, disabled }) => {
  const cls = [classes.Button, classes[type]];

  return (
    <button onClick={onClick} disabled={disabled} className={cls.join(' ')}>
      {children}
    </button>
  );
};

export default Button;
