import React, { useState, useEffect } from 'react'
import { List, Avatar,Badge } from 'antd';
import $http from "../../../axios";
import {inject, observer} from "mobx-react";

function Recent(props) {
    const [active, setActive] = useState('');
    const [list, setList] = useState([]);
    const [flag, setFlag] = useState(false); // 标识数据请求完成
    const getData =async function () {
        const res = await $http.get('/api/chat/get/recentList');
        if (res.code === 0) {
            setList(res.data);
            setFlag(true);
        }
    }
    const getChatMsgList =async function (item) {
        let params = {
            total: item.total,
            name: item.name,
            target: item.target,
            avatar: item.avatar
        }
        if (item.target === 1) {
            params = {
                ...params,
                "region":item.region,
                "signature":item.signature,
                "gender": item.gender,
                "remark": item.remark,
                "account": item.account
            }
        }
        const res = await $http.post('/api/chat/get/chatMsgList', params);
        if (res.code === 0) {
            props.chat.setMessage(res.data)
        }
    }
    useEffect(function () {
        if (list.length) {
            handleClick(list[0], 0)
        } else {
            getData()
        }
    }, [flag]) // eslint-disable-line react-hooks/exhaustive-deps
    const handleClick = function (item, index) {
        if (item.unread) item.total = item.unread;
        setActive(index);
        props.global.setContactInfo(item);
        getChatMsgList(item);
        item.unread = 0;
    }
    return (
        <div className="contact-list">
            <List
                itemLayout="horizontal"
                dataSource={list}
                renderItem={(item, index) => (
                    <List.Item onClick={() => handleClick(item,index)} className={active === index? 'active': ''}>
                        <List.Item.Meta
                            avatar={
                                <Badge count={item.unread} size="small">
                                    <Avatar size={40} shape='square' src={item.avatar} />
                                </Badge>}
                            title={item.remark}
                            description={item.content}
                        />
                        <div className='showTime'>{item.ctime}</div>
                    </List.Item>
                )}
            />
        </div>
    )
}
export default inject('global', 'chat')(observer(Recent))
