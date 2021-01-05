<template>
    <div>
        <div class="common">
            <div style="width:100%;box-sizing:border-box;padding:0 20px;flex-direction: row;align-items: center; margin-bottom: 15px;margin-top:15px;">
                <span class="search-title">关键字：</span>
                <el-input v-model="searchParam.searchKey" placeholder="请输入关键字" class="el-input-serach" clearable style="width:160px;"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="searchData" style="margin:0 20px">搜索</el-button>
                <el-tooltip content="添加" placement="top">
                    <el-button type="primary" @click="addConfirm">添加</el-button>
                </el-tooltip>
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
                <el-table-column
                        label="头像"
                        prop="doorHeader">
                    <template slot-scope="scope">
                        <el-image
                                v-if="scope.row.img != null"
                                style="width:40px;"
                                :src="scope.row.img"
                                :preview-src-list="[scope.row.img]" >
                        </el-image>
                        <span v-else style="color:#ccc;">暂无</span>
                    </template>
                </el-table-column>
                <el-table-column label="管理员名称"  prop="content" >
                    <template slot-scope="scope">
                        <span>{{scope.row.name}}</span>
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
            <!--================= 添加提示框 ==================-->
            <el-dialog
                    title="添加管理员"
                    :visible.sync="visible.addConfirm"
                    width="30%">
                <el-form ref="form" :model="form" label-width="100px">
                    <el-form-item label="管理员名称：">
                        <el-input v-model="formData.adminInfo.name" placeholder="请输入管理员名称"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                        <el-button @click="visible.addConfirm = false">取 消</el-button>
                        <el-button type="primary" @click="addRobot">确 定</el-button>
                    </span>
            </el-dialog>
            <!--================= 删除提示框 ==================-->
            <el-dialog
                    title="提示"
                    :visible.sync="visible.deleteConfirm"
                    width="30%">
                <span style="font-size: 12px;color:#f00;">确认删除该管理员？</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="visible.deleteConfirm = false">取 消</el-button>
                    <el-button type="primary" @click="delAdmin">确 定</el-button>
                  </span>
            </el-dialog>

        </div>
    </div>
</template>

<script>
    export default {
        name: 'admin',
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
                    type:'管理员'
                },
                options:{
                },

                formData:{
                    adminInfo:{
                        id:'',
                        name:'',
                        type:'管理员'
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
                if(param.searchKey == ''){
                    delete param.searchKey;
                }
                this.$http.getUserInfo(param).then(res =>{
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
