<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-menu   mode="horizontal" >

                    <el-menu-item index="3"><a href="#" onclick="self.location='/member/'">回到用户后台>></a></el-menu-item>
                </el-menu>
            </el-col>
        </el-row>

        <div id="outbox">

            <el-row>
                <el-col :span="14" class="user_bg" >

                </el-col>
                <el-col :span="10"  >
                    <router-view></router-view>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<style>
     .user_bg{background: url("/images/bg_login.jpg") no-repeat;white-space: nowrap;height:500px;
         filter:alpha(opacity=70); -moz-opacity:0.7; -khtml-opacity: 0.7; opacity: 0.7;
     }
</style>
<script>

    export default{
        data(){
            return{

            }
        },
        components:{

        }
    }
</script>
