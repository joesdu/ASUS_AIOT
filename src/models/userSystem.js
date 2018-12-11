import modelExtend from 'dva-model-extend'
import { userSystem } from '../services/api'
import queryString from 'query-string'
import { message } from 'antd'
import $ from 'jquery'
import { storeIds } from '../utils/config'

export default {
  namespace: 'userSystem',
  state:{
	  data: [], //列表数据
	  pagination: {}, //分页数据
	  searchList: {}, //查询条件
	  pageindex: 1, //分页开始 第几页
	  pagesize: 5, //返回条数
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
		//页面初始化执行
        if (location.pathname === '/userSystem') {
			let _ars={}
			_ars.storeId=storeIds
			_ars.curPage=1
			_ars.pageRows=5
			dispatch({
				type:'queryRule',
				payload: _ars
			})
        }
      })
    },
  },
  
  effects: {
    * queryRule ({
      payload,
    }, { call, put }) {
		const data = yield call(userSystem, payload)
		if(data.code==0){
			let _pag={}
			_pag.total=data.data.totalCount
			_pag.pageSize=data.data.pageSize
			_pag.current=data.data.currentIndex
			_pag.pageCount = data.data.pageCount
			yield put({
				type: 'querySuccess',
				payload: data,
				page: _pag
			})
		}
    },
  },
  reducers: {
	clearData(state){
		return {
			...state,
			data: [],
			pagination: {}, //分页数据
			searchList: {}, //查询条件
			pageindex: 1, //分页开始 第几页
			pagesize: 5, //返回条数
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
	setPage(state, action){
		return {
			...state,
			pageindex: action.payload,
			pagesize: action.size,
        }
	},
	//查询条件
	searchList(state, action){
		return {
			...state,
			searchList: action.payload,
		}
	},
  }
}
