import { Component } from 'react';
import classes from './QuizList.module.css';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
class QuizList extends Component {
  renderQuizes() {
    return [1, 2, 3].map((quiz, index) => (
      <li key={index}>
        <NavLink to={`/quiz/${quiz}`}>Тест {quiz}</NavLink>
      </li>
    ));
  }
  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Список тестов</h1>
          <ul>{this.renderQuizes()}</ul>
        </div>
      </div>
    );
  }
}

export default QuizList;
