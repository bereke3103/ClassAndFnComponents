import AnswerItem from './AnswerItem/AnswerItem';
import cls from './AnswerList.module.css';

import React from 'react';

const AnswerList = ({ answers, onAnswerClickHandler, state }) => {
  return (
    <ul className={cls.AnswerList}>
      {answers.map((answer, index) => (
        <AnswerItem
          state={state ? state[answer.id] : null}
          onAnswerClickHandler={onAnswerClickHandler}
          key={index}
          answer={answer}
        />
      ))}
    </ul>
  );
};

export default AnswerList;
