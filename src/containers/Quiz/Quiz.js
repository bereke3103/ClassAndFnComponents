import { Component } from 'react';
import cls from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import axios from '../../axios/axios-quiz'
import Loader from '../../components/UI/Loader/Loader';

class Quiz extends Component {
  state = {
    results: {}, // {[id]: success | errorr}
    isFinished: false,
    activeQuestion: 0,
    answerState: null, // {[id]: 'success' | 'error'}
    quiz: [
      // {
      //   id: 1,
      //   question: 'Какого цвета небо?',
      //   rightAnswerId: 2,
      //   answers: [
      //     { text: 'Черный', id: 1 },
      //     { text: 'Синий', id: 2 },
      //     { text: 'Красный', id: 3 },
      //     { text: 'Белый', id: 4 },
      //   ],
      // },
      // {
      //   id: 2,
      //   question: 'В каком году основали Санкт Петербург?',
      //   rightAnswerId: 4,
      //   answers: [
      //     { text: '1700', id: 1 },
      //     { text: '1702', id: 2 },
      //     { text: '1500', id: 3 },
      //     { text: '1703', id: 4 },
      //   ],
      // },
    ],
    loading: true
  };

  onAnswerClickHandler = (answerId) => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0];
      if (this.state.answerState[key] === 'success') {
        return;
      }
    }

    //console.log('Answer id:', answerId);

    const question = this.state.quiz[this.state.activeQuestion];
    console.log(
      'this.state.quiz[this.state.activeQuestion]:',
      this.state.quiz[this.state.activeQuestion]
    );
    const results = this.state.results;
    console.log('results:', results);
    console.log('!results[question.id]:', results[question.id]);
    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success';
      }
      this.setState({
        answerState: { [answerId]: 'success' },
        results: results,
      });
      const timeOut = window.setTimeout(() => {
        window.clearTimeout(timeOut);
        if (this.isQuizFinished()) {
          console.log('finished');
          this.setState({
            isFinished: true,
          });
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null,
          });
        }
      }, 100);
    } else {
      results[question.id] = 'error';
      this.setState({
        answerState: { [answerId]: 'error' },
        results: results,
      });
    }
  };

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  }

  retryHanlder = () => {
    this.setState({
      activeQuestion: 0,
      answerState: null,
      isFinished: false,
      results: {},
    });
  };

  async componentDidMount() {
    try {
      const response = await axios.get(`/quizes/${this.props.match.params.id}.json`)
      const quiz = response.data;
      this.setState({
        quiz, loading: false
      })
    } catch (error) {
      
    }
    console.log('Quiz ID:', this.props.match.params.id);
  }

  render() {
    return (
      <div className={cls.Quiz}>
        <div className={cls.QuizWrapper}>
          <h1>Заполните все ответы</h1>

          {

            //Идеальный вариант чтоб понять что происходит когда так пишут.

            this.state.loading ? <Loader/> : 



            this.state.isFinished ? (
              <FinishedQuiz
                results={this.state.results}
                quiz={this.state.quiz}
                onRetry={this.retryHanlder}
              />
            ) : (
              <ActiveQuiz
                answers={this.state.quiz[this.state.activeQuestion].answers}
                question={this.state.quiz[this.state.activeQuestion].question}
                onAnswerClickHandler={this.onAnswerClickHandler}
                quizLength={this.state.quiz.length}
                answerNumber={this.state.activeQuestion + 1}
                state={this.state.answerState}
              />
            )
          }

        </div>
      </div>
    );
  }
}
export default Quiz;
