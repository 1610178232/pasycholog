<template>
    <div>
        <el-row :gutter="25">
            <el-col :span="10">
                <el-card shadow="hover" class="mgb20" style="height:252px;">
                    <div class="user-info">
                        <img v-if="this.img ==null" src="../../assets/img/img.jpg" class="user-avator" alt />
                        <img v-else :src="this.img" class="user-avator" alt/>
                        <div class="user-info-cont">
                            <div class="user-info-name">{{name}}</div>
                            <div>{{role}}</div>
                        </div>
                    </div>
                    <div class="user-info-list">
                        当前星期：
                        <span>{{this.nowWeek}}</span>
                    </div>
                    <div class="user-info-list">
                        当前时间：
                        <span>{{this.nowDate}}</span>
                        <span>{{this.nowTime}}</span>
                    </div>

                </el-card>
                <el-card shadow="hover" style="height:300px;">
                    <div slot="header" class="clearfix">
                        <span>当前中国青年心理健康分布图：</span>
                    </div>
                    <el-progress :percentage="58.03" color="#42b983"></el-progress>心理比较健康
                    <el-progress :percentage="22.81" color="#f1e05a"></el-progress>心理不太健康
                    <el-progress :percentage="16.92" color="#f56c6c"></el-progress>心理非常健康
                    <el-progress :percentage="2.24" color="#f52c6c"></el-progress>心理严重不健康
                </el-card>
            </el-col>
            <el-col :span="14">
                <el-card shadow="hover" style="height:403px;">
                    <div slot="header" class="clearfix">
                        <span>心理健康了解：</span>
                    </div>
            <div>
                心理学家认为，人的心理健康包括以下七个方面：
            </div>
                    <div class="d">1、智力正常；</div>
                    <div class="d"> 2、情绪健康；</div>
                    <div class="d">3、意志健全；</div>
                    <div class="d">4、行为协调；</div>
                    <div class="d">5、人际关系适应；</div>
                    <div class="d"> 6、反应适度；</div>
                    <div class="d"> 7、心理特点符合年龄。</div>
                    <div class="d">了解什么是心理健康，对于增强与维护人们的整体健康水平有重要意义。</div>
                </el-card>
                <el-card shadow="hover" style="height:300px;">
                    <div slot="header" class="clearfix">
                        <span>问卷调查分数对比分析：</span>
                    </div>
                    <div class="d">（1）15分以上，心理状态<span style="color:deepskyblue">较好</span>。</div>
                    <div class="d">（2）11--15分，心理状态<span style="color:green">正常</span>。</div>
                    <div class="d"> （3）6--10分，心理状态<span style="color:orange">较差</span>。</div>
                    <div class="d">（4）0--5，心理状态<span style="color: red">极差</span>。</div>

                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Schart from 'vue-schart';
import bus from '../common/bus';
export default {
    name: 'dashboard',
    data() {
        return {
            name: localStorage.getItem('ms_username'),
            nowWeek:'',
            nowTime:'',
            nowDate:'',
            img:''

        };
    },
    components: {
        Schart
    },
    computed: {
        role() {
            return this.name === 'admin' ? '超级管理员' : '普通用户';
        }
    },

    methods: {
        currentTime() {
            this.img=window.localStorage.getItem('img');
            setInterval(this.getDate, 500);
        },
        getDate: function() {
            var _this = this;
            let yy = new Date().getFullYear();
            let mm = new Date().getMonth() + 1;
            let dd = new Date().getDate();
            let week = new Date().getDay();
            let hh = new Date().getHours();
            let ms =
                new Date().getSeconds() < 10
                    ? "0" + new Date().getSeconds()
        : new Date().getSeconds();
            let mf =
                new Date().getMinutes() < 10
                    ? "0" + new Date().getMinutes()
        : new Date().getMinutes();
            if (week == 1) {
                this.nowWeek = "星期一";
            } else if (week == 2) {
                this.nowWeek = "星期二";
            } else if (week == 3) {
                this.nowWeek = "星期三";
            } else if (week == 4) {
                this.nowWeek = "星期四";
            } else if (week == 5) {
                this.nowWeek = "星期五";
            } else if (week == 6) {
                this.nowWeek =" 星期六";
            } else {
                this.nowWeek = "星期日";
            }
            this.nowTime = hh + ":" + mf +" :" + ms;
            this.nowDate = yy +"/" + mm + "/" + dd;
        }
    },mounted() {
        this.currentTime();
    },


};
</script>


<style scoped>
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 300px;
}
</style>
