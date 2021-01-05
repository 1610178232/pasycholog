<template>
    <div class="sidebar">
        <el-menu
                class="sidebar-el-menu"
                :default-active="onRoutes"
                :collapse="collapse"
                background-color="#324157"
                text-color="#bfcbd9"
                active-text-color="#20a0ff"
                unique-opened
                router
        >
            <template v-for="(item,index) in items">
                <template>
                    <el-submenu :index="index+''" :key="index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.name }}</span>
                        </template>
                        <template v-for="(subItem,sindex) in item.children">
                            <el-menu-item
                                    :index="'/'+subItem.url"
                                    :key="sindex"
                            >
                                    <img :src="subItem.Icon" class="iconimg">
                                <span>{{ subItem.name }}</span>
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    import request from '../../utils/request';
    export default {
        data() {
            return {
                collapse: false,
                items: []
            };
        },
        computed: {
            onRoutes() {
                return this.$route.path.replace('/', '');
            }
        },
        created() {
            this.getmenlists();
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
                bus.$emit('collapse-content', msg);
            });
        },
        methods :{
            // 这是一个定时器
            timer() {
                return setTimeout(()=>{
                    // this.getmenlists();
                },5000)
            },
            getmenlists () {
                request({
                    url:'/apis/user/menu',
                    method: 'post',
                    data:{token:window.localStorage.getItem('token')}
                }).then(res =>{
                    if(res.code == 0){
                        console.log(res)
                        this.items = res.maps;
                    }
                });
            },
           /* getmenlists () {
                request({
                    url:' http://47.106.190.35:9090/user/menu',
                    method: 'post',
                    data:{token:window.localStorage.getItem('token')}
                }).then(res =>{
                    if(res.code == 0){
                        console.log(res)
                        this.items = res.maps;
                    }
                });
            },*/

        },
        watch: {
            items() {
                this.timer()
            }
        },
        destroyed() {
            clearTimeout(this.timer)
        }
    };
</script>

<style scoped>
    .iconimg{
        width: 20px;
        height: 20px;
        margin-right: 6px;
    }
    .sidebar {
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom: 0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar {
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse) {
        width: 250px;
    }
    .sidebar > ul {
        height: 100%;
    }
</style>
