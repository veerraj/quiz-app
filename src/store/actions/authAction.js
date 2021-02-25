import axios from 'axios';
import * as actionTypes from './types';

export const authStart = () => {
    return {
      type: actionTypes.AUTH_START,
    };
  };
  
  export const authFail = (error) => {
    return {
      type: actionTypes.AUTH_FAIL,
      error: error,
    };
  };

  export const tokenTimeout = (expiresIn) => {
    return (dispatch) => {
      setTimeout(() => {
        dispatch(loggedOut());
      }, expiresIn * 1000);
    };
  };


  export const loggedOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("userId");
    return {
      type: actionTypes.LOG_OUT,
    };
  }

  export const auth = (email, password, isSignUp) => {
    return (dispatch) => {
        console.log("hello i am from reducer");
      dispatch(authStart());
      const authData = {
        email: email,
        password: password,
        returnSecureToken: true,
      };
      let url =
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBj2o6gOPxYt3WMb9U8GoWkpOXczin68KM";
      if (!isSignUp) {
        url =
          "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBj2o6gOPxYt3WMb9U8GoWkpOXczin68KM";
      }
      axios
        .post(url, authData)
        .then((res) => {
          const expiresDate = new Date(
            new Date().getTime() + res.data.expiresIn * 1000
          );
          localStorage.setItem("token", res.data.idToken);
          localStorage.setItem("expirationDate", expiresDate);
          localStorage.setItem("userId", res.data.localId);
          dispatch(authSuccess(res.data.idToken, res.data.localId));
          dispatch(tokenTimeout(res.data.expiresIn));
        })
        .catch((error) => {
          dispatch(authFail(error.response.data.error));
        });
    };
  };
  
  export const setAuthRedirectPath = (path) => {
    return {
      type: actionTypes.SET_AUTH_REDIRECT,
      path: path,
    };
  };
  
  export const authCheckState = () => {
    return (dispatch) => {
      const token = localStorage.getItem("token");
      if (!token) {
        dispatch(loggedOut());
      } else {
        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        if (expirationDate <= new Date()) {
          dispatch(loggedOut());
        } else {
          const userId = localStorage.getItem("userId");
          dispatch(authSuccess(token, userId));
          dispatch(tokenTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
        }
      }
    };
  };
  

  export const authSuccess = (idToken, userId) => {
    return {
      type: actionTypes.AUTH_SUCCESS,
      idToken: idToken,
      userId: userId,
    };
  };