import React from 'react'
import {Route, Switch} from "react-router";
import { inject, observer } from 'mobx-react';
import './chat.less'

function Chat(props) {
    return (
        <div className='main-page-chat'>
            <div className='main-page-top'>
                {`${props.global.contactInfo.name}（${props.global.contactInfo.target === 1 ?props.global.contactInfo.remark : props.global.contactInfo.member}）`}
            </div>
            <div className='main-page-content'>
                <Switch>
                    {
                        props.router.currentRouter.defaultRouter.map(route=>(
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

export default inject('router', 'global')(observer(Chat))