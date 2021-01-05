<template>
    <el-tabs v-model="activeName" @tab-click="tabClick" >
        <el-tab-pane label="个人信息" name="first">
    <el-card class="box-card">

        <el-form :model="formData" ref="productForm" label-width="130px" class="demo-ruleForm" style="background: #fff;padding:0px 0;" >
            <el-row class="demo-avatar demo-basic">
                <el-col :span="24">
                    <div class="demo-basic--circle" style="margin-left: 1%">
                        <div v-if="formData.userInfo.img != null" class="block"><el-avatar :size="77" :src="formData.userInfo.img"></el-avatar></div>
                        <div v-if="formData.userInfo.img == null" class="block"><el-avatar :size="77" :src="circleUrl"></el-avatar></div>
                    </div>
                    <div style="margin-left: 1%;margin-top: 20px;font-weight: bolder">
                        <div class="info">用户名：{{formData.userInfo.name}}</div>
                        <div class="info">班级：{{formData.userInfo.userClass}}</div>
                        <div class="info">电话：{{formData.userInfo.mobile}}</div>
                        <div class="info">分院：{{formData.userInfo.yard}}</div>
                    </div>
                </el-col>
            </el-row>
            <el-button type="primary" style="margin-top: 10px;margin-left: 10px" @click="goUpdate">去修改</el-button>
        </el-form>
    </el-card>
        </el-tab-pane>
        <el-tab-pane label="修改信息" name="second">
            <el-card class="box-card">

            <el-form :model="formData" ref="productForm" label-width="130px" class="demo-ruleForm" style="background: #fff;padding:0px 0;" >
                <el-form-item label="头像：">
                <el-upload
                        action="http://localhost:8080/apis/user/uploadFile"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                        :on-success="infoImgSuccess">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
                </el-form-item>
                <el-form-item label="用户名：">
                    <el-input v-model="formData.userInfo.name" ></el-input>
                </el-form-item>
                <el-form-item label="电话：">
                    <el-input v-model="formData.userInfo.mobile" ></el-input>
                </el-form-item>
                <el-form-item label="班级：">
                    <el-input v-model="formData.userInfo.userClass" ></el-input>
                </el-form-item>
                <el-form-item label="分院：">
                    <el-input v-model="formData.userInfo.yard" ></el-input>
                </el-form-item>
            </el-form>
                <el-button type="primary" style="margin-top: 10px;margin-left: 70px" @click="update">提交</el-button>
            </el-card>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    export default {
        name: 'stMyInfo',
        data() {
            return{
                activeName: 'first',
                dialogVisible: false,
                circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
                formData:{
                    userInfo:{
                        id:'',
                        name:'',
                        img:'',
                        userClass:'',
                        yard:'',
                        mobile:''
                    }
                },


            }
        },
        methods:{
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.formData.userInfo.img = file.url;
                this.dialogVisible = true;
            },
            infoImgSuccess(res, file) {
                console.log(res);
                if(res.code == 0){
                    this.formData.userInfo.img = res.filePath;
                }
            },
            tabClick(target){
                let name = target.name;
                if(name == 'second'){
                    this.getUser();
                }
            },
            goUpdate(){

                this.activeName = 'second';
            },
            getUser(){
                this.loading = true;
                this.$http.getUser({id:window.localStorage.getItem('id')}).then(res =>{
                    this.loading = false;
                    if(res.code == 0){
                        this.formData.userInfo.img=res.user.img;
                        this.formData.userInfo.name=res.user.name;
                        this.formData.userInfo.id=res.user.id;
                        this.formData.userInfo.userClass=res.user.userClass;
                        this.formData.userInfo.yard=res.user.yard;
                        this.formData.userInfo.mobile=res.user.mobile;
                        window.localStorage.setItem('img', res.user.img);
                        console.log(res)
                    }
                })
            },
            update(){
                this.loading = true;
                this.$http.addOrUpdate(this.formData.userInfo).then(res =>{
                    this.loading = false;
                    if(res.code == 0){
                        this.$message.success("修改成功")
                        this.activeName = 'first';
                    }else{
                        this.$message.error("修改失败")
                    }
                })
            }
        },
        created() {
            this.getUser()
        }
    };
</script>

<style scoped>
.info{
    margin-bottom: 15px;
}


</style>
