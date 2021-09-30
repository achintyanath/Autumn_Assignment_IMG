import logo from './logo.svg';
import './App.css';
import Login from "./components/Login";
import Project from "./components/Project";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Loginauth from './components/Loginauth';

function App() {
  return (
   
     <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/login">
            <Loginauth />
          </Route>
          <Route path="/project">
            <Project />
          </Route>
        </Switch>
    </Router>

  );
}

export default App;
