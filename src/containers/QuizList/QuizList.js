import { Component } from 'react';
import classes from './QuizList.module.css';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import axios from '../../axios/axios-quiz';
import Loader from '../../components/UI/Loader/Loader';
class QuizList extends Component {

  state = {
    quizes: [],
    loading: true
  }

  renderQuizes() {
    return this.state.quizes.map(quiz => (
      <li key={quiz.id}>
        <NavLink to={`/quiz/${quiz.id}`}>{quiz.name}</NavLink>
      </li>
    ));
  }

  async componentDidMount() {
    try {
      const response = await axios.get("/quizes.json");
      console.log(response.data)


      const quizes = []

      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Тест #${index + 1}`
        })
      })

      this.setState({
        quizes, loading: false
      })

    } catch (e) {
      console.log(e);
    }

  }

  render() {
    
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Список тестов</h1>
          {
            this.state.loading 
              ?<Loader/> 
              :<ul>{this.renderQuizes()}</ul>
          }
        </div>
      </div>
    );
  }
}

export default QuizList;
