import React from 'react';
import cls from './ActiveQuiz.module.css';
import AnswerList from './AnswerList/AnswerList';

const ActiveQuiz = ({
  answers,
  question,
  onAnswerClickHandler,
  quizLength,
  answerNumber,
  state,
}) => {
  return (
    <div className={cls.ActiveQuiz}>
      <p className={cls.Question}>
        <span>
          <strong>{answerNumber}.</strong>&nbsp; {question}
        </span>
        <small>
          {answerNumber} из {quizLength}
        </small>
      </p>
      <AnswerList
        onAnswerClickHandler={onAnswerClickHandler}
        answers={answers}
        state={state}
      />
    </div>
  );
};

export default ActiveQuiz;
