import React from 'react'
import {UserOutlined, DownOutlined} from '@ant-design/icons'
import {Avatar, Dropdown, Menu} from "antd";
import { withRouter } from 'react-router-dom'

function Header(props) {
    const logout = function () {
        sessionStorage.clear();
        props.history.push('/login')
    }
    const menu = (
        <Menu onClick={logout}>
            <Menu.Item key="0">
                <span>退出</span>
            </Menu.Item>
        </Menu>
    );
    return (
        <div style={{
            height: '60px',
            backgroundColor: '#000',
            color: '#fff'
        }}>
            <div style={{
                width: '1200px',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                flexFlow: 'row-reverse',
                height: '100%'
            }}>
                <Dropdown overlay={menu} trigger={['click']}>
                    <span>
                        <Avatar size={30} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} /> <DownOutlined style={{color: '#fff'}} />
                    </span>
                </Dropdown>

            </div>
        </div>
    )
}
export default withRouter(Header)
