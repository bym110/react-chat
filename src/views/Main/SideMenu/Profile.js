import React from 'react';
import {Image} from "antd";
import './profile.less'
import {ManIcon, WomenIcon, MessageIcon, SendCardIcon} from "../../Icon";

function Profile(props) {
    return (
        <div className="profile">
            <div className="profile-title">
                <div>
                    <h2 className="profile-name">{props.info.name} {props.info.gender === 1? <ManIcon/>: <WomenIcon/>}</h2>
                    <p className="profile-account">
                        <label htmlFor="">账号：</label>
                        <span>{props.info.account}</span>
                    </p>
                </div>
                <Image style={{cursor: "pointer"}} shape="square" width={60} height={60} preview={{mask: ''}} src={props.info.avatar}/>
            </div>
            <div className="profile-extra">
                {
                    props.info.targetType === 2? ( <p className="profile-area">
                        <label htmlFor="">备注：</label>
                        <span>{props.info.remark}</span>
                    </p>): ''
                }
                <p className="profile-area">
                    <label htmlFor="">地区：</label>
                    <span>{props.info.region}</span>
                </p>
                {
                    props.info.targetType === 2? ( <p className="profile-area">
                        <label htmlFor="">来源：</label>
                        <span>{props.info.source}</span>
                    </p>): ''
                }
                <div className="profile-icons">
                    <SendCardIcon title="发送名片" style={{ fontSize: '32px', marginRight: '10px' }}/>
                    <MessageIcon title="发送消息" style={{ fontSize: '32px' }}/>
                </div>
            </div>

        </div>
    )
}

export default Profile