/**
 * Created by DELL on 2017/1/4.
 */
import Vue from "vue"
export default{
    state:{

    },
    mutations:{

    },
    actions:{
        submitVideo(context, {url,video}){
            Vue.http.post(url,video).then((res)=>{
                if(res.body.status == 'success'){
                    alert('发布成功!')
                }
            },(res)=>{
                    alert('发布失败!')
            })
        }
        
    },
    getters:{

    }
}