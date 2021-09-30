import {
    observable,
    action,
    makeObservable
} from 'mobx'

class Global {
    constructor() {
        makeObservable(this)
    }

    // 当前选择的联系人信息
    @observable contactInfo = {};
    // 设置当前选择的联系人信息
    @action.bound
    setContactInfo(info) {
        this.contactInfo = info;
    }
}
export default new Global()