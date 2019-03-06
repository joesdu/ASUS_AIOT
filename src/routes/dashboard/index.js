import React from 'react';
import { connect } from 'dva';
import { Card, Form, Icon } from 'antd';
import styles from './TableList.less';
import CountUp from 'react-countup';

const ReactHighcharts = require('react-highcharts');

const Dashboard = ({
	home,
	loading
}) => {

	let { overviewData, activateData, activeData } = home;

	let dailyConfig = {
		chart: { height: 450 },
		xAxis: { categories: activateData.dateArray },
		yAxis: { title: { text: "激活设备/个" }, plotLines: [{ value: 0, width: 1, color: "#808080" }] },
		title: { text: null },
		legend: { enabled: false },
		credits: { enabled: false },// 隐藏右下角版权
		series: [{ name: "激活设备/个", data: activateData.numArray }]
	};

	var activeConfig = {
		chart: { height: 450 },
		xAxis: { categories: activeData.dateArray },
		yAxis: { title: { text: "活跃设备/个" }, plotLines: [{ value: 0, width: 1, color: "#808080" }] },
		title: { text: null },
		legend: { enabled: false },
		credits: { enabled: false }, // 隐藏右下角版权
		series: [{ name: "活跃设备/个", data: activeData.numArray }]
	};

	const getDiv = number => {
		if (number >= 0) {
			return (
				<span style={{ color: "#FF5F00" }}><CountUp start={0} end={number} />%&nbsp;<Icon type="caret-up" style={{ color: "#FF5F00", fontSize: "15px" }} /></span>
			);
		} else {
			return (
				<span style={{ color: "#13C2C2" }}><CountUp start={0} end={number} />%&nbsp;<Icon type="caret-down" style={{ color: "#13C2C2", fontSize: "15px" }} /></span>
			);
		}
	};

	return (
		<div>
			<div className={styles.indexTop}>
				<Card className={styles.indexTopL} title="激活数据概览" style={{ marginRight: '15px' }}>
					<div className={styles.indexCont}>
						<div className={styles.indexCont_span} style={{ marginRight: "10%" }}>
							<span className={styles.indexTop_text}>今日激活</span>
							<span style={{ color: "#1890FF" }}><CountUp start={0} end={overviewData.todayActivate} />&nbsp;</span>
							<div className={styles.indexBottom_text}>
								<span>昨日激活&nbsp;&nbsp;</span>
								<span><CountUp start={0} end={overviewData.yesterdayActivate} /></span>
							</div>
						</div>
						<div className={styles.indexCont_span}>
							<span className={styles.indexTop_text}>较昨日环比</span>
							{getDiv(overviewData.yesterdayActivateRate)}
							<div className={styles.indexBottom_text}>
								<span>累计激活&nbsp;&nbsp;</span>
								<span><CountUp start={0} end={overviewData.totalActivate} /></span>
							</div>
						</div>
					</div>
				</Card>
				<Card className={styles.indexTopL} title='活跃数据概览' style={{ position: 'relative' }}>
					<div className={styles.indexCont}>
						<div className={styles.indexCont_span} style={{ marginRight: "10%" }}>
							<span className={styles.indexTop_text}>今日活跃</span>
							<span style={{ color: "#1890FF" }}><CountUp start={0} end={overviewData.todayActive} />&nbsp;</span>
							<div className={styles.indexBottom_text}>
								<span>昨日活跃&nbsp;&nbsp;</span>
								<span><CountUp start={0} end={overviewData.yesterdayActive} /></span>
							</div>
						</div>
						<div className={styles.indexCont_span}>
							<span className={styles.indexTop_text}>较昨日环比</span>
							{getDiv(overviewData.yesterdayActiveRate)}
							<div className={styles.indexBottom_text}>
								<span>活跃占比&nbsp;&nbsp;</span>
								<span><CountUp start={0} end={overviewData.activeRate} />&nbsp;%</span>
							</div>
						</div>
					</div>
				</Card>
			</div>
			<Card title='数据概览' style={{ marginTop: '15px' }}>
				<div className={styles.indexData}>
					<div className={styles.indexDataLeft} style={{ marginRight: '15px' }}>
						<span style={{ marginRight: '15px' }}>近15日激活趋势</span>
						<div style={{ width: '100%' }}>
							<ReactHighcharts config={dailyConfig}></ReactHighcharts>
						</div>
					</div>
					<div className={styles.indexDataRight}>
						<div className={styles.indexDataRight_top} style={{ marginLeft: '15px' }}>
							<span style={{ marginLeft: '15px' }}>近15日活跃趋势</span>
							<div style={{ width: '100%' }}>
								<ReactHighcharts config={activeConfig}></ReactHighcharts>
							</div>
						</div>
					</div>
				</div>
			</Card>
			{/* <Card title='营销应用' style={{ marginTop: '15px' }}>
				<div className={styles.indexBtmFlex}>
					<div>
						<div className={classnames({ [styles.img]: true, [styles.img3]: true })}>
							<img src='./images/indexbtm3.png' />
						</div>
						<div className={styles.indexBtm_span}>
							<div className={styles.indexBtm_span_num}>雷达权限管理</div>
							<div>管理员工名片和雷达的启用/停用</div>
						</div>
					</div>
				</div>
				<div className={styles.indexBtmFlex} style={{ marginTop: '25px' }}>
					<div>
						<div className={classnames({ [styles.img]: true, [styles.img4]: true })}>
							<img src='./images/indexbtm4.png' />
						</div>
						<div className={styles.indexBtm_span}>
							<div className={styles.indexBtm_span_num}>商品管理</div>
							<div>对商城中商品编辑</div>
						</div>
					</div>
					<div>
						<div className={classnames({ [styles.img]: true, [styles.img5]: true })}>
							<img src='./images/indexbtm5.png' />
						</div>
						<div className={styles.indexBtm_span}>
							<div className={styles.indexBtm_span_num}>订单管理</div>
							<div>查询和管理订单发货</div>
						</div>
					</div>
					<div>
						<div className={classnames({ [styles.img]: true, [styles.img6]: true })}>
							<img src='./images/indexbtm6.png' />
						</div>
						<div className={styles.indexBtm_span}>
							<div className={styles.indexBtm_span_num}>售后订单管理</div>
							<div>快速进行退款售后服务</div>
						</div>
					</div>
				</div>
			</Card> */}
		</div>
	)
}

export default connect(({ home, loading }) => ({ home, loading }))(Form.create()(Dashboard))
