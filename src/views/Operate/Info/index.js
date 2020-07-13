import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';
import Information from './Information'
import './info.less'

@inject('global')
@observer
class Info extends Component {
    render() {
        return <Information />
    }
}
export default Info
