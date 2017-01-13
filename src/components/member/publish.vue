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
                    <el-form-item label="封面" prop="v_pic">
                        <el-upload
                                action="http://127.0.0.1:9090/index.php/video/upload"
                                type="drag"
                                :thumbnail-mode="true"
                                :on-success="handleSuccess"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"

                        >
                            <i class="el-icon-upload"></i>
                            <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
                            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-form-item>
                </el-form>
                <el-dialog title="预览图片" v-model="show_pic" size="tiny" class="Preview">
                        <img :src="v_pic.pic_url"/>
                </el-dialog>
            </el-col>
            <el-col :span="12">

            </el-col>
        </el-row>
    </div>
</template>

<style>
   h3{color:#5e6d82;margin-bottom: 10px}
   .Preview img{width:100%}

</style>

<script>
    export default{
        data(){
            return{
                video:{
                    v_title:'',
                    v_class:''
                },
                v_pic:{
                    pic_name:'',
                    pic_url:''
                },
                show_pic:false
            }
        },
        methods:{
            handleSuccess(res){    //成功
                if(res.status == 1){
                    this.v_pic.pic_name = res.name
                    this.v_pic.pic_url = res.url
                }else{
                    alert('上传失败')
                }
            },

            handlePreview(res){    //预览
                this.show_pic = true;
            },

            handleRemove(res){     //移除
                this.v_pic.v_pic.url="";
                this.v_pic.v_pic.name="";
            }
        },
        components:{
        }
    }
</script>
