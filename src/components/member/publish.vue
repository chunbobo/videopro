<template>
    <div>
        <el-row>
            <el-col :span="12">
                <h3>视频基本信息</h3>
                <el-form :model="video" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="视频标题" prop="v_title">
                        <el-input v-model="video.v_title" placeholder="请填写视频标题"></el-input>
                    </el-form-item>
                    <el-form-item label="视频分类" prop="v_class">
                        <el-select v-model="video.v_class" placeholder="请选择">
                            <el-option
                                    v-for = "item in this.$store.getters.navForVideoClass"
                                    v-bind:label = "item.nav_text"
                                    v-bind:value = "item.nav_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="12">

            </el-col>
        </el-row>
    </div>
</template>

<style>
   h3{color:#5e6d82;margin-bottom: 10px}
</style>

<script>
    export default{
        data(){
            return{
                video:{
                    v_title:'',
                    v_class:''
                }
            }
        },
        components:{
        }
    }
</script>
