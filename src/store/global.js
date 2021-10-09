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
    // 个人信息信息
    @observable userInfo = {};
    // 设置当前选择的联系人信息
    @action.bound
    setContactInfo(info) {
        this.contactInfo = info;
    }
    @action.bound
    setUserInfo(info) {
        this.userInfo = info;
    }
}
export default new Global()