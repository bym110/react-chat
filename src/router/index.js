import Login from '../views/Login'
import Main from '../views/Main'
import Recent from '../views/List/Recent'
import Contact from '../views/List/Contact'
import Chat from '../views/Chat/ChatRoom'
import Detail from '../views/Chat/Detail'
import Information from '../views/Operate/Information'


const routes = [
    {
        name:'login',
        path:'/login',
        component:Login
    },
    {
        name:'main',
        path:'',
        component:Main,
        children:[
            {
                name:'recent',
                path:'/recent',
                icon:'Recent',
                components:{
                    list:Recent,
                    chat:Chat,
                    info:Information
                }
            },
            {
                name:'contact',
                path:'/contact',
                icon:'Contact',
                components:{
                    list:Contact,
                    chat:Detail,
                    info:Information
                }
            }
        ]
    }
]

export default routes


