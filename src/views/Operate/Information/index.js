import React, {useEffect, useState} from 'react';
import {inject, observer} from "mobx-react";
import {Image, Descriptions, Divider} from "antd";
import './style.less'
import {ManIcon, WomenIcon} from "../../Icon";
import $http from "../../../axios";

function Information(props) {
    const [memberList, setMemberList] = useState([]);
    useEffect(()=> {
        if (props.global.contactInfo.target === 2) {
            $http.get('/api/chat/get/memberList', {params: {total: props.global.contactInfo.member}}).then(res=> {
                if (res.code === 0) {
                    setMemberList(res.data)
                }
            })
        }
    }, [props.global.contactInfo])
    const Info = (p) => (
        <>
            <Image shape="square" width={50} height={50} src={p.avatar}/>
            <span style={{marginRight: '8px'}}>{p.name}</span>
            {p.gender === 1? <ManIcon/>: <WomenIcon/>}
        </>
    )
    const Member = (p)=> (
        <div className="memberList">
            {
                p.list.map(item=> (
                    <div className="listItem" key={item.id}>
                        <Image shape="square" width={40} height={40} src={item.avatar}/>
                        <div className="name">{item.name}</div>
                    </div>
                ))
            }
        </div>
    )
    return (
        <div className="information">
            {
                props.global.contactInfo.target === 1 ?
                    (<Descriptions column={1} title={<Info {...props.global.contactInfo} />}>
                        <Descriptions.Item>{<Divider/>}</Descriptions.Item>
                        <Descriptions.Item label="备注">{props.global.contactInfo.remark}</Descriptions.Item>
                        <Descriptions.Item label="地区">{props.global.contactInfo.region}</Descriptions.Item>
                        <Descriptions.Item label="账号">{props.global.contactInfo.account}</Descriptions.Item>
                    </Descriptions>) : (<Descriptions column={1} title={<Member list={memberList}/>}>
                            <Descriptions.Item>{<Divider/>}</Descriptions.Item>
                            <Descriptions.Item label="群名称">{props.global.contactInfo.name}</Descriptions.Item>
                            <Descriptions.Item label="群备注">{props.global.contactInfo.remark}</Descriptions.Item>
                            <Descriptions.Item label="群成员">{props.global.contactInfo.member}</Descriptions.Item>
                            <Descriptions.Item label="群公告">{props.global.contactInfo.note}</Descriptions.Item>
                        </Descriptions>)
            }
        </div>
    )
}

export default inject('global')(observer(Information))
