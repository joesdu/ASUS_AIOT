import { authoritySearchApi, authorityDeleteApi, authorityCheckDeleteApi, authorityEditApi } from "../../../services/api";
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
        *getList({ payload }, { call, put }) {
            const data = yield call(authoritySearchApi, payload);
            let _pag = {};
            if (!!data && data.code === 0) {
                _pag.total = typeof data.data.total == undefined ? 0 : data.data.total;
                _pag.pageSize = typeof data.data.pageSize == undefined ? 0 : data.data.pageSize;
                _pag.current = typeof data.data.pageNum == undefined ? 0 : data.data.pageNum;
                if (typeof data.data.totalRows == undefined || typeof data.data.pages == undefined)
                    _pag.pageCount = 0;
                else
                    _pag.pageCount = data.data.pages;
                yield put({ type: "getListSuccess", payload: data.data.list, page: _pag });
            } else {
                message.error(!!data ? "获取数据失败,错误信息:" + data.msg : "获取数据失败");
                yield put({ type: "getListSuccess", payload: null, page: _pag });
            }
        },
        *add({ payload }, { call, put }) {
            // 跳转到新增页面
            yield put(routerRedux.push({ pathname: "/roleAdd" }));
        },
        *delete({ payload }, { call, put }) {
            const data = yield call(authorityDeleteApi, payload.delete);
            if (!!data && data.code === 0) {
                message.info("刪除成功");
                yield put({ type: "getList", payload: payload.query });
            } else {
                message.error(!!data ? "删除数据失败,错误信息:" + data.msg : "删除数据失败");
            }
        },
        *checkDelete({ payload }, { call, put }) {
            const data = yield call(authorityCheckDeleteApi, payload);
            if (!!data && data.code === 0) {
                localStorage.setItem("RemoveRoleDetection", data.data.userNum);
            } else {
                message.error(!!data ? "获取数据失败,错误信息:" + data.msg : "获取数据失败");
                localStorage.setItem("RemoveRoleDetection", 999);
            }
        },
        *edit({ payload }, { call, put }) {
            const data = yield call(authorityEditApi, payload.edit);
            if (!!data && data.code === 0) {
                message.info("更新成功");
                yield put({ type: "getList", payload: payload.query });
            } else {
                message.error(!!data ? "更新数据失败,错误信息:" + data.msg : "更新数据失败");
                yield put({ type: "getList", payload: payload.query });
            }
        },
    },
    reducers: {
        getListSuccess(state, action) {
            return { ...state, roleListData: action.payload, pagination: action.page };
        }
    }
};
