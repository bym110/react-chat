import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { inject, observer } from 'mobx-react';
import './App.less'

function App(props) {
    return (
        <Router>
            <div className='App'>
                <Switch>
                    {props.router.currentRouter.singleRouter.map((item) => (
                        <Route exact key={item.path} path={item.path} component={item.component} />
                    ))}
                </Switch>
            </div>
        </Router>
    )
}

export default inject('router')(observer(App))
