import React from 'react'
import './style.less'
import {inject, observer} from "mobx-react";
import {Avatar, Button, Divider } from "antd";

function Detail(props) {
    return (
        <div className="detail">
            <div className="detail-info">
                <Avatar shape="square" size={80} src={props.global.contactInfo.avatar} />
                <div className="ant-list-item-meta-title">{props.global.contactInfo.name}</div>
                <div className="ant-list-item-meta-description">{props.global.contactInfo.signature}</div>
                <Divider/>
            </div>
            <Button type="primary" onClick={()=>props.history.push('/recent')} size="large">发消息</Button>
        </div>
    )
}
export default inject('global')(observer(Detail))