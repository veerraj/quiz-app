import * as actionTypes from "../actions/types";

const initialState = {
  quizs: [],
  quizResponse: [],
  quiz: null,
  user:null
};

const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USERNAME:
      return {
        ...state,
        user:action.payload
      }
    case actionTypes.CREATE_QUIZ:
      return {
        ...state,
        quizs: state.quizs.concat(action.payload),
      };
    case actionTypes.UPDATE_QUIZ:
      return {
        ...state,
        quizs: state.quizs.map((quiz) =>
           quiz.id === action.payload.id ? action.payload : quiz
        ),
      };
    case actionTypes.DELETE_QUIZ:
      return {
        ...state,
        quizs: state.quizs.filter((quiz) => quiz.id !== action.id),
      };
    case actionTypes.ADD_RESPONSE:
      return {
        ...state,
        quizResponse: action.payload,
      };
    case actionTypes.SET_QUIZ:
      return {
        ...state,
        quiz: action.payload,
      };
    default:
      return state;
  }
};

export default quizReducer;
