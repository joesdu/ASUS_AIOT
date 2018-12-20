import modelExtend from 'dva-model-extend';
import { userListApi } from '../services/api';
import queryString from 'query-string';
import { message } from 'antd';
import $ from 'jquery';

export default {
    namespace: 'appUsers',
    state: {
        data: [], //列表数据
        pagination: {
            total: 0,
            pageSize: 0,
            current: 0,
            pageCount: 0
        }, //分页数据
        searchList: {}, //查询条件
        pageindex: 1, //分页开始 第几页
        pagesize: 10, //返回条数
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen((location) => {
                //页面初始化执行
                if (location.pathname === '/appUsers') {
                    let _ars = {
                        appSource: "string",
                        firstRow: 0,
                        mobile: "string",
                        nickName: "string",
                        pageNum: 1,
                        pageRows: 10
                    }
                    dispatch({
                        type: 'queryRule',
                        payload: _ars
                    })
                }
            })
        },
    },

    effects: {
        * queryRule({
            payload,
        }, { call, put }) {
            const data = yield call(userListApi, payload)
            if (data.code == 0) {
                let result = data.data;
                let _pag = {}
                _pag.total = typeof result.totalRows == 'undefined' ? 0 : result.totalRows;
                _pag.pageSize = typeof result.pageRows == 'undefined' ? 0 : result.pageRows;
                _pag.current = typeof result.pageNum == 'undefined' ? 0 : result.pageNum;
                if (typeof result.totalRows == 'undefined' || typeof result.pageRows == 'undefined')
                    _pag.pageCount = 0;
                else
                    _pag.pageCount = ((result.totalRows - 1) / result.pageRows) + 1;
                let userData = result.users;
                /*   let userData = []
                  for (var i = 0; i < users.length; i++) {
                      userData[i].appSource = users[i].appSource;
                      userData[i].autoHome = user[i].autoHome;
                      userData[i].headImg = user[i].headImg;
                      userData[i].mobile = users[i].mobile;
                      userData[i].nickName = users[i].nickName;
                      userData[i].sex = user[i].sex;
                      userData[i].userId = users[i].userId;
                      userData[i].createTime = users[i].createTime;
                      userData[i].userName = users[i].userName;
                      userData[i].userToken = users[i].userToken;
                  } */
                yield put({
                    type: 'querySuccess',
                    payload: userData,
                    page: _pag
                })
            } else {
                message.error('获取数据失败,错误信息:' + data.msg);
            }
        },
    },
    reducers: {
        clearData(state) {
            return {
                ...state,
                data: [],
                pagination: {}, //分页数据
                searchList: {}, //查询条件
                pageindex: 1, //分页开始 第几页
                pagesize: 10, //返回条数
            }
        },
        //返回数据列表
        querySuccess(state, action) {
            return {
                ...state,
                data: action.payload,
                pagination: action.page
            }
        },
        //分页参数
        setPage(state, action) {
            return {
                ...state,
                pageindex: action.payload,
                pagesize: action.pageSize,
            }
        },
        //查询条件
        searchList(state, action) {
            return {
                ...state,
                searchList: action.payload,
            }
        },
    }
}
