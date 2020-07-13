import React, { Component } from 'react'
import { List, Avatar } from 'antd';

import InfiniteScroll from 'react-infinite-scroller';
import avatar from '../../../assets/images/avatar.svg'
import '../list.less'
class Recent extends Component {
    constructor(props) {
        super(props)
        this.state ={
            searchText:'',
            data:[
                {
                    name: '昵称',
                    content: '最近一条消息',
                    ctime: '2020-07-13'
                },
                {
                    name: '昵称1',
                    content: '最近一条消息1',
                    ctime: '2020-07-13'
                }
            ],
            loading: true,
            hasMore: true,
            active: 0
        }
    }
    handleClick(index) {
        this.setState({
            active: index
        })
    }
    componentDidMount() {
    }
    render() {
        return (
            <div className="recent-list">
                <List
                    itemLayout="horizontal"
                    dataSource={this.state.data}
                    renderItem={(item, index) => (
                        <List.Item onClick={() => this.handleClick(index)} className={this.state.active === index? 'active': ''}>
                            <List.Item.Meta
                                avatar={<Avatar size='large' shape='square' src={avatar} />}
                                title={<a href="https://ant.design">{item.name}</a>}
                                description={item.content}
                            />
                            <div className='showTime'>{item.ctime}</div>
                        </List.Item>
                    )}
                />
            </div>
        )
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(this.state.searchText)
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.searchText !== prevState.searchText) {
            return {
                searchText: nextProps.searchText
            }
        }
        return null
    }
}
export default Recent
