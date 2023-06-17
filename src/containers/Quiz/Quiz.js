import { Component } from 'react';
import cls from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import axios from '../../axios/axios-quiz';
import Loader from '../../components/UI/Loader/Loader';
import { connect } from 'react-redux';
import {
  fetchQuizById,
  quizAnswerClick,
  retryQuiz,
} from '../../store/actions/quiz';

class Quiz extends Component {
  // state = {
  //   results: {}, // {[id]: success | errorr}
  //   isFinished: false,
  //   activeQuestion: 0,
  //   answerState: null, // {[id]: 'success' | 'error'}
  //   quiz: [],
  //   loading: true,
  // };

  // onAnswerClickHandler = (answerId) => {
  // if (this.state.answerState) {
  //   const key = Object.keys(this.state.answerState)[0];
  //   if (this.state.answerState[key] === 'success') {
  //     return;
  //   }
  // }
  // //console.log('Answer id:', answerId);
  // const question = this.state.quiz[this.state.activeQuestion];
  // console.log(
  //   'this.state.quiz[this.state.activeQuestion]:',
  //   this.state.quiz[this.state.activeQuestion]
  // );
  // const results = this.state.results;
  // console.log('results:', results);
  // console.log('!results[question.id]:', results[question.id]);
  // if (question.rightAnswerId === answerId) {
  //   if (!results[question.id]) {
  //     results[question.id] = 'success';
  //   }
  //   this.setState({
  //     answerState: { [answerId]: 'success' },
  //     results: results,
  //   });
  //   const timeOut = window.setTimeout(() => {
  //     window.clearTimeout(timeOut);
  //     if (this.isQuizFinished()) {
  //       console.log('finished');
  //       this.setState({
  //         isFinished: true,
  //       });
  //     } else {
  //       this.setState({
  //         activeQuestion: this.state.activeQuestion + 1,
  //         answerState: null,
  //       });
  //     }
  //   }, 100);
  // } else {
  //   results[question.id] = 'error';
  //   this.setState({
  //     answerState: { [answerId]: 'error' },
  //     results: results,
  //   });
  // }
  // };

  // isQuizFinished() {
  //   return this.state.activeQuestion + 1 === this.state.quiz.length;
  // }

  // retryHanlder = () => {
  // this.setState({
  //   activeQuestion: 0,
  //   answerState: null,
  //   isFinished: false,
  //   results: {},
  // });
  // };

  componentDidMount() {
    this.props.fetchQuizById(this.props.match.params.id);
    // try {
    //   const response = await axios.get(
    //     `/quizes/${this.props.match.params.id}.json`
    //   );
    //   const quiz = response.data;
    //   this.setState({
    //     quiz,
    //     loading: false,
    //   });
    // } catch (error) {}
    // console.log('Quiz ID:', this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.retryQuiz();
  }

  render() {
    return (
      <div className={cls.Quiz}>
        <div className={cls.QuizWrapper}>
          <h1>Заполните все ответы</h1>

          {
            //Идеальный вариант чтоб понять что происходит когда так пишут.

            this.props.loading || !this.props.quiz ? (
              <Loader />
            ) : this.props.isFinished ? (
              <FinishedQuiz
                results={this.props.results}
                quiz={this.props.quiz}
                onRetry={this.props.retryQuiz}
              />
            ) : (
              <ActiveQuiz
                answers={this.props.quiz[this.props.activeQuestion].answers}
                question={this.props.quiz[this.props.activeQuestion].question}
                onAnswerClickHandler={this.props.quizAnswerClick}
                quizLength={this.props.quiz.length}
                answerNumber={this.props.activeQuestion + 1}
                state={this.props.answerState}
              />
            )
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    results: state.quiz.results, // {[id]: success | errorr}
    isFinished: state.quiz.isFinished,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState, // {[id]: 'success' | 'error'}
    quiz: state.quiz.quiz,
    loading: state.quiz.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizById: (id) => dispatch(fetchQuizById(id)),
    quizAnswerClick: (answerId) => dispatch(quizAnswerClick(answerId)),
    retryQuiz: () => dispatch(retryQuiz()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
