import React, {useEffect} from 'react'
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react';
import Header from './Header'
import SideMenu from './SideMenu'
import List from '../List'
import Chat from '../Chat'
import Operate from '../Operate'
import './main.less'

function Main(props) {
    useEffect(()=> {
        if (props.location.pathname === '/') {
            props.history.push('/recent')
        }
    })
    if (props.location.pathname === '/') {
        props.history.push('/recent')
    }
    props.router.setActive(props.location.pathname);
    return (
        <div className='main'>
            <Header />
            <div className='main-content'>
                <SideMenu />
                <div className='main-page'>
                    <List />
                    <Chat />

                    <Operate />
                </div>
            </div>

        </div>
    )
}

export default inject('router')(observer(withRouter(Main)))