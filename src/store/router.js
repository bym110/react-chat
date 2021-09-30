import {
    observable,
    computed,
    action,
    makeObservable
} from 'mobx';
import routes from '../router'

class Router {
    constructor() {
        makeObservable(this)
    }
    @observable routerArr = routes;
    @observable routerPath = "/";

    @observable ADMIN_ROUTER = {
        //正常路由
        defaultRouter: [],
        //single路由
        singleRouter: []
    }
    //侧边栏默认选中
    @observable defaultActive = "recent"
    // 更新 defaultActive
    @action.bound
    setActive(path) {
        const filter = this.ADMIN_ROUTER.defaultRouter.filter(route=>path === route.path)
        this.defaultActive = filter.length? filter[0].path: 'recent';
    }
    @computed
    get currentRouter() {
        routes.forEach(item => {
            this.ADMIN_ROUTER.singleRouter.push(item)
            if (item.children) {
                this.ADMIN_ROUTER.defaultRouter = item.children
            }
        })
        return this.ADMIN_ROUTER
    }

}

export default new Router()