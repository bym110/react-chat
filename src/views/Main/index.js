import React, {useEffect} from 'react'
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react';
import Header from './Header'
import SideMenu from './SideMenu'
import List from '../List'
import Chat from '../Chat'
import Operate from '../Operate'
import './style.less'

function Main(props) {
    useEffect(()=> {
        if (props.location.pathname === '/') {
            if (sessionStorage.getItem('token')) {
                props.history.push('/recent')
            } else {
                props.history.push('/login')
            }

        }else if (props.location.pathname !== '/login' && !sessionStorage.getItem('token')) {
            props.history.push('/login')
        }
        props.router.setActive(props.location.pathname);
    }, [props.location.pathname]) // eslint-disable-line
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