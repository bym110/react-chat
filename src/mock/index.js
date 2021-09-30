import Mock from 'mockjs'
import {Random} from 'mockjs'
// 模拟最近联系人列表数据
Mock.mock(/\/api\/chat\/get\/recentList/, function () {
    const list = [];
    for (let i = 0; i < Random.natural(0, 10); i++) {
        let obj = {
            "id": Random.increment(1), // 自增的id
            "ctime": Random.date('yyyy/MM/dd'),//随机生成日期时间
            "content": Random.csentence(1, 50),//
            "unread": Random.integer(1,10),//随机生成1-10的数字
            "avatar": Random.image(),
            "name": Random.ctitle(2, 7),//随机生成中文名字
            "account":Random.word(12),
            "target": Random.integer(1,2)
        }
        // 好友
        if (obj.target === 1) {
            obj = {
                ...obj,
                "region": Random.county(true),
                "signature": Random.csentence(5, 30),
                "gender": Random.integer(1,2),
                "remark": Random.cname(),
            }
        } else { // 群
            obj = {
                ...obj,
                "note": Random.csentence(5, 30), // 群公告
                "member": Random.integer(10, 200),
                "remark": Random.ctitle()
            }
        }
        list.push(obj)
    }
    return {
        "code": 0,
        "data": list

    }
});

// 模拟通讯录列表数据
Mock.mock(/\/api\/chat\/get\/contactList/, function () {
    const friendList = [], groupList = [];
    for (let i = 0; i < Random.natural(0, 10); i++) {
        friendList.push({
            "id": Random.increment(1), // 自增的id
            "ctime": Random.date('yyyy/MM/dd'),//随机生成日期时间
            "name": Random.ctitle(2, 7),//随机生成中文名字
            "avatar": Random.image(), // 速记生成图片
            "remark": Random.cname(), // 随机生成中文名字
            "region": Random.county(true), // 随机中国的城市 省 县 区
            "account": Random.word(12), // 随机长度为12 的英文文本
            "signature": Random.csentence(5, 30), // 随机长度5-30之间的中文文本
            "gender": Random.integer(1,2), // 随机1|2
            "target": 1
        })
    }
    for (let i = 0; i < Random.natural(0, 10); i++) {
        groupList.push({
            "id": Random.increment(1), // 自增的id
            "ctime": Random.date('yyyy/MM/dd'),//随机生成日期时间
            "name": Random.ctitle(2, 7),//随机生成中文标题
            "avatar": Random.image(),
            "remark": Random.ctitle(), // 随机生成中文名字
            "target": 2,
            "note": Random.csentence(5, 30), // 群公告
            "member": Random.integer(10, 200)
        })
    }
    return {
        "code": 0,
        "data": [{
            "title":"好友",
            "list": friendList,
            "total": friendList.length
        },
            {
                "title":"群",
                "list": groupList,
                "total": groupList.length
            }]
    }
});
// 群成员列表
Mock.mock(/\/api\/chat\/get\/memberList/, function (params) {
    const index = params.url.lastIndexOf('?')+1;
    const total = params.url.substr(index).split('=')[1];
    const list = []
    for (let i = 0; i < total; i++) {
        list.push({
                "id": Random.increment(1),
                "name": Random.ctitle(2, 7),
                "avatar": Random.image()
            })
    }

    return {
        "code": 0,
        "data": list
    }
})

// 聊天内容列表
Mock.mock(/\/api\/chat\/get\/chatMsgList/, function (params) {
    const index = params.url.lastIndexOf('?')+1;
    const total = params.url.substr(index).split('=')[1];
    const list = [];
    for (let i = 0; i < total; i++) {
        list.push({
            "id": Random.increment(1),
            "chatContent":Random.csentence(1, 50),
            "targetType":Random.integer(1,2),
            "avatar": Random.image()
        })
    }

    return {
        "code": 0,
        "data": list
    }
})