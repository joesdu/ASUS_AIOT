import { authoritySearchApi,authorityDeleteApi } from "../../../services/api";
import { message } from "antd";
import { routerRedux } from "dva/router";
import config from "../../../utils/config";

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
                    let args = {
                        name: "",
                        pageNum: 0,
                        pageSize: 10,
                        sortType: 1,
                        userToken: config.userToken
                    }
                    dispatch({ type: "getList", payload: args });
                }
            });
        }
    },

    effects: {
        * getList({ payload }, { call, put }) {
            const data = yield call(authoritySearchApi, payload);
            let _pag = {};
            if (data == null || data.length == 0 || data == {} || data.code != 0) {
                message.error(data != null ? "获取数据失败,错误信息:" + data.msg : "获取数据失败");
                yield put({ type: "getListSuccess", payload: null, page: _pag });
            } else {
                if (data.data == null || data.data == {} || data.data == undefined) {
                    message.info("无数据");
                    yield put({ type: "getListSuccess", payload: null, page: _pag });
                }
                else {
                    _pag.total = typeof data.data.total == undefined ? 0 : data.data.total;
                    _pag.pageSize = typeof data.data.pageSize == undefined ? 0 : data.data.pageSize;
                    _pag.current = typeof data.data.pageNum == undefined ? 0 : data.data.pageNum;
                    if (typeof data.data.totalRows == undefined || typeof data.data.pages == undefined)
                        _pag.pageCount = 0;
                    else
                        _pag.pageCount = data.data.pages;
                    yield put({ type: "getListSuccess", payload: data.data.list, page: _pag });
                }
            }
        },
        * addNew({ payload }, { call, put }) {
            // 跳转到新增页面
            yield put(routerRedux.push({ pathname: "/roleAddEdit" }));
        },
        *delete({ payload }, { call, put }) {
            const data = yield call(authorityDeleteApi, payload.delete);
            if (data == null || data.length == 0 || data == {} || data.code != 0) {
                message.error(data != null ? "删除数据失败,错误信息:" + data.msg : "删除数据失败");
            } else {
                if (data.code === 0 || data.code === "0") {
                    message.info("刪除成功");
                    //Todo 刷新列表
                    yield put({ type: "getList", payload: payload.query });
                }
                else {
                    message.info("删除失败,原因:" + data.msg)
                }
            }
        }
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
        getListSuccess(state, action) {
            return { ...state, roleListData: action.payload, pagination: action.page };
        },
        productListSuccess(state, action) {
            return { ...state, deviceProductListData: action.payload };
        }
    }
};
