import React, { Component } from 'react'
import {Route, Switch} from "react-router";
import { inject, observer } from 'mobx-react';
import './chat.less'

@inject('router')
@observer
class Chat extends Component {
    render() {
        return (
            <div className='main-page-chat'>
                <div className='main-page-top'>

                </div>
                <div className='main-page-content'>
                    <Switch>
                        {
                            this.props.router.currentRouter.defaultRouter.map(route=>(
                                <Route exact key={route.path} path={route.path} render = {props => (
                                    <route.components.chat { ...props } />
                                )} />
                            ))
                        }
                    </Switch>
                </div>

            </div>
        )
    }

}
export default Chat