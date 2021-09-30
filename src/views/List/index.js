import React, {useState} from 'react'
import { Route, Switch } from 'react-router-dom'
import { inject, observer } from 'mobx-react';
import { Input } from 'antd';
import { SearchIcon } from '../Icon'

function List(props) {
    const [searchText, setSearchText] = useState('');
    return (
        <div className='main-page-list'>
            <div className='main-page-top main-page-search'>
                <Input
                    placeholder="搜索姓名"
                    prefix={<SearchIcon />}
                    style={{ width: 200 }}
                    onChange={e=> setSearchText({searchText:e.target.value})}
                />
            </div>
            <div className='main-page-content'>
                <Switch>
                    {
                        props.router.currentRouter.defaultRouter.map(route=>(
                            <Route exact key={route.path} path={route.path} render = {props => (
                                <route.components.list { ...props } searchText={searchText} />
                            )} />
                        ))
                    }
                </Switch>
            </div>

        </div>
    )
}

export default inject('router')(observer(List))
