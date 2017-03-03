/**
 * Created by Administrator on 2016/12/16.
 */

import Vue from "vue"



import "./../css/common.css"
import navbar from "./../components/member/navbar.vue"

require("qiniu-js/dist/qiniu.js");

import global from "./global.js"
Vue.use(global);
import Vuex from "vuex"
Vue.use(Vuex);
import ElmentUI from "element-ui"
Vue.use(ElmentUI);
import 'element-ui/lib/theme-default/index.css'
import VueResource from "vue-resource"
Vue.use(VueResource);
import VueRouter from "vue-router"
Vue.use(VueRouter);
import {routerConfig} from "./../config/RouterConfig"

import ResModule from "./../store/modules/ResModule"    //应该资源模块
import VideoModule from "./../store/modules/VideoModule"
const vuex_config = new Vuex.Store({
    modules:{
        res:ResModule,
        video:VideoModule
    }
});

Vue.component("navbar",navbar);
new Vue({
    el:'.container',
    store:vuex_config,
    router:routerConfig
});