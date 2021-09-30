import {
    observable,
    action,
    makeObservable
} from 'mobx'

class Chat {
    constructor() {
        makeObservable(this)
    }
    @observable selectEmotion = {}
    @observable messageList = []
    @action.bound
    setSelectEmotion(data) {
        this.selectEmotion = Object.assign({},this.selectEmotion,data)
    }
    @action.bound
    updateMessage(message) {
        this.messageList.push(message)
    }
    @action.bound
    setMessage(list) {
        this.messageList = list
    }
}
export default new Chat()