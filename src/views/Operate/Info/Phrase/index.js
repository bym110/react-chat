import React,{ Component } from 'react'
import { Input,Collapse } from "antd";
import { SearchIcon,ArrowRightIcon } from '../../../Icon'

const { Panel } = Collapse;
class Phrase extends Component {
    render() {
        return (
            <div className='phrase'>
                <div className='phrase-title'><a href='javacript:;'>公共常用语</a></div>
                <div className='phrase-search'>
                    <Input
                        placeholder="搜索常用语"
                        prefix={<SearchIcon />}
                        style={{ width: '100%' }}
                        onChange={e=> console.log(e)}
                    />
                </div>
                <div className='phrase-list'>
                    <Collapse
                        bordered={false}
                        expandIcon={({ isActive }) => <ArrowRightIcon style={{transition:'.2s',transform:isActive?'rotate(90deg)':'rotate(0)'}} />}
                        className="site-collapse-custom-collapse"
                    >
                        <Panel header="This is panel header 1" key="1" className="site-collapse-custom-panel">
                            <p>11</p>
                        </Panel>
                        <Panel header="This is panel header 2" key="2" className="site-collapse-custom-panel">
                            <p>22</p>
                        </Panel>
                        <Panel header="This is panel header 3" key="3" className="site-collapse-custom-panel">
                            <p>333</p>
                        </Panel>
                    </Collapse>
                </div>
            </div>
        )
    }

}

export default Phrase