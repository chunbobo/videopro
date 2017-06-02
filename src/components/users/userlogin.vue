<template>
    <div>
        <el-form :model="UserModel" :rules="rules"  ref="users" label-width="100px"  >
            <h3>用户登录</h3>
            <el-form-item label="用户名" prop="user_name">
                <el-input v-model="UserModel.user_name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="user_pass">
                <el-input v-model="UserModel.user_pass" type="password"></el-input>
            </el-form-item>
            <el-form-item   >
                <el-button type="primary" @click="UserLogin" >登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<style>
     h3{text-align: center}
</style>
<script>

    export default{

        mounted(){


        },
        data(){
            return{
                UserModel:{
                    user_name:"",
                    user_pass:""
                },
                rules: {  //规则都是实例，请大家自行更改为正则判断
                    user_name: [
                        { required: true, message: '用户名必填', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20个字符', trigger: 'blur' }
                    ],
                    user_pass: [
                        { required: true, message: '密码必填', trigger: 'blur' },
                        { min: 1, max: 30, message: '长度在 1 到 30个字符', trigger: 'blur' }
                    ],


                }
            }
        },
       methods:{
           UserLogin()
           {
               this.$refs["users"].validate(function(v){
                   if(v)
                   {
                        localStorage.setItem("CurrentUser",this.UserModel.user_name);
                       alert("用户登录成功 ");
                   }
                   else
                   {
                       alert("用户名密码必填")
                   }
               }.bind(this))
           }
       }
    }
</script>
