import React,{ Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { inject, observer } from 'mobx-react';
import './App.less'
@inject('router')
@observer
class App extends Component {
    render() {
      return (
          <Router>
              <div className='App'>
                  <Switch>
                    {this.props.router.currentRouter.singleRouter.map((item) => (
                        <Route exact key={item.path} path={item.path} component={item.component} />
                    ))}
                  </Switch>
              </div>
          </Router>
      )
    }

}

export default App;
