import Login from '../views/Login'
import Main from '../views/Main'
import Recent from '../views/List/Recent'
import Contact from '../views/List/Contact'
import Chat from '../views/Chat/ChatRoom'
import Detail from '../views/Chat/Detail'
import Info from '../views/Operate/Info'

const contact = require('../assets/images/contact.svg')
const contactActive = require('../assets/images/contactActive.svg')
const recent = require('../assets/images/recent.svg')
const recentActive = require('../assets/images/recentActive.svg')


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
                icon:recent,
                active:recentActive,
                components:{
                    list:Recent,
                    chat:Chat,
                    info:Info
                }
            },
            {
                name:'contact',
                path:'/contact',
                icon:contact,
                active:contactActive,
                components:{
                    list:Contact,
                    chat:Detail,
                    info:Info
                }
            }
        ]
    }
]

export default routes


