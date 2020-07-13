import {
    observable,
    action
} from 'mobx'

class Global {
    @observable activeKey = '1';
    @observable selectEmotion = {}
    @observable messageList = []
    @action.bound
    setActiveKey(val) {
        this.activeKey = val
    }
    @action.bound
    setSelectEmotion(data) {
        this.selectEmotion = Object.assign({},this.selectEmotion,data)
    }
    @action.bound
    updateMessage(message) {
        this.messageList.push(message)
    }
}
export default new Global()