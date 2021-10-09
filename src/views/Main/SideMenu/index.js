import React, {useEffect, useState} from 'react'
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react';
import { Menu, Avatar, Popover } from 'antd';
import { Link } from 'react-router-dom'
import * as Icons from '../../Icon'
import Profile from "./Profile";
import $http from "../../../axios";

function SideMenu(props) {
    const [userInfo, setUserInfo] = useState({});
    const handleMenuChange = function ({key}) {
        props.router.setActive(key);
    }
    const getUserInfo = function () {
        $http.post('/api/chat/get/userInfo', {account: sessionStorage.getItem('account')}).then(res=> {
            if (res.code === 0) {
                props.global.setUserInfo(res.data);
                setUserInfo(res.data)
            }

        })
    }
    useEffect(function () {
        getUserInfo()
    }, []) // eslint-disable-line
    return (
        <div className="side-menu">
            <Popover
                content={<Profile info={userInfo} />}
                title=""
                placement="rightTop"
                trigger="click"
                arrowPointAtCenter
            >
                <Avatar shape="square" size={30} style={{ backgroundColor: '#87d068' }} src={userInfo.avatar} />
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
export default inject('router', 'global')(observer(withRouter(SideMenu)))