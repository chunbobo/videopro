<template>
    <div>
        <el-row>
            <el-col :span="12">
                <h3>视频基本信息</h3>
                <el-form :model="video" ref="videoForm1" :rules="rules" label-width="100px" class="demo-ruleForm">
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
                                name="Uploader[file]"
                        >
                            <i class="el-icon-upload"></i>
                            <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
                            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="简介">
                        <el-input
                                type="textarea"
                                :rows="4"
                                placeholder="请输入内容"
                                v-model="video.v_intr">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="上传视频">
                        <div id="videoContainer" v-if="!showVideoPercentage">
                            <el-button id="selectVideo" type="primary">选择视频<i class="el-icon-upload el-icon--right"></i></el-button>
                        </div>
                        <div class="progress" v-if="showVideoPercentage">
                            <el-progress :text-inside="true" :stroke-width="14" :percentage="videoPercentage" :status="videoStatus"></el-progress>
                            <img class="uploadstatus" :src="options.iconsrc" @click="pauseUpload">
                        </div>
                    </el-form-item>
                </el-form>
                <el-dialog title="预览图片" v-model="show_pic" size="tiny" class="Preview">
                        <img :src="video.v_pic.url"/>
                </el-dialog>
            </el-col>
            <el-col :span="12">
                <h3>选项</h3>
                <el-form :model="video" ref="videoForm2" :rules="rules" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="标签">
                        <input-tag :on-change="callbackMethod" :tags="video.v_tags" placeholder="输入标签按回车"></input-tag>
                    </el-form-item>
                    <el-form-item label="是否收费">
                        <el-radio class="radio" v-model="video.v_mode" label="free">免费</el-radio>
                        <el-radio class="radio" v-model="video.v_mode" label="pay">收费</el-radio>
                    </el-form-item>
                    <el-form-item label="收费金额" prop="v_money">
                        <el-input v-model.number="video.v_money" placeholder="输入0到500之间的正整数" v-bind:disabled="showMoneyText"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="danger" size="large" @click="submitVideo">发布视频</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<style>
   h3{color:#5e6d82;margin-bottom: 10px}
   .Preview img{width:100%}
   .progress{margin:5px}
   .uploadstatus{width:20px;cursor: pointer}
   .vue-input-tag-wrapper .new-tag{width:200px;}
</style>

<script>
    import InputTag from 'vue-input-tag'
    export default{
        mounted(){
            var myVue = this
            this.uploader = Qiniu.uploader({
                runtimes: 'html5,flash,html4',      // 上传模式，依次退化
                browse_button: 'selectVideo',         // 上传选择的点选按钮，必需
                // 在初始化时，uptoken，uptoken_url，uptoken_func三个参数中必须有一个被设置
                // 切如果提供了多个，其优先级为uptoken > uptoken_url > uptoken_func
                // 其中uptoken是直接提供上传凭证，uptoken_url是提供了获取上传凭证的地址，如果需要定制获取uptoken的过程则可以设置uptoken_func
                // uptoken : '<Your upload token>', // uptoken是上传凭证，由其他程序生成
                uptoken_url: 'http://127.0.0.1:9090/index.php/video/uptoken',         // Ajax请求uptoken的Url，强烈建议设置（服务端提供）
                // uptoken_func: function(file){    // 在需要获取uptoken时，该方法会被调用
                //    // do something
                //    return uptoken;
                // },
                get_new_uptoken: false,             // 设置上传文件的时候是否每次都重新获取新的uptoken
                // downtoken_url: '/downtoken',
                // Ajax请求downToken的Url，私有空间时使用，JS-SDK将向该地址POST文件的key和domain，服务端返回的JSON必须包含url字段，url值为该文件的下载地址
                // unique_names: true,              // 默认false，key为文件名。若开启该选项，JS-SDK会为每个文件自动生成key（文件名）
                save_key: true,                  // 默认false。若在服务端生成uptoken的上传策略中指定了sava_key，则开启，SDK在前端将不对key进行任何处理
                domain: 'videopro',     // bucket域名，下载资源时用到，必需
                container: 'videoContainer',             // 上传区域DOM ID，默认是browser_button的父元素
                max_file_size: '500mb',             // 最大文件体积限制
                flash_swf_url: '../plupload/Moxie.swf',  //引入flash，相对路径
                max_retries: 3,                     // 上传失败最大重试次数
                dragdrop: true,                     // 开启可拖曳上传
                drop_element: 'videoContainer',          // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
                chunk_size: '4mb',                  // 分块上传时，每块的体积
                auto_start: true,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
                //x_vars : {
                //    查看自定义变量
                //    'time' : function(up,file) {
                //        var time = (new Date()).getTime();
                          // do something with 'time'
                //        return time;
                //    },
                //    'size' : function(up,file) {
                //        var size = file.size;
                          // do something with 'size'
                //        return size;
                //    }
                //},
                filters: {
                    mime_types : [ //只允许上传视频
                        { title : "视频文件", extensions : "mp4" }
                    ],
                },
                init: {
                    'FilesAdded': function(up, files) {
                        plupload.each(files, function(file) {
                            // 文件添加进队列后，处理相关的事情
                        });
                    },
                    'BeforeUpload': function(up, file) {
                           // 每个文件上传前，处理相关的事情
                           myVue.showVideoPercentage = true;
                    },
                    'UploadProgress': function(up, file) {
                           // 每个文件上传时，处理相关的事情
                           myVue.videoPercentage = file.percent
                    },
                    'FileUploaded': function(up, file, info) {
                            myVue.videoStatus = 'success'
                            var res = eval("("+info+")")
                            myVue.video.v_videokey = res.key
                           // 每个文件上传成功后，处理相关的事情
                           // 其中info是文件上传成功后，服务端返回的json，形式如：
                           // {
                           //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
                           //    "key": "gogopher.jpg"
                           //  }
                           // 查看简单反馈
                           // var domain = up.getOption('domain');
                           // var res = parseJSON(info);
                           // var sourceLink = domain +"/"+ res.key; 获取上传成功后的文件的Url
                           //请大家仔细看这里。 一旦你设置视频回调，则  info 就不是上面的 hash和key 而是取决于你的回调地址输出的json内容
                            //var res = eval("("+info+")")
                            //myVue.video.v_videokey = res.key; //这一步需要设置，否则上传后获取不到值
                            //myVue.videoStatus = res.response
                    },
                    'Error': function(up, err, errTip) {
                           //上传出错时，处理相关的事情
                    },
                    'UploadComplete': function() {
                           //队列文件处理完毕后，处理相关的事情
                    },
                    'Key': function(up, file) {
                        // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                        // 该配置必须要在unique_names: false，save_key: false时才生效
                        var key = "";
                        // do something with key here
                        return key
                    },
                }
            });
        },
        data(){
            let checkMoney = (rule, value, callback) =>{
                if(/\d+/.test(value) && value >= 0 && value <= 500){
                    callback()
                }else{
                    callback(new Error('请输入0~500之间的数字'))
                }
            }
            return{
                uploader:null,
                video:{
                    v_title:'',
                    v_class:2,
                    v_pic:{
                        name:'',
                        url:'',
                        id:0
                    },
                    v_intr:'',
                    v_tags:[],
                    v_mode:'free',
                    v_money:0,
                    v_videokey:''
                },
                options: {
                    iconsrc:"/icons/pause.png",
                    uploadPause:'/icons/pause.png',
                    uploadStart:'/icons/start.png'
                },
                show_pic:false,
                videoPercentage:0,
                showVideoPercentage:false,
                videoStatus:'',
                rules: {
                    v_title: [
                        { required: true, message: '视频标题必填', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20个字符', trigger: 'blur' }
                    ],
                    v_intr: [
                        { required: true, message: '视频简介必填', trigger: 'blur' },
                        { min: 1, max: 30, message: '长度在 1 到 30个字符', trigger: 'blur' }
                    ],
                    v_money:[
                        { validator: checkMoney, trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            handleSuccess(res){    //成功
                if(res.status == 1){
                    this.video.v_pic.name = res.name
                    this.video.v_pic.url = res.url
                    this.video.v_pic.id = res.id
                }else{
                    alert('上传失败')
                }
            },

            handlePreview(res){    //预览
                this.show_pic = true;
            },

            handleRemove(res){     //移除
                this.video.v_pic.name=""
                this.video.v_pic.url=""
                this.video.v_pic.id=""
            },
            callbackMethod(res){
                //console.log(this.tagsArray)
            },
            pauseUpload(){
                if(this.options.iconsrc == this.options.uploadPause){
                    // 暂停
                    this.options.iconsrc = this.options.uploadStart
                    this.uploader.stop()
                }else{
                    // 开始
                    this.options.iconsrc = this.options.uploadPause
                    this.uploader.start()
                }
            },
            submitVideo(){
                this.$refs["videoForm1"].validate((v1) => {
                    if(v1){
                        this.$refs["videoForm2"].validate((v2) => {
                            if(v2){
                                //if(this.v_pic.pic_id == 0){
                                //    alert('请上传视频封面')
                                //}else{
                                    // 入库
                                    this.$store.dispatch("submitVideo",{url:this.APIConfig.API_SubmitVideo,video:this.video});
                                //}
                            }else{
                                alert('请完成表单')
                            }
                        })
                    }else{
                        alert('请完成表单')
                    }
                })
            }
        },
        computed:{
           showMoneyText(){
                if(this.video.v_mode=="free")
                {
                    this.video.v_money=0;
                    return true;
                }
               return false;
           }
        },
        components:{
            "input-tag":InputTag
        }
    }
</script>
