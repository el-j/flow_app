import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Flow from './Flow';
import Menu from './Menu';
import './App.css';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="app">
          <Switch>
            <Route path="/flow" component={Flow} />
            <Route component={Menu} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default App;
