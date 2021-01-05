import request from '../utils/request';


    // 登录
    const login = param => {
        return request({
            url: '/apis/user/login',
            method: 'post',
            data: param
        });
    }

// 用户列表（管理员）
const getUserInfo = param => {
    return request({
        url: '/apis/user/getUserInfo',
        method: 'post',
        data: param
    });
}

// 添加或修改用户（管理员）
const addOrUpdate = param => {
    return request({
        url: '/apis/user/addOrUpdate',
        method: 'post',
        data: param
    });
}
// 删除用户（管理员）
const delUser = param => {
    return request({
        url: '/apis/user/delUser',
        method: 'post',
        data: param
    });
}
//根据id获取用户信息
const getUser = param => {
    return request({
        url: '/apis/user/getUser',
        method: 'post',
        data: param
    });
}
//聊天记录
const getRecordList = param => {
    return request({
        url: '/apis/record/getRecordList',
        method: 'post',
        data: param
    });
}

//聊天列表（管理员）
const getChawUser = param => {
    return request({
        url: '/apis/record/getChawUser',
        method: 'post',
        data: param
    });
}

//保存聊天信息
const addRecord = param => {
    return request({
        url: '/apis/record/addRecord',
        method: 'post',
        data: param
    });
}

//问卷列表（管理员）
const paperList = param => {
    return request({
        url: '/apis/paper/paperList',
        method: 'post',
        data: param
    });
}

//添加问卷（管理员）
const addPaper = param => {
    return request({
        url: '/apis/paper/addPaper',
        method: 'post',
        data: param
    });
}
//问卷详情
const paperInfo = param => {
    return request({
        url: '/apis/paper/paperInfo',
        method: 'post',
        data: param
    });
}
//删除问卷（管理员）
const delPaper = param => {
    return request({
        url: '/apis/paper/delPaper',
        method: 'post',
        data: param
    });
}
//分数列表（管理员）
const gradeList = param => {
    return request({
        url: '/apis/grade/gradeList',
        method: 'post',
        data: param
    });
}

//聊天列表（学生）
const stUserList = param => {
    return request({
        url: '/apis/record/stUserList',
        method: 'post',
        data: param
    });
}


const addGrade = param => {
    return request({
        url: '/apis/grade/addGrade',
        method: 'post',
        data: param
    });
}
const paperInfoSt = param => {
    return request({
        url: '/apis/paper/paperInfoSt',
        method: 'post',
        data: param
    });
}
//分数列表（学生）
const gradeStList = param => {
    return request({
        url: '/apis/grade/gradeStList',
        method: 'post',
        data: param
    });
}
/*// 登录
const login = param => {
    return request({
        url: 'http://47.106.190.35:9090/user/login',
        method: 'post',
        data: param
    });
}

// 用户列表（管理员）
const getUserInfo = param => {
    return request({
        url: 'http://47.106.190.35:9090/user/getUserInfo',
        method: 'post',
        data: param
    });
}

// 添加或修改用户（管理员）
const addOrUpdate = param => {
    return request({
        url: 'http://47.106.190.35:9090/user/addOrUpdate',
        method: 'post',
        data: param
    });
}
// 删除用户（管理员）
const delUser = param => {
    return request({
        url: 'http://47.106.190.35:9090/user/delUser',
        method: 'post',
        data: param
    });
}
//根据id获取用户信息
const getUser = param => {
    return request({
        url: 'http://47.106.190.35:9090/user/getUser',
        method: 'post',
        data: param
    });
}
//聊天记录
const getRecordList = param => {
    return request({
        url: 'http://47.106.190.35:9090/record/getRecordList',
        method: 'post',
        data: param
    });
}

//聊天列表（管理员）
const getChawUser = param => {
    return request({
        url: 'http://47.106.190.35:9090/record/getChawUser',
        method: 'post',
        data: param
    });
}

//保存聊天信息
const addRecord = param => {
    return request({
        url: 'http://47.106.190.35:9090/record/addRecord',
        method: 'post',
        data: param
    });
}

//问卷列表（管理员）
const paperList = param => {
    return request({
        url: 'http://47.106.190.35:9090/paper/paperList',
        method: 'post',
        data: param
    });
}

//添加问卷（管理员）
const addPaper = param => {
    return request({
        url: 'http://47.106.190.35:9090/paper/addPaper',
        method: 'post',
        data: param
    });
}
//问卷详情
const paperInfo = param => {
    return request({
        url: 'http://47.106.190.35:9090/paper/paperInfo',
        method: 'post',
        data: param
    });
}
//删除问卷（管理员）
const delPaper = param => {
    return request({
        url: 'http://47.106.190.35:9090/paper/delPaper',
        method: 'post',
        data: param
    });
}
//分数列表（管理员）
const gradeList = param => {
    return request({
        url: 'http://47.106.190.35:9090/grade/gradeList',
        method: 'post',
        data: param
    });
}

//聊天列表（学生）
const stUserList = param => {
    return request({
        url: 'http://47.106.190.35:9090/record/stUserList',
        method: 'post',
        data: param
    });
}


const addGrade = param => {
    return request({
        url: 'http://47.106.190.35:9090/grade/addGrade',
        method: 'post',
        data: param
    });
}
const paperInfoSt = param => {
    return request({
        url: 'http://47.106.190.35:9090/paper/paperInfoSt',
        method: 'post',
        data: param
    });
}
//分数列表（学生）
const gradeStList = param => {
    return request({
        url: 'http://47.106.190.35:9090/grade/gradeStList',
        method: 'post',
        data: param
    });
}*/
export default {
    login,
    addOrUpdate,
    delUser,
    getUserInfo,
    getRecordList,
    getChawUser,
    getUser,
    addRecord,
    paperList,
    addPaper,
    paperInfo,
    delPaper,
    gradeList,
    stUserList,
    addGrade,
    paperInfoSt,
    gradeStList


}
