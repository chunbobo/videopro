/**
 * Created by Administrator on 2016/12/16.
 */

import Vue from "vue"
import Vuex from "vuex"
import ElmentUI from "element-ui"
import 'element-ui/lib/theme-default/index.css'
import "./../css/common.css"
import navbar from "./../components/member/navbar.vue"
import VueResource from "vue-resource"
import global from "./global.js"
Vue.use(global);
Vue.use(Vuex);
Vue.use(ElmentUI);
Vue.use(VueResource);

import ResModule from "./../store/modules/ResModule"    //应该资源模块
const vuex_config = new Vuex.Store({
    modules:{
        res:ResModule
    }
});

Vue.component("navbar",navbar);
new Vue({
    el:'.container',
    store:vuex_config
});