import React from 'react'
import './style.less'
import {inject, observer} from "mobx-react";
import { Button, Divider, Image} from "antd";

function Detail(props) {
    return (
        <div className="detail">
            <div className="detail-info">
                <Image style={{cursor: "pointer"}} shape="square" width={80} height={80} preview={{mask: ''}} src={props.global.contactInfo.avatar}/>
                <div className="ant-list-item-meta-title">{props.global.contactInfo.name}</div>
                <div className="ant-list-item-meta-description">{props.global.contactInfo.signature}</div>
                <Divider/>
            </div>
            <Button type="primary" onClick={()=>props.history.push('/recent')} size="large">发消息</Button>
        </div>
    )
}
export default inject('global')(observer(Detail))