import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom'

@inject('router')
@observer
class SideMenu extends Component {
    render() {
        return (
            <div className="side-menu">
                <Menu style={{width:70}} defaultSelectedKeys={this.props.router.defaultActive} selectedKeys={this.props.router.defaultActive}>
                    {
                        this.props.router.currentRouter.defaultRouter.map(route=>{
                            return (
                                <Menu.Item key={route.name}>
                                    <Link to={route.path}>
                                        <img src={this.props.router.defaultActive === route.name?route.active:route.icon} alt=""/>
                                    </Link>
                                </Menu.Item>
                            )
                        })
                    }
                </Menu>
            </div>
        )
    }

}
export default SideMenu