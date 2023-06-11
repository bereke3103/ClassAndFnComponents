import React from 'react';
import classes from './FinishedQuiz.module.css';
import { BiCommentError, BiBadgeCheck } from 'react-icons/bi';
import Button from '../UI/Button/Button';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
const FinishedQuiz = ({ results, quiz, onRetry }) => {
  const successCount = Object.keys(results).reduce((total, key) => {
    if (results[key] === 'success') {
      total++;
    }
    return total;
  }, 0);

  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        {quiz.map((quizItem, index) => (
          <li key={index}>
            <strong>{index + 1}</strong>.&nbsp;
            {quizItem.question}
            {results[quizItem.id] === 'error' ? (
              <BiCommentError className={classes.error} />
            ) : (
              <BiBadgeCheck className={classes.success} />
            )}
          </li>
        ))}
      </ul>

      <p>
        Правильно {successCount} из {quiz.length}
      </p>
      <div>
        <Button onClick={onRetry} type="primary">
          Повторить
        </Button>
        <Link to="/">
          <Button onClick={onRetry} type="success">
            Перейти в список тестов
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FinishedQuiz;
