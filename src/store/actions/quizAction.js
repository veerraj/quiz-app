import * as actionTypes from "./types"

export const createQuiz = (payload) => ({
    type: actionTypes.CREATE_QUIZ,
    payload
})

export const updateQuiz = (payload) => ({
    type: actionTypes.UPDATE_QUIZ,
    payload
})

export const deleteQuiz = (id) => ({
    type: actionTypes.DELETE_QUIZ,
    id
})

export const addResponse = (payload) =>({
    type: actionTypes.ADD_RESPONSE,
    payload
})

export const setResponse = (payload) => ({
     type:actionTypes.SET_QUIZ,
     payload
})