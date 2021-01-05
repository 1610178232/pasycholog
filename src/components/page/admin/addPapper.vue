<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix" style="width:100%;box-sizing:border-box;padding:0 20px;flex-direction: row;align-items: center; margin-bottom: 15px;margin-top:15px;">
            <span>添加问卷</span>
        </div>
        <el-form :model="formData" ref="productForm" label-width="130px" class="demo-ruleForm" style="background: #fff;padding:12px 0;" >
                <el-form-item label="问卷标题："style="width: 100%">
                    <el-row :gutter="24">
                        <el-col :span="8">
                            <el-input v-model="formData.paper.title" placeholder="请输入问卷标题"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <el-button type="primary" plain @click="addQuestion">添加问题</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
            <div v-for="(item,i) in this.formData.paper.question" >
                <el-form-item  label="问题："style="width:100%">
                    <el-row :gutter="24">
                        <el-col :span="8">
                            <el-input v-model="item.name"  placeholder="请输入问题"></el-input>
                        </el-col>
                        <el-col :span="2">
                            <el-button type="danger" icon="el-icon-delete" @click="del(i)"  circle></el-button>
                        </el-col>
                        <span style="color: #00d1b2">(选项可以不用填完)</span>
                    </el-row>
                    <div style="margin-top: 10px">
                        <span>选项1：</span>
                        <el-input v-model="item.answer1" style="width:300px;" placeholder="请输入问题答案选项"></el-input>
                        <el-input v-model="item.grade1"  style="width:60px;margin-left: 5px;margin-right: 6px" placeholder="分数">></el-input>
                        <span>选项2：</span>
                        <el-input v-model="item.answer2" style="width:300px;" placeholder="请输入问题答案选项"></el-input>
                        <el-input v-model="item.grade2"  style="width:60px;margin-left: 5px;margin-right: 6px" placeholder="分数">></el-input><br/>
                        <span>选项3：</span>
                        <el-input v-model="item.answer3" style="width:300px;" placeholder="请输入问题答案选项"></el-input>
                        <el-input v-model="item.grade3"  style="width:60px;margin-left: 5px;margin-right: 6px" placeholder="分数">></el-input>
                        <span>选项4：</span>
                        <el-input v-model="item.answer4" style="width:300px;" placeholder="请输入问题答案选项"></el-input>
                        <el-input v-model="item.grade4"  style="width:60px;margin-left: 5px;margin-right: 6px" placeholder="分数">></el-input>
                    </div>
                </el-form-item>

            </div>
            <el-form-item>
                <el-button type="primary" @click="addPaper">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
            </el-form>
    </el-card>

</template>

<script>
    export default {
        name: 'addPapper',
        data() {
            return{
                formData:{
                    paper:{
                        title:'',
                        question:[],
                    }
                },


            }
        },
        methods:{

            addQuestion(){
                this.formData.paper.question.push({name:'',grand:'',answer1:'',answer2:'',answer3:'',answer4:'',grade1:'',grade2:'',grade3:'',grade4:''});


            },
            del(i){
                this.formData.paper.question.splice(this.formData.paper.question[i],1);
            },
            addPaper(){
                console.log(this.formData.paper)
                let param = JSON.parse(JSON.stringify(this.formData.paper));
                if(param.title == ''){
                    this.$message.error('请输入问卷标题');
                }
                for(var i=0;i<this.formData.paper.question.length;i++){
                    var ques=this.formData.paper.question;
                    if(ques[i].name==''){
                        this.$message.error('请输入题目');
                    }
                    if(ques[i].answer1==''){
                        this.$message.error('请输入选项1');
                    }
                    if(ques[i].answer1!='' && ques[i].grade1==''){
                        this.$message.error('请输入选项1的分数');
                    }
                    if(ques[i].answer2!='' && ques[i].grade2==''){
                        this.$message.error('请输入选项2的分数');
                    }
                    if(ques[i].answer3!='' && ques[i].grade3==''){
                        this.$message.error('请输入选项3的分数');
                    }
                    if(ques[i].answer4!='' && ques[i].grade4==''){
                        this.$message.error('请输入选项4的分数');
                    }
                }
                this.$http.addPaper(param).then(res =>{
                    this.loading = false;
                    if(res.code == 0){
                        this.$message.success('添加成功');
                       this.formData.paper={
                           title:'',
                           question:[],
                       }
                        this.visible.addConfirm = false;
                    } else {
                        this.$message.error(res.msg)
                    }
                }).catch((error)=>{
                    console.log(error);
                })
            },

        }

    };
</script>

<style scoped>

</style>
