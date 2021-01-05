<template>
    <div>
        <div class="common">
            <div style="width:100%;box-sizing:border-box;padding:0 20px;flex-direction: row;align-items: center; margin-bottom: 15px;margin-top:15px;">
                <span class="search-title">关键字：</span>
                <el-input v-model="searchParam.searchKey" placeholder="请输入关键字" class="el-input-serach" clearable style="width:160px;"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="searchData" style="margin:0 20px">搜索</el-button>

            </div>
        </div>
        <div>
            <el-table :data="tableData.rows"
                      v-loading="loading"
                      element-loading-text="数据加载中..."
                      element-loading-spinner="el-icon-loading"
                      element-loading-background="rgba(0, 0, 0, 0.8)"
                      style="width: 100%" highlight-current-row ref="multipleTable">
                <el-table-column type="index"/>
                <el-table-column  label="问卷名称"  prop="title" ></el-table-column>
                <el-table-column  label="问卷总分"  prop="grade" ></el-table-column>
                <el-table-column  label="问卷提交时间"  prop="createdtime" ></el-table-column>
            </el-table>

            <div class="Rertop el-pagination">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="this.searchParam.pageIndex"
                        :page-sizes="[10,15,20,25]"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="this.tableData.total"></el-pagination>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: 'stGotGrade',
        components: {
        },
        data() {
            return {
                currentRow:null,
                visible:{
                    deleteConfirm:false,
                    addConfirm:false

                },
                tableData:{
                    total:0,
                    rows:[]
                },
                searchParam:{
                    pageIndex:1,
                    pageSize:10,
                    searchKey:'',
                    userId:''
                },
                options:{
                },

                formData:{
                    adminInfo:{
                        id:'',
                        name:'',

                    }},
            };
        },

        methods: {
            addRobot(){
                this.loading = true;
                let param = JSON.parse(JSON.stringify(this.formData.adminInfo));
                if(param.name == ''){
                    this.$message.error('请输入管理员名称');
                }
                this.$http.addOrUpdate(param).then(res =>{
                    this.loading = false;
                    if(res.code == 0){
                        this.$message.success('添加成功');
                        this.visible.addConfirm = false;
                        this.searchData();
                    } else {
                        this.$message.error(res.msg)
                    }
                }).catch((error)=>{
                    console.log(error);
                })
            },
            delAdmin(){
                this.$http.delUser({
                    id:this.currentRow.id
                }).then(res =>{
                    if(res.code == 0){
                        this.$message.success("操作成功");
                        this.visible.deleteConfirm = false;
                        this.searchData();
                    }
                    else{
                        this.$message.error(res.msg);
                    }
                })
            },
            addConfirm(){
                this.visible.addConfirm = true;
            },
            handleSizeChange(value) {
                this.searchParam.pageSize = value;
                this.searchData();
            },
            handleCurrentChange(value) {
                this.searchParam.pageIndex = value;
                this.searchData();
            },
            openDialog(row,dialogKey){
                this.currentRow = row;
                this.visible[dialogKey] = true;
            },
            searchData(){
                this.loading = true;
                let param = JSON.parse(JSON.stringify(this.searchParam));
                param.userId=window.localStorage.getItem('id')
                if(param.searchKey == ''){
                    delete param.searchKey;
                }
                this.$http.gradeStList(param).then(res =>{
                    this.loading = false;
                    if(res.code == 0){
                        this.tableData.rows = res.list;
                        console.log(res);
                        this.tableData.total = res.total;
                    }
                })
            }

        },
        created() {
            this.searchData()
        }
    };
</script>

<style scoped>
    .jx-btn{
        display: flex;
        width: 20px;
        height: 20px;
        align-items: center;
        justify-content: center;
        background: #FF5722;
        border-radius: 4px;
        color: #fff;
        transition: all 0.3s;
        cursor: pointer;
        margin-right:4px;
    }
</style>
