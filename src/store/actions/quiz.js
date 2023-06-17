import axios from '../../axios/axios-quiz';
import {
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZ_SUCCESS,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  QUIZ_RETRY,
  QUIZ_SET_STATE,
} from './actionTypes';

export function fetchQuizes() {
  return async (dispatch) => {
    dispatch(fetchQuizesStart());
    try {
      const response = await axios.get('/quizes.json');

      const quizes = [];

      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Тест #${index + 1}`,
        });
      });

      dispatch(fetchQuizesSuccess(quizes));
    } catch (e) {
      dispatch(fetchQuizesError(e));
    }
  };
}

export function fetchQuizById(quizId) {
  return async (dispatch) => {
    dispatch(fetchQuizesStart());

    try {
      const response = await axios.get(`/quizes/${quizId}.json`);
      const quiz = response.data;

      dispatch(fetchQuizSuccess(quiz));
      // this.setState({
      //   quiz,
      //   loading: false,
      // });
    } catch (e) {
      dispatch(fetchQuizesError(e));
    }
  };
}

export function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz: quiz,
  };
}

export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START,
  };
}

export function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes: quizes,
  };
}

export function fetchQuizesError(e) {
  return {
    type: FETCH_QUIZES_ERROR,
    error: e,
  };
}

export function finishQuiz() {
  return {
    type: FINISH_QUIZ,
  };
}

export function quizSetState(answerState, results) {
  return {
    type: QUIZ_SET_STATE,
    answerState: answerState,
    results: results,
  };
}

export function quizNextQuestuin(number) {
  return {
    type: QUIZ_NEXT_QUESTION,
    number: number,
  };
}

export function quizAnswerClick(answerId) {
  return (dispatch, getState) => {
    const state = getState().quiz;
    if (state.answerState) {
      const key = Object.keys(state.answerState)[0];
      if (state.answerState[key] === 'success') {
        return;
      }
    }
    const question = state.quiz[state.activeQuestion];
    console.log(
      'this.state.quiz[this.state.activeQuestion]:',
      state.quiz[state.activeQuestion]
    );
    const results = state.results;
    console.log('results:', results);
    console.log('!results[question.id]:', results[question.id]);
    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success';
      }

      dispatch(quizSetState({ [answerId]: 'success' }, results));
      // this.setState({
      //   answerState: { [answerId]: 'success' },
      //   results: results,
      // });
      const timeOut = window.setTimeout(() => {
        window.clearTimeout(timeOut);
        if (isQuizFinished(state)) {
          console.log('finished');

          dispatch(finishQuiz());
          // this.setState({
          //   isFinished: true,
          // });
        } else {
          dispatch(quizNextQuestuin(state.activeQuestion + 1));
          // this.setState({
          //   activeQuestion: state.activeQuestion + 1,
          //   answerState: null,
          // });
        }
      }, 100);
    } else {
      results[question.id] = 'error';
      dispatch(quizSetState({ [answerId]: 'error' }, results));
      // this.setState({
      //   answerState: { [answerId]: 'error' },
      //   results: results,
      // });
    }
  };
}

export function retryQuiz() {
  return {
    type: QUIZ_RETRY,
  };
}

function isQuizFinished(state) {
  return state.activeQuestion + 1 === state.quiz.length;
}
