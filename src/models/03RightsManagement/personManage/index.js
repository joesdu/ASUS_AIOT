import { authorityListApi, backUserSearchApi } from "../../../services/api";
import { message } from "antd";
import { routerRedux } from "dva/router";
import config from "../../../utils/config";

export default {
    namespace: "personManage",
    state: {
        addBtnVisible: false,
        editBtnVisible: false,
        editModalData: {},
        personListData: [],
        personaListData: [],
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
                if (location.pathname === "/personManage") {
                    dispatch({
                        type: "getPersonList", payload: {
                            authorityId: null,
                            mobile: null,
                            nickname: null,
                            pageNum: 0,
                            pageSize: 10,
                            sortType: 1,
                            status: null,
                            userToken: config.userToken
                        }
                    });
                    dispatch({ type: "getPersonaList", payload: null });
                }
            });
        }
    },

    effects: {
        *getPersonList({ payload }, { call, put }) {
            const data = yield call(backUserSearchApi, payload);
            let _pag = {};
            if (!!data && data.code === 0) {
                _pag.total = typeof data.data.total == undefined ? 0 : data.data.total;
                _pag.pageSize = typeof data.data.pageSize == undefined ? 0 : data.data.pageSize;
                _pag.current = typeof data.data.pageNum == undefined ? 0 : data.data.pageNum;
                if (typeof data.data.totalRows == undefined || typeof data.data.pages == undefined)
                    _pag.pageCount = 0;
                else
                    _pag.pageCount = data.data.pages;
                yield put({ type: "getPersonListSuccess", payload: data.data.list, page: _pag });
            } else {
                message.error(!!data ? "获取数据失败,错误信息:" + data.msg : "获取数据失败");
                yield put({ type: "getPersonListSuccess", payload: null, page: _pag });
            }
        },
        *getPersonaList({ payload }, { call, put }) {
            const data = yield call(authorityListApi, { userToken: config.userToken });
            if (!!data && data.code === 0) {
                yield put({ type: "getPersonaListSuccess", payload: data.data });
            } else {
                message.error(!!data ? "获取数据失败,错误信息:" + data.msg : "获取数据失败");
                yield put({ type: "getPersonaListSuccess", payload: null });
            }
        },
        *addNew({ payload }, { call, put }) {
            // 跳转到新增页面
            yield put(routerRedux.push({ pathname: "/roleAddEdit" }));
        }
    },
    reducers: {
        clearData(state) {
            return {
                ...state,
                addBtnVisible: false,
                editBtnVisible: false,
                editModalData: {},
                personListData: [],
                personaListData: [],
                pagination: {
                    total: 0,
                    pageSize: 10,
                    current: 0,
                    pageCount: 0
                }
            };
        },
        //返回数据列表
        getPersonListSuccess(state, action) {
            return { ...state, personListData: action.payload, pagination: action.page };
        },
        getPersonaListSuccess(state, action) {
            return { ...state, personaListData: action.payload };
        },
        setAddVisibleState(state, action) {
            return { ...state, addBtnVisible: action.visible };
        },
        setEditVisibleState(state, action) {
            return { ...state, editBtnVisible: action.visible };
        },
        setEditModalData(state, action) {
            return { ...state, editModalData: action.data };
        }
    }
};
