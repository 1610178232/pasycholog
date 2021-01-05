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

                <el-table-column label="问卷标题"  prop="title" >
                    <template slot-scope="scope">
                        <span>{{scope.row.title}}</span>
                    </template>
                </el-table-column>

                <el-table-column  align="center"
                                  label="操作">
                    <template slot-scope="scope">
                        <div style="display: flex;flex-direction: row;justify-content: center;width: 100%;">
                            <el-tooltip content="删除" placement="top">
                                        <span class="jx-btn"  style="background:red;" @click="openDialog(scope.row,'deleteConfirm')">
                                            <i class="el-icon-delete"></i>
                                        </span>
                            </el-tooltip>
                            <el-tooltip content="详情" placement="top">
                                        <span class="jx-btn" style="background:#0d68c6;" @click="openDialog(scope.row,'infoConfirm')">
                                            <i class="el-icon-view"></i>
                                        </span>
                            </el-tooltip>

                        </div>
                    </template>
                </el-table-column>
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
            <!--================= 详情提示框 ==================-->
            <el-dialog
                    title="问卷详情"
                    :visible.sync="visible.infoConfirm"
                    width="35%">
                <el-form ref="form" :model="formData" label-width="100px">
                    <el-card :body-style="{ padding: '0px' }">
                            <div style="font-weight: bold;margin-left: 30%;font-size: 15px">{{this.formData.paperInfo.title}}</div>
                            <div style="margin-left: 70%;font-size: 12px">{{this.formData.paperInfo.createdtime}}</div>
                            <div v-for="(item,i) in this.formData.paperInfo.question" >
                                <div style="margin-top: 10px">{{i+1}}:{{item.question}}（）</div>
                                <div v-for="(ans,i) in item.answer" style="display: inline-block;">
                                <div style="margin-right: 50px;">{{i+1}}:{{ans.answer}}</div>
                                </div>
                            </div>
                    </el-card>

                </el-form>
                <span slot="footer" class="dialog-footer">
                        <el-button @click="visible.infoConfirm = false">取 消</el-button>
                        <el-button type="primary" @click="visible.infoConfirm = false">确 定</el-button>
                    </span>
            </el-dialog>
            <!--================= 删除提示框 ==================-->
            <el-dialog
                    title="提示"
                    :visible.sync="visible.deleteConfirm"
                    width="30%">
                <span style="font-size: 14px;color:#f00;margin-left: 32%">是否确认删除该张问卷？</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="visible.deleteConfirm = false">取 消</el-button>
                    <el-button type="primary" @click="delPaper">确 定</el-button>
                  </span>
            </el-dialog>

        </div>
    </div>
</template>

<script>
    export default {
        name: 'paperInfo',
        components: {
        },
        data() {
            return {
                currentRow:null,
                visible:{
                    deleteConfirm:false,
                    infoConfirm:false,

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
                    paperInfo:{
                        id:'',
                        title:'',
                        createdtime:'',
                        question:[]

                    }
                },
            };
        },

        methods: {
            delPaper(){
                this.$http.delPaper({
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
            info(){
                this.$http.paperInfo({
                    id:this.currentRow.id
                }).then(res =>{
                    if(res.code == 0){
                       console.log(res)
                        this.formData.paperInfo={
                            id:res.title.id,
                            title:res.title.title,
                            createdtime:res.title.createdtime,
                            question:res.list
                        }
                        console.log(this.formData.paperInfo)
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
                if("infoConfirm"==dialogKey){
                    this.info();
                }
            },
            searchData(){
                this.loading = true;
                this.searchParam.userId=window.localStorage.getItem('id');
                let param = JSON.parse(JSON.stringify(this.searchParam));
                if(param.searchKey == ''){
                    delete param.searchKey;
                }
                this.$http.paperList(param).then(res =>{
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

