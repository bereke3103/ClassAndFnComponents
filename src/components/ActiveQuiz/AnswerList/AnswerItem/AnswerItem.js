import React from 'react';
import classes from './AnswerItem.module.css';
const AnswerItem = ({ answer, onAnswerClickHandler, state }) => {
  const cls = [classes.AnswerItem];
  if (state) {
    cls.push(classes[state]);
  }
  return (
    <li
      onClick={() => onAnswerClickHandler(answer.id)}
      className={cls.join(' ')}
    >
      {answer.text}
    </li>
  );
};

export default AnswerItem;
