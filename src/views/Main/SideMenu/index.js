import React from 'react'
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react';
import { Menu, Avatar, Popover } from 'antd';
import { Link } from 'react-router-dom'
import * as Icons from '../../Icon'
import {UserOutlined} from '@ant-design/icons'
import Profile from "./Profile";

function SideMenu(props) {
    const handleMenuChange = function ({key}) {
        props.router.setActive(key);
    }
    return (
        <div className="side-menu">
            <Popover
                content={<Profile />}
                title=""
                placement="rightTop"
                trigger="click"
                arrowPointAtCenter
            >
                <Avatar size={30} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
            </Popover>
            <Menu style={{width:50}}  onSelect={handleMenuChange} defaultSelectedKeys={props.router.defaultActive} selectedKeys={props.router.defaultActive}>
                {
                    props.router.currentRouter.defaultRouter.map(route=>{
                        return (
                            <Menu.Item key={route.path}>
                                <Link to={route.path}>
                                    {React.createElement(Icons[route.icon])}
                                </Link>
                            </Menu.Item>
                        )
                    })
                }
            </Menu>
        </div>
    )
}
export default inject('router')(observer(withRouter(SideMenu)))