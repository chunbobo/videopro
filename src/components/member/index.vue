<template>
    <div>
        <el-row>
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
