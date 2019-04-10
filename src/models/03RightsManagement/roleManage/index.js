import { feedbackListApi, deviceProductListApi, feedbackUpdateApi } from "../../../services/api";
import { message } from "antd";

export default {
    namespace: "roleManagement",
    state: {
        roleListData: [],
        pagination: {
            total: 0,
            pageSize: 10,
            current: 0,
            pageCount: 0
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                //页面初始化执行
                if (location.pathname === "/roleManagement") {
                    dispatch({ type: "getRoleList" });
                }
            });
        }
    },

    effects: {
        *getRoleList({ payload }, { call, put }) {
            //const data = yield call(feedbackListApi, payload);
            let data = {
                code: 0,
                data: {
                    roleList: [{
                        name: "测试姓名0",
                        states: 1,
                        createTime: new Date()
                    }, {
                        name: "测试姓名1",
                        states: 0,
                        createTime: new Date()
                    }],
                    pageNum: 0,
                    pageRows: 10,
                    totalRows: 1
                },
                msg: "沒有錯誤"
            };
            let _pag = {};
            if (data == null || data.length == 0 || data == {} || data.code != 0) {
                message.error(data != null ? "获取数据失败,错误信息:" + data.msg : "获取数据失败");
                yield put({ type: "getRoleListSuccess", payload: null, page: _pag });
            } else {
                if (data.data == null || data.data == {} || data.data == undefined) {
                    message.info("无数据");
                    yield put({ type: "getRoleListSuccess", payload: null, page: _pag });
                }
                else {
                    _pag.total = typeof data.data.totalRows == undefined ? 0 : data.data.totalRows;
                    _pag.pageSize = typeof data.data.pageRows == undefined ? 0 : data.data.pageRows;
                    _pag.current = typeof data.data.pageNum == undefined ? 0 : data.data.pageNum;
                    if (typeof data.data.totalRows == undefined || typeof data.data.pageRows == undefined)
                        _pag.pageCount = 0;
                    else
                        _pag.pageCount = parseInt((data.data.totalRows - 1) / data.data.pageRows) + 1;
                    yield put({ type: "getRoleListSuccess", payload: data.data.roleList, page: _pag });
                }
            }
        },
    },
    reducers: {
        clearData(state) {
            return {
                ...state,
                roleListData: [],
                pagination: {
                    total: 0,
                    pageSize: 10,
                    current: 0,
                    pageCount: 0
                }
            };
        },
        //返回数据列表
        getRoleListSuccess(state, action) {
            return { ...state, roleListData: action.payload, pagination: action.page };
        },
        productListSuccess(state, action) {
            return { ...state, deviceProductListData: action.payload };
        }
    }
};
