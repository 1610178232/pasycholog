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
                <el-table-column  label="姓名"  prop="name" ></el-table-column>
                <el-table-column  label="咨询内容"
                                  prop="statusVerify">
                    <template slot-scope="scope">
                        <span style="color:#ccc;" v-if="scope.row.content == null" type="danger">暂无</span>
                        <span v-else >{{scope.row.content}}</span>
                    </template>
                </el-table-column>
                <el-table-column  label="咨询时间"
                                  prop="statusVerify">
                    <template slot-scope="scope">
                        <span style="color:#ccc;" v-if="scope.row.createdtime == null" type="danger">暂无</span>
                        <span v-else >{{scope.row.createdtime}}</span>
                    </template>
                </el-table-column>
                <el-table-column  label="状态"
                                  prop="statusVerify">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.status == 0 && scope.row.to_id == myId" type="danger">待回复</el-tag>
                        <el-tag v-else-if="scope.row.status == 0 && scope.row.from_id == myId" type="success">已回复</el-tag>
                        <el-tag v-else-if="scope.row.status == 1 " type="success">已回复</el-tag>
                        <el-tag v-else >暂未咨询</el-tag>
                    </template>
                </el-table-column>
                <el-table-column  align="center"
                                  label="操作">
                    <template slot-scope="scope">
                        <div style="display: flex;flex-direction: row;justify-content: center;width: 100%;">
                            <el-tooltip v-if="scope.row.status!=null" content="回复" placement="top">
                                        <span class="jx-btn" style="background:#125d97;" @click="openDialog(scope.row,'deleteConfirm')">
                                            <i class="el-icon-s-promotion"></i>
                                        </span>
                            </el-tooltip>
                            <el-tooltip v-if="scope.row.status==null" content="去咨询" placement="top">
                                        <span class="jx-btn" style="background:#125d97;" @click="openDialog(scope.row,'deleteConfirm')">
                                            <i class="el-icon-s-promotion"></i>
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
            <!--================= 聊天提示框 ==================-->
            <el-dialog
                    title="聊天"
                    :visible.sync="visible.deleteConfirm"
                    width="36%">
                <div class="wrapper">
                    <JwChat-index
                            :config="this.config"
                            :taleList="list"
                            @enter="bindEnter"
                            v-model="inputMsg"
                            :showRightBox='true'
                            scrollType="scroll"
                            @clickTalk="talkEvent"
                    >

                    </JwChat-index>
                </div>

            </el-dialog>


        </div>
    </div>
</template>

<script>
    export default {
        name: 'bgStCounsel',
        components: {
        },
        data() {
            return {
                num: 5000,
                inputMsg: '',
                list: [],
                config:{
                    name:'',
                    img:''
                },
                myId:'',
                user:{
                    id:'',
                    img:'',
                    name:'',
                    createdtime:'',
                    content:'',
                    fromId:'',
                    toId:''
                },
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
                        name:''
                    }},
            };
        },

        methods: {

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
                if("deleteConfirm"==dialogKey){
                    this.getRecord();
                    this.getUser();
                    this.user.id=row.id;
                }
            },
            searchData(){
                this.loading = true;
                let param = JSON.parse(JSON.stringify(this.searchParam));
                if(param.searchKey == ''){
                    delete param.searchKey;
                }
                param.userId=window.localStorage.getItem('id');
                this.$http.stUserList(param).then(res =>{
                    this.loading = false;
                    if(res.code == 0){
                        console.log(res)
                        this.tableData.rows = res.list;
                        this.tableData.total = res.total;
                        this.myId=window.localStorage.getItem('id');
                    }
                })
            },

            talkEvent (play) {
                console.log(play)
            },
            bindEnter () {
                const msg = this.inputMsg
                if (!msg) return;
                var mydate = new Date();
                var str = "" + mydate.getFullYear() + "-";
                str += (mydate.getMonth()+1) + "-";
                str += mydate.getDate() + " ";
                str += mydate.getHours()+ ":";
                str += mydate.getMinutes() + ":";
                str += mydate.getSeconds()
                const msgObj = {
                    "date": str,
                    "text": { "text": msg },
                    "mine": true,
                    "name": this.user.name,
                    "img": this.user.img
                }
                this.user.createdtime=str;
                this.user.content=msg;

                this.list.push(msgObj)
                this.insertRecord();
            },
            toolEvent (type, plyload) {
                console.log('tools', type, plyload)
            },

            getRecord(){
                this.loading = true;
                this.$http.getRecordList({mainId:window.localStorage.getItem('id'),otherId:this.currentRow.userId}).then(res =>{
                    this.loading = false;
                    if(res.code == 0){
                        this.list = res.list;
                        console.log(res);
                    }
                })
            },
            getUser(){
                this.loading = true;
                this.$http.getUser({id:window.localStorage.getItem('id')}).then(res =>{
                    this.loading = false;
                    if(res.code == 0){
                        this.user.img=res.user.img;
                        this.user.name=res.user.name;
                        this.user.fromId=res.user.id;
                        this.user.toId=this.currentRow.userId;
                        this.config={
                            img:this.currentRow.img,
                            name:this.currentRow.name
                        }
                    }
                })
            },
            insertRecord(){
                this.loading = true;
                console.log(this.user);

                let param = JSON.parse(JSON.stringify(this.user));
                if(param.toId==null){
                    param.toId=this.currentRow.userId;
                }
                this.$http.addRecord(param).then(res =>{
                    this.loading = false;
                    if(res.code == 0){

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
