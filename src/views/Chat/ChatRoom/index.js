import React, { useState, useEffect } from 'react'
import { Upload,Popover, notification, Avatar  } from 'antd';
import {FaceIcon, MessageIcon, UploadIcon} from "../../Icon";
import Emotion from './Emotion'
import nameList from './nameList'
import { inject, observer } from 'mobx-react';
import Profile from "../../Main/SideMenu/Profile";
import ChatRecord from "./ChatRecord";

function ChatRoom(props) {
    // 输入框的消息
    const [message, setMessage] = useState('');
    // 输入框的光标所在的结束偏移量
    const [endOffset, setEndOffset] = useState(0);
    // 光标所在的开始偏移量
    const [startOffset, setStartOffset] = useState(0);
    // 表情框的显示隐藏状态标识
    const [visible,setVisible] = useState(false);
    // 插入新表情的回调
    const handleEmotion=(name)=>{
        let curMessage = document.querySelector('#messageSendBox').innerHTML;
        // 截取光标之前的内容
        let start  = curMessage.substr(0,endOffset);
        // 光标之后的内容
        let end  = curMessage.substr(endOffset,curMessage.length);
        // 光标位置插入表情
        curMessage = start +emotion(name)+end;
        // 更新内容
        setMessage(curMessage);
        // 偏移量实时更新
        setEndOffset(endOffset+ emotion(name).length+2);
        setStartOffset(startOffset+1);
        // 数据更新成功标识
        setVisible(!visible);
    }
    // 点击输入框更改光标的位置
    const handleClick=()=>{
        let range = window.getSelection().getRangeAt(0); //创建range
        // 光标所在的偏移量
        let end = range.endOffset;
        // 获取点击的元素
        let preElement = range.endContainer;
        let n =0
        let messageBox = document.querySelector('#messageSendBox');
        if (preElement.previousSibling) { // 当点击的元素存在上一个元素时 当文本和表情同时存在时
            while(preElement.previousSibling){ // 遍历光标之前的所有元素 并计算长度
                n++ // 遍历的元素个数
                if(preElement.previousSibling.outerHTML){ // 文字表情都存在时并且preElement.previousSibling为表情img时取img的长度
                    end += preElement.previousSibling.outerHTML.length;
                }else{ // // preElement.previousSibling为textnode时取文本长度的长度
                    end += preElement.previousSibling.textContent.length;
                }
                preElement = preElement.previousSibling;
            }
            // 少一位补上
            n++;
        } else {
            if (messageBox.innerHTML) {
                const preStr = messageBox.innerHTML.substr(0,end);
                if (preStr.indexOf('<img') === -1) { // 当输入框光标之前不存在表情时 所有输入的文本时一个textNode
                    n = 1;
                } else {
                    n = end;
                }
            } else {
                n =0;
                end = 0;
            }
        }
        // 当preElement是输入框时候 当点击的位置不存在文本会取到输入框 直接计算光标之前的长度即可
        if (preElement.childNodes.length) {
            n = end;
            let s = 0;
            for (let i = 0; i<end;i++) {
                if (preElement.childNodes[i] && preElement.childNodes[i].outerHTML) {
                    s+=preElement.childNodes[i].outerHTML.length;
                }else {
                    s+=preElement.childNodes[i].textContent.length;
                }
            }
            end =s;
        }
        setEndOffset(end)
        setStartOffset(n);
    }
    // 将匹配结果替换表情图片
    function emotion(res) {
        let word = res.replace(/\[|\]/gi,'');
        let index = nameList.indexOf(word);
        if (index>= 0) {
            let obj = {}
            obj[index] = require(`./wx/${index}.png`).default;
            props.chat.setSelectEmotion(obj)
            return `<img src=`+require(`./wx/${index}.png`).default+` alt="${word}" >`
        } else {
            return ''
        }

    }
    const sendMessage =()=>{
        const el = document.querySelector('#messageSendBox')
        const msg =el.innerHTML.replace(/<\s?img[^>]*>/gi,remotion)
        if (!msg) {
            notification.warning({
                message: '不能发送空消息'
            });
            return
        }
        let obj ={
            chatContent:msg,
            targetType:1
        }
        props.chat.updateMessage(obj);
        el.innerHTML='';
        setStartOffset(0);
        setEndOffset(0)
        setTimeout(()=>{
            let otherObj={
                chatContent:'你好！',
                targetType:2
            }
            props.chat.updateMessage(otherObj)
        },1000)
    }
    // 将图片换成表情文字
    function remotion(res) {
        let word
        res.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, (match, capture)=> {
            for (let key in props.chat.selectEmotion) {
                if (capture === props.chat.selectEmotion[key]) {
                    word = key
                }
            }
        });
        return `[${nameList[word]}]`
    }
    const handlePress = (event)=> {// enter键发送消息
        if(event.keyCode === 13) {
            sendMessage()
            event.preventDefault(); // 阻止浏览器默认换行操作
            return false;
        }else {
            // 保证dom更新完之后
            setTimeout(()=>{
                handleClick()
            },100)
        }

    }
    // visible  表情弹出框弹出或消失时保证输入框始终获取焦点
    useEffect(function (p, v){
        document.querySelector('#messageSendBox').focus()
        let selection = getSelection();
        // 获取光标对象
        let range = selection.getRangeAt(0);
        // 获取光标对象的范围界定对象，一般就是textNode对象
        let textNode = range.startContainer;
        if (textNode.id)
            // 添加了新内容，将光标移动到新的位置
            range.setStart(textNode, startOffset);

        // 将选区折叠为一个光标
        range.collapse(true);
        // 清除所有光标对象
        selection.removeAllRanges();
        //添加新的光标对象
        selection.addRange(range);
    }, [visible]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(()=> {
        const listEl = document.querySelector('#message_list');
        listEl.scrollTop = listEl.scrollHeight - listEl.clientHeight;
    }, [props.chat.messageList.length])
    return (
        <div className="message">
            <div className="message-list" id="message_list">
                {props.chat.messageList.map((item,index)=>(
                    <div key={index} className={item.targetType === 1?'message-list-own':'message-list-other'}>
                        <Popover
                            content={<Profile info={item.targetType === 1 ? props.global.userInfo:item} />}
                            title=""
                            placement="rightTop"
                            trigger="click"
                            arrowPointAtCenter
                        >
                            <Avatar size={40} shape="square" src={item.targetType === 1? props.global.userInfo.avatar:item.avatar} style={{cursor: 'pointer', float:item.targetType === 1?'right': 'left'}} />
                        </Popover>
                        <div className='message-list-content' dangerouslySetInnerHTML={{__html:item.chatContent.replace(/\[[^\]]+\]/g,emotion)}} />
                    </div>
                ))}
            </div>
            <div className="message-send">
                <div className="message-send-icon">
                    <Popover
                        content={<Emotion emotion={handleEmotion}/>}
                        title=""
                        placement="topLeft"
                        trigger="click"
                        arrowPointAtCenter
                        visible={visible}
                        onVisibleChange={()=> setVisible(!visible)}
                    >
                        <FaceIcon style={{fontSize:'20px'}} />
                    </Popover>
                    <Upload showUploadList={false}>
                        <UploadIcon style={{fontSize:'20px'}}/>
                    </Upload>
                    <Popover
                        content={<ChatRecord/>}
                        title=""
                        arrowPointAtCenter
                        placement="topLeft"
                        trigger="click"
                    >
                        <MessageIcon title="消息记录" style={{fontSize:'20px'}}/>
                    </Popover>

                </div>
                <div className="message-send-box">
                    <div
                        style={{'WebkitUserSelect':'auto'}}
                        id='messageSendBox'
                        className="message-send-box-input"
                        contentEditable="true"
                        dangerouslySetInnerHTML={{__html:message}}
                        onKeyDown={handlePress}
                        onClick={handleClick}
                    >

                    </div>
                </div>

            </div>

        </div>
    )
}

export default inject('chat', 'global')(observer(ChatRoom))
