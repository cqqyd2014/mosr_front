import React, { useState, useContext,useEffect } from 'react';

import { Typography, Row, Col, Select } from 'antd';
import { globalContext } from '../../store/global_context'
import { axios_delete, axios_jsonput, axios_response, axios_jsonpost } from '../../public_func/_axios'

import {
	UserOutlined,
	HomeOutlined,
	SettingOutlined,
	MessageOutlined,
	LogoutOutlined,
	LoadingOutlined,
} from '@ant-design/icons';

import home_img from './img/home.png'
export interface InterPropsDataSource { 'database_link_uuid': string }
export const DataSource = (props: InterPropsDataSource) => {
	const { Title, Paragraph, Text } = Typography;
	const [last_update_datetime,setLastUpdateDatetime]=useState(new Date)
	useEffect(() => {
		// Update the document title using the browser API
		//setDatalinksLoading(true)
		
		axios_response(
			{
				info_title: '获取数据通道',

				url: '/data_manage/database_pipes/',

			}, (database_pipes_data) => {
				setDataTableLoading(false)
				let row_data = recordToRow({ 'data': database_pipes_data, 'starIndex': 0, 'keys': ['p_uuid'] })
				//console.log(row_data)
				setData(row_data)
				//更新登陆状态
				//_globalDispatch({ 'type': 'login_success', 'payload': { 'permission': permission_data, 'user_name': login_data.u_user_name, 'nickname': login_data.u_nickname, 'user_uuid': login_data.u_uuid, 'user_last_login_datetime': login_data.u_last_login_datetime } });
			}
		)
	}, [last_update_datetime]);
	return (


		<div>
			<Paragraph>
				在建立数据通道之前，需要选择数据来源的数据连接。数据连接中会有很多数据表，你可以通过选择表或指定SQL语句的方式获取数据。
    </Paragraph>
			<Row>
				<Col span={6}>
					选择数据连接
</Col>
				<Col span={18}>
					<Select value="lucy" onChange={(e) => {

					}}>
						<Option value="jack">Jack</Option>
						<Option value="lucy">Lucy</Option>
						<Option value="disabled" disabled>
							Disabled
      </Option>
						<Option value="Yiminghe">yiminghe</Option>
					</Select>
				</Col>
			</Row>
			<Row>
				<Col span={6}>
					选择方式数据获取方式
</Col>
				<Col span={18}>

				</Col>
			</Row>

		</div>


	);


}

