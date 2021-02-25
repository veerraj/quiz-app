import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import quizReducer from "../store/reducers/quizReducer";
import { loadState, saveState} from './localStorage'


const persistedState = loadState();

const store = createStore(quizReducer, persistedState,composeWithDevTools());


store.subscribe(() => {
  saveState(store.getState());
})

export default store;
