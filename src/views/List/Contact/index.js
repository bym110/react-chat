import React, {useEffect, useState} from 'react'
import {Avatar, List, Collapse } from "antd";
import $http from "../../../axios";
import {inject, observer} from "mobx-react";

const { Panel } = Collapse;
function Contact(props) {
    const [active, setActive] = useState('');
    const [list, setList] = useState([]);
    const getData =async function () {
        const res = await $http.get('/api/chat/get/contactList');
        if (res.code === 0) {
            setList(res.data);
        }
    }
    useEffect(function () {
        getData()
    }, [])
    const handleClick = function (item, index) {
        setActive(index);
        props.global.setContactInfo(item);
    }
    return (
        <div className="contact-list">
            <Collapse defaultActiveKey="0" accordion={true}>
                {
                    list.map((item, index)=>(
                        <Panel header={item.title + '(' + item.total + ')'} key={index}>
                            <List
                                itemLayout="horizontal"
                                dataSource={item.list}
                                renderItem={(child, i) => (
                                    <List.Item onClick={() => handleClick(child,i)} className={active === i? 'active': ''}>
                                        <Avatar size={40} shape='square' src={child.avatar} />
                                        <span style={{marginLeft: '10px'}}>{child.name}</span>
                                    </List.Item>
                                )}
                            />
                        </Panel>
                    ))
                }
            </Collapse>

        </div>
    )
}
export default inject('global')(observer(Contact))