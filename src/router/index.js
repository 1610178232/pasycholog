import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import( '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import( '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/admin',
                    component: () => import( '../components/page/admin/admin.vue'),
                    meta: { title: '管理员管理' }
                },
                {
                    path: '/student',
                    component: () => import( '../components/page/admin/student.vue'),
                    meta: { title: '学生管理' }
                },
                {
                    path: '/beginCounsel',
                    component: () => import( '../components/page/admin/beginCounsel.vue'),
                    meta: { title: '咨询' }
                },
                {
                    path: '/addPapper',
                    component: () => import( '../components/page/admin/addPapper.vue'),
                    meta: { title: '添加问卷' }
                },
                {
                    path: '/papreInfo',
                    component: () => import( '../components/page/admin/papreInfo.vue'),
                    meta: { title: '问卷信息' }
                },
                {
                    path: '/studentGrade',
                    component: () => import( '../components/page/admin/studentGrade.vue'),
                    meta: { title: '分数管理' }
                },
                {
                    path: '/bgStCounsel',
                    component: () => import( '../components/page/student/bgStCounsel.vue'),
                    meta: { title: '咨询系统' }
                },
                {
                    path: '/stGotGrade',
                    component: () => import( '../components/page/student/stGotGrade.vue'),
                    meta: { title: '分数系统' }
                },
                {
                    path: '/stPaperInfo',
                    component: () => import( '../components/page/student/stPaperInfo.vue'),
                    meta: { title: '问卷系统' }
                },
                {
                    path: '/stMyInfo',
                    component: () => import( '../components/page/student/stMyInfo.vue'),
                    meta: { title: '信息管理' }
                },
                {
                    path: '/myInfo',
                    component: () => import( '../components/page/admin/myInfo.vue'),
                    meta: { title: '信息管理' }
                },

            ]
        },
        {
            path: '/login',
            component: () => import( '../components/page/Login.vue'),
            meta: { title: '登录' }
        },

        {
            path: '*',
            redirect: '/404'
        }
    ]
});
