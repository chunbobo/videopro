<template>
    <div>
        <el-row class="outbox">
            <el-col :span="4">
                <membermenu></membermenu>
            </el-col>
            <el-col :span="20">
                <router-view></router-view>
            </el-col>
        </el-row>
    </div>
</template>

<style>
    .outbox{
        width:80%;
        margin:50px auto;
    }
</style>

<script>
    import membermenu from "./menu.vue"
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        components:{
            "membermenu":membermenu
        }
    }
</script>
