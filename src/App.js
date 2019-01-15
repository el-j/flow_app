import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import DemoOne from './demos/DemoOne';
import DemoTwo from './demos/DemoTwo';
import DemoThree from './demos/DemoThree';
import DemoFour from './demos/DemoFour';
import DemoFive from './demos/DemoFive';
import DemoSix from './demos/DemoSix';
import DemoSeven from './demos/DemoSeven';
import Flow from './Flow';
import Menu from './Menu';
import './App.css';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="app">
          <Switch>
            <Route path="/demo1" component={DemoOne} />
            <Route path="/demo2" component={DemoTwo} />
            <Route path="/demo3" component={DemoThree} />
            <Route path="/demo4" component={DemoFour} />
            <Route path="/demo5" component={DemoFive} />
            <Route path="/demo6" component={DemoSix} />
            <Route path="/demo7" component={DemoSeven} />
            <Route path="/flow" component={Flow} />
            <Route component={Menu} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default App;
