import { feedbackListApi, deviceProductListApi, feedbackUpdateApi } from "../../../services/api";
import { message } from "antd";
import { routerRedux } from "dva/router";

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
                    dispatch({ type: "getPersonList", payload: null });
                    dispatch({ type: "getPersonaList", payload: null });
                }
            });
        }
    },

    effects: {
        *getPersonList({ payload }, { call, put }) {
            //const data = yield call(feedbackListApi, payload);
            let times = [new Date(), new Date(2019, 1, 1, 12, 12, 56), new Date(2019, 3, 2, 11, 56, 54)];
            let data = {
                code: 0,
                data: {
                    personList: [{
                        id: 0,
                        username: "测试姓名0",
                        name: "測試姓名0",
                        phone: "18885239562",
                        userRoles: "系統管理員0",
                        password: "texstsdg",
                        remark:"34562346的身份和",
                        states: true,
                        createTime: times[0]
                    }, {
                        id: 1,
                        username: "测试姓名1",
                        name: "測試姓名1",
                        phone: "18562358965",
                        userRoles: "系統管理員1",
                        password: "texstsdg345",
                        remark:"啊噶是噶是",
                        states: true,
                        createTime: times[1]
                    }, {
                        id: 2,
                        username: "测试姓名2",
                        name: "測試姓名2",
                        phone: "13985624756",
                        userRoles: "系統管理員2",
                        password: "texstsdg47457",
                        remark:"文案嘎灑給",
                        states: false,
                        createTime: times[2]
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
                yield put({ type: "getPersonListSuccess", payload: null, page: _pag });
            } else {
                if (data.data == null || data.data == {} || data.data == undefined) {
                    message.info("无数据");
                    yield put({ type: "getPersonListSuccess", payload: null, page: _pag });
                }
                else {
                    _pag.total = typeof data.data.totalRows == undefined ? 0 : data.data.totalRows;
                    _pag.pageSize = typeof data.data.pageRows == undefined ? 0 : data.data.pageRows;
                    _pag.current = typeof data.data.pageNum == undefined ? 0 : data.data.pageNum;
                    if (typeof data.data.totalRows == undefined || typeof data.data.pageRows == undefined)
                        _pag.pageCount = 0;
                    else
                        _pag.pageCount = parseInt((data.data.totalRows - 1) / data.data.pageRows) + 1;
                    yield put({ type: "getPersonListSuccess", payload: data.data.personList, page: _pag });
                }
            }
        },
        *getPersonaList({ payload }, { call, put }) {
            //const data = yield call(feedbackListApi, payload);
            let data = {
                code: 0,
                data: {
                    personaList: [{
                        id: 0,
                        userRoles: "系統管理員0"
                    }, {
                        id: 1,
                        userRoles: "系統管理員1"
                    }, {
                        id: 2,
                        userRoles: "系統管理員2"
                    }]
                },
                msg: "沒有錯誤"
            };
            if (data == null || data.length == 0 || data == {} || data.code != 0) {
                message.error(data != null ? "获取数据失败,错误信息:" + data.msg : "获取数据失败");
                yield put({ type: "getPersonaListSuccess", payload: null });
            } else {
                if (data.data == null || data.data == {} || data.data == undefined) {
                    message.info("无数据");
                    yield put({ type: "getPersonaListSuccess", payload: null });
                }
                else {
                    yield put({ type: "getPersonaListSuccess", payload: data.data.personaList });
                }
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
