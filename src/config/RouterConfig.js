/**
 * Created by Administrator on 2017/1/3.
 */


import VueRouter from "vue-router";
import memberindex from "./../components/member/index.vue";
import vpublish from "./../components/member/publish.vue";
import vlist from "./../components/member/vlist.vue"

//以下为用户登录相关组件
import useraction from "./../components/users/useraction.vue";
import userlogin from   "./../components/users/userlogin.vue";
export  const routerConfig=new VueRouter({
    routes:[
        {path:"/",component:memberindex,name:"memberindex",
            children:[
                {path:"/pub",component:vpublish,name:"pub"},
                {path:"/vlist",component:vlist,name:"vlist"}
            ]
        }
    ]
});

//为用户登录/注册写的 路由配置 ，外部引入时 请引入routerConfig_users
export const routerConfig_users=new VueRouter({
    routes:[

        {path:"/",component:useraction,name:"useraction",children:[
            {path:'/', component:userlogin, name:"userlogin"}
        ]
        }
    ]
});