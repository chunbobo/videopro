<template>
    <div>
        <el-menu theme="light" default-active="/" class="el-menu-demo" mode="horizontal" :router="true" >
            <el-menu-item :index="item.nav_url" v-for="item in this.$store.state.res.navbar">{{item.nav_text}}</el-menu-item>
        </el-menu>
    </div>
</template>

<style>
   
</style>

<script>
    export default{
        created(){
            this.$store.dispatch('loadData',{url:this.APIConfig.API_NavBar,key:"navbar"});
        }
    }
</script>
