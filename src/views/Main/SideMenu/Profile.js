import React from 'react';
import {Avatar } from "antd";
import {UserOutlined} from "@ant-design/icons";
import './profile.less'
import {ManIcon, WomenIcon, MessageIcon, SendCardIcon} from "../../Icon";

function Profile(props) {
    return (
        <div className="profile">
            <div className="profile-title">
                <div>
                    <h2 className="profile-name">无情的萨里曼 <ManIcon /></h2>
                    <p className="profile-account">
                        <label htmlFor="">微信号：</label>
                        <span>wx_198wenxinaccount</span>
                    </p>
                </div>
                <Avatar size={60} shape="square" style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
            </div>
            <div className="profile-extra">
                <p className="profile-area">
                    <label htmlFor="">地区：</label>
                    <span>北京 朝阳</span>
                </p>

                <div className="profile-icons">
                    <SendCardIcon title="发送名片" style={{ fontSize: '32px', marginRight: '10px' }}/>
                    <MessageIcon title="发送消息" style={{ fontSize: '32px' }}/>
                </div>
            </div>

        </div>
    )
}

export default Profile