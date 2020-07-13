import React, { Component } from 'react'
import { Upload,Popover } from 'antd';
import face from '../../../assets/images/face.svg'
import message from '../../../assets/images/message.svg'
import upload from '../../../assets/images/upload.svg'
import Emotion from './Emotion'
import nameList from './nameList'
import { inject, observer } from 'mobx-react';
import avatar from '../../../assets/images/avatar.svg'

@inject('global')
@observer
class ChatRoom extends Component {
    state={
        message:'',
        endOffset:0,
        offset:0,
    }
    render() {
        return (
            <div className="message">
                <div className="message-list" id="message_list">
                    {this.props.global.messageList.map((item,index)=>(
                        <div key={index} className={item.targetType === 1?'message-list-own':'message-list-other'}>
                            <img style={{float:item.targetType === 1?'right': 'left'}} src={avatar} alt=""/>
                            <div className='message-list-content' dangerouslySetInnerHTML={{__html:item.chatContent.replace(/\[[^\]]+\]/g,this.emotion)}}>

                            </div>
                        </div>
                    ))}
                </div>
                <div className="message-send">
                    <div className="message-send-icon">
                        <Popover
                            content={<Emotion emotion={this.handleEmotion}/>}
                            title=""
                            placement="topLeft"
                            trigger="click"
                            arrowPointAtCenter
                        >
                            <img src={ face } alt=""/>
                        </Popover>
                        <Upload showUploadList={false}>
                            <img src={ upload } alt=""/>
                        </Upload>
                        <Popover
                            content="11111"
                            title=""
                            arrowPointAtCenter
                            placement="topLeft"
                            trigger="click"
                        >
                            <img src={ message } alt=""/>
                        </Popover>

                    </div>
                    <div className="message-send-box">
                        <div
                            style={{'WebkitUserSelect':'auto'}}
                            id='messageSendBox'
                            className="message-send-box-input"
                            contentEditable="true"
                            dangerouslySetInnerHTML={{__html:this.state.message}}
                            onKeyDown={this.handlePress}
                            onClick={this.handleClick}
                        >

                        </div>
                    </div>

                </div>

            </div>
        )
    }
    handleEmotion=(name)=>{
        let message = document.querySelector('#messageSendBox').innerHTML
        var start  = message.substr(0,this.state.endOffset);
        var end  = message.substr(this.state.endOffset,message.length);
        message = start +this.emotion(name)+end;
        let endOffset =this.state.endOffset+ this.emotion(name).length+2;
        this.setState({
            message:message,
            endOffset:endOffset,
            offset:this.state.offset+1
        },()=>{
            document.querySelector('#messageSendBox').focus()
            let selection = getSelection();
            // 获取光标对象
            let range = selection.getRangeAt(0);
            console.log(range)
            console.log(this.state.offset,44444444444444)
            // 获取光标对象的范围界定对象，一般就是textNode对象
            let textNode = range.startContainer;
            if (textNode.id)
            // 添加了新内容，将光标移动到新的位置
            range.setStart(textNode, this.state.offset);

            // 将选区折叠为一个光标
            range.collapse(true);
            // 清除所有光标对象
            selection.removeAllRanges();
            //添加新的光标对象
            selection.addRange(range);
        })

    }
    handleClick=()=>{
        let range = window.getSelection().getRangeAt(0); //创建range
        let end = range.endOffset;
        let preElement = range.endContainer;
        let n =0
        if (!document.querySelector('#messageSendBox').innerHTML) {
            n=-1
        }
        if (preElement.previousSibling) {
            while(preElement.previousSibling){
                n++
                if(preElement.previousSibling.outerHTML){
                    end += preElement.previousSibling.outerHTML.length;
                }else{
                    end += preElement.previousSibling.textContent.length;
                }
                preElement = preElement.previousSibling;
            }
        }
        if (preElement.childNodes.length) {
            var s=0;
            for (let i = 0; i<end;i++) {
                if (preElement.childNodes[i] && preElement.childNodes[i].outerHTML) {
                    s+=preElement.childNodes[i].outerHTML.length;
                }else {
                    s+=preElement.childNodes[i].textContent.length;
                }
            }
            end =s;
        }
        this.setState({
            endOffset:end,
            offset:n+1
        })
    }
    // 将匹配结果替换表情图片
    emotion=(res)=> {
        let word = res.replace(/\[|\]/gi,'');
        let index = nameList.indexOf(word);
        if (index>= 0) {
            let obj = {}
            obj[index] = require(`./wx/${index}.png`)
            this.props.global.setSelectEmotion(obj)
            return `<img src=`+require(`./wx/${index}.png`)+` alt="${word}" align="middle">`
        } else {
            return ''
        }

    }
    sendMessage =()=>{
        const el = document.querySelector('#messageSendBox')
        const listEl = document.querySelector('#message_list')
        let message =el.innerHTML.replace(/<\s?img[^>]*>/gi,this.remotion)
        console.log(message)
        let obj ={
            chatContent:message,
            targetType:1
        }
        this.props.global.updateMessage(obj)
        el.innerHTML=''
        this.setState({
            offset:0,
            endOffset:0
        },()=>{
            listEl.scrollTop = listEl.scrollHeight - listEl.clientHeight;
        })
        setTimeout(()=>{
            let otherObj={
                chatContent:'你好！',
                targetType:2
            }
            this.props.global.updateMessage(otherObj)
            listEl.scrollTop = listEl.scrollHeight - listEl.clientHeight;
        },1000)
    }
    // 将图片换成表情文字
    remotion= (res)=> {
        let word
        res.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, (match, capture)=> {
            for (let key in this.props.global.selectEmotion) {
                if (capture === this.props.global.selectEmotion[key]) {
                    word = key
                }
            }
        });
        return `[${nameList[word]}]`
    }
    handlePress = (event)=> {// enter键发送消息
        if(event.keyCode === 13) {
           this.sendMessage()
            event.preventDefault(); // 阻止浏览器默认换行操作
            return false;
        }else {
            let preText = document.querySelector('#messageSendBox').innerHTML
            setTimeout(()=>{
                let nextText = document.querySelector('#messageSendBox').innerHTML
                if (preText !== nextText) {
                    this.handleChange(nextText)
                }
            },100)
        }

    }
    handleChange=(val)=>{
        let range = window.getSelection().getRangeAt(0); //创建range
        let end = range.endOffset;
        let preElement = range.endContainer;
        let n =0
        if (!val) {
            n=-1
        }
        if (preElement.previousSibling) {
            while(preElement.previousSibling){
                n++
                if(preElement.previousSibling.outerHTML){
                    end += preElement.previousSibling.outerHTML.length;
                }else{
                    end += preElement.previousSibling.textContent.length;
                }
                preElement = preElement.previousSibling;
            }
        }
        if (preElement.childNodes.length) {
            var s=0;
            for (let i = 0; i<end;i++) {
                if (preElement.childNodes[i] && preElement.childNodes[i].outerHTML) {
                    s+=preElement.childNodes[i].outerHTML.length;
                }else {
                    s+=preElement.childNodes[i].textContent.length;
                }
            }
            end =s;
        }
        console.log(n)
        this.setState({
            endOffset:end,
            offset:n+1
        })
    }
    componentDidMount() {

    }

}
export default ChatRoom
