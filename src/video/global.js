/**
 * Created by DELL on 2016/12/22.
 */
import functions from "./functions"
import APIConfig from "./../config/APIconfig"
export default{
    install(Vue){
        Vue.prototype.functions = functions
        Vue.prototype.APIConfig = APIConfig
    }
}