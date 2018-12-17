import modelExtend from 'dva-model-extend'
import { queryRule } from '../services/api'
import queryString from 'query-string'

export default {
    namespace: 'activeData',
    state: {
        data: {
            list: [],
            pagination: {}
        },
        shows: false,
        formValues: [],
        selected: 0,
    },
    //初始化得到值
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen((location) => {
                if (location.pathname === '/activeData') {

                }
            })
        },
    },
    effects: {
        * queryRule({
            payload,
        }, { call, put }) {
            //const data = yield call(queryRule, payload)
            yield put({
                type: 'querySuccess',
                payload: data
            })
        },
    },
    reducers: {
        //返回数据列表
        querySuccess(state, action) {
            return {
                ...state,
                data: action.payload,
            }
        },
        //改变状态
        selected(state, payload) {
            return {
                ...state,
                selected: payload.payload
            }
        },
        //搜索条件
        searchValue(state, payload) {
            return {
                ...state,
                formValues: payload.payload
            }
        }
    }
}
