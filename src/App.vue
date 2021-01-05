<template>
    <div id="app">
        <router-view v-if="isRouterAlive"></router-view>
    </div>
</template>
<script>
    export default {
        name: 'App',
        provide () {    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
            return {
                reload: this.reload
            }
        },
        data() {
            return{
                isRouterAlive: true                    //控制视图是否显示的变量
            }
        },
        methods: {
            reload () {
                this.isRouterAlive = false;            //先关闭，
                this.$nextTick(function () {
                    this.isRouterAlive = true;         //再打开
                })
            }
        }
    }
</script>
<style>
    @import "./assets/css/main.css";
    /*@import "./assets/css/color-dark.css";     !*深色主题*!*/
    @import "./assets/css/theme-green/color-green.css";   /*浅绿色主题*/
    tbody tr td:nth-of-type(1){width: 55px !important;}
    tbody tr td:nth-of-type(2){width: 80px !important;}
    tbody tr td:nth-of-type(3){width: 195px !important;}
    tbody tr td:nth-of-type(4){width: 192px !important;}
    tbody tr td:nth-of-type(5){width: 192px !important;}
    tbody tr td:nth-of-type(6){width: 192px !important;}
    tbody tr td:nth-of-type(7){width: 192px !important;}
    tbody tr td:nth-of-type(8){width: 192px !important;}
</style>
