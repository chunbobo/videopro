<template>
    <div>
        <el-menu theme="light" default-active="1" class="el-menu-demo" mode="horizontal">
            <el-menu-item index="1">处理中心</el-menu-item>
            <el-menu-item index="3">订单管理</el-menu-item>
        </el-menu>
    </div>
</template>

<style>
   
</style>

<script>
    export default{
        created(){
            console.log(this.APIConfig.API_NavBar)
        }
    }
</script>
