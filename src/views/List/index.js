import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { inject, observer } from 'mobx-react';
import { Input } from 'antd';
import { SearchIcon } from '../Icon'

@inject('router')
@observer
class List extends Component {
    constructor(props) {
        super(props)
        this.state ={
            searchText: ''
        }
    }
    render() {
        return (
            <div className='main-page-list'>
                <div className='main-page-top main-page-search'>
                    <Input
                        placeholder="搜索姓名"
                        prefix={<SearchIcon />}
                        style={{ width: 200 }}
                        onChange={e=> this.setState({searchText:e.target.value})}
                    />
                </div>
                <div className='main-page-content'>
                    <Switch>
                        {
                            this.props.router.currentRouter.defaultRouter.map(route=>(
                                <Route exact key={route.path} path={route.path} render = {props => (
                                    <route.components.list { ...props } searchText={this.state.searchText} />
                                )} />
                            ))
                        }
                    </Switch>
                </div>

            </div>
        )
    }

}
export default List