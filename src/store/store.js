import { applyMiddleware, createStore,compose } from "redux";
import rootReducer from "../store/reducers/index";
import { loadState, saveState} from './localStorage'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedState = loadState();

const store = createStore(rootReducer, persistedState,
composeEnhancers(applyMiddleware(thunk)));


store.subscribe(() => {
  saveState(store.getState());
})

export default store;
