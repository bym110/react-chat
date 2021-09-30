import React from 'react'
import {Route, Switch} from "react-router";
import { inject, observer } from 'mobx-react';
import { InformationIcon } from '../Icon'

function Operate(props) {
    return (
        <div className='main-page-info'>
            <div className='main-page-top'>
                <div className='main-page-top-title'>
                    <InformationIcon />
                    资料
                </div>
            </div>
            <div className='main-page-content'>
                <Switch>
                    {
                        props.router.currentRouter.defaultRouter.map(route=>(
                            <Route exact key={route.path} path={route.path} render = {props => (
                                <route.components.info { ...props } />
                            )} />
                        ))
                    }
                </Switch>
            </div>

        </div>
    )
}
export default inject('router', 'global')(observer(Operate))
