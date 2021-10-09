import React from 'react';
import {inject, observer} from "mobx-react";
import { List, Avatar } from 'antd';

function ChatRecord(props) {
    return (
        <div style={{width: '400px', height: '450px', overflow: 'auto'}}>
            <List
                itemLayout="horizontal"
                dataSource={props.chat.messageList}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatar} />}
                            title={
                                <div style={{display: "flex", justifyContent: 'space-between'}}>
                                    <span>{item.name}</span>
                                    <span style={{fontSize: '12px', color: 'rgba(0, 0, 0, 0.45)'}}>{item.ctime}</span>
                                </div>
                            }
                            description={item.chatContent}
                        />
                    </List.Item>
                )}
            />
        </div>
    )
}

export default inject('chat')(observer(ChatRecord))