import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import DisplayHikes from './components/DisplayHikes';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Homepage} />
        <Route path="/getHikes" component={DisplayHikes} />
      </div>
    </Router>
  );
}

export default App;
