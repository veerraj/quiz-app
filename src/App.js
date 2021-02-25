import { Route, Switch } from 'react-router';
import './App.css';
import Home from './components/Home/Home';
import Quiz from './components/Quiz/Quiz';
import QuizForm from './components/QuizForm/QuizForm';
import Result from './components/Result/Result';
import StartQuiz from './components/StartQuiz/StartQuiz';
import Layout from './shared/Layout/Layout';


function App() {

  return (
    <div>
        <Layout/>
        <Switch>
           <Route path="/" exact component={Home}/>
           <Route path="/quiz" component={Quiz}/>
           <Route path="/start-quiz" component={StartQuiz}/>
           <Route path="/create-quiz" component={QuizForm}/>
           <Route path="/score" component={Result}/>
        </Switch>
    </div>
  );
}

export default App;
