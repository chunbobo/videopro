/**
 * Created by DELL on 2017/1/4.
 */
import Vue from "vue"
export default{
    state:{
        navbar:[]
    },
    mutations:{
        setData(state,{key,data}){  //更改state的通用函数
            state[key] = data;
        }
    },
    actions:{
        loadData(context,{url,key}){    //param是一个对象函数，里面包含url(api地址)，属性名
            Vue.http.get(url).then((res) => {
                context.commit("setData",{key,data:res.body});
            }, (res) => {
                // error callback
                console.log('error');
            });
        }
    }
}