import {
    observable,
    computed
} from 'mobx';
import routes from '../router'

class Router {
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