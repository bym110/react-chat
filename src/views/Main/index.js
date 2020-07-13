import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react';
import Header from './Header'
import SideMenu from './SideMenu'
import List from '../List'
import Chat from '../Chat'
import Operate from '../Operate'
import './main.less'

@inject('router')
@observer
class Main extends Component {
    render() {
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

    componentDidMount() {
        this.setDefault();
    }
    componentDidUpdate() {
        this.setDefault();
    }
    //设置侧边栏选中选项
    setDefault() {
                        console.log(this.props)
        if (this.props.location.pathname === '/') {
            this.props.history.push('/recent')
        }
        this.props.router.currentRouter.defaultRouter.forEach(route=>{
            if (this.props.location.pathname === route.path) {
                this.props.router.defaultActive = route.name
            }
        })

    }
}
export default withRouter(Main)