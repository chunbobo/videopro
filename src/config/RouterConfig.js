/**
 * Created by DELL on 2017/1/6.
 */
import VueRouter from "vue-router"
import memberindex from "./../components/member/index.vue"
import publish from "./../components/member/publish.vue"
import vlist from "./../components/member/vlist.vue"

export const routerConfig = new VueRouter({
    routes: [
        {path: '/',component: memberindex, name: 'memberindex',
            children:[
                {path:'/pub',component:publish,name:'pub'},
                {path:'/vlist',component:vlist,name:'vlist'}
            ]
        }
    ]
})