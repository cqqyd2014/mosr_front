
import React, { useState, useContext, useEffect } from 'react';

import { Typography,Table, Row, Col, Select, Radio } from 'antd';
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

import {recordToRow} from '../RecordToRow'
import { InterStateBack } from '../../interface/InterStateBack'
import { GuideTable } from './GuideTable'
export interface InterPropsDataPreview { 'd_type': string, 'source_sql': string, 'datalink_uuid': string }
export const GuideDataPreview = (props: InterPropsDataPreview) => {
	const { Option } = Select;
	const { Title, Paragraph, Text } = Typography;
	const [last_get_datas_datetime, setLastGetDatasDatetime] = useState(new Date())
	const [cols, setCols] = useState<any>([])
	const [datas, setDatas] = useState<any>([])
	useEffect(() => {

		//获取表
		let url_top_sql = '/data_manage/database_links/get_top_sql_datas/' + props.datalink_uuid + '/' + encodeURIComponent(props.source_sql) + '/30'
		console.log(url_top_sql)
		if (props.datalink_uuid != '') {
			axios_response(
				{
					info_title: '获取数据和字段类型',

					url: url_top_sql,

				}, (get_top_sql_data: any) => {
					let _cols: any = get_top_sql_data.cols;
					let _datas:any=get_top_sql_data.datas
					let cols_array = []
					for (let index in _cols) {
						
						
						let item = {
							'title': _cols[index].name,
							'width': 120,
							'dataIndex': _cols[index].name,
							'key': _cols[index].name,
						}
						cols_array.push(item)
					}
					setCols(cols_array)
					setDatas(recordToRow({'data':_datas,'starIndex':0,'keys':[]}))
					
					//更新登陆状态
					//_globalDispatch({ 'type': 'login_success', 'payload': { 'permission': permission_data, 'user_name': login_data.u_user_name, 'nickname': login_data.u_nickname, 'user_uuid': login_data.u_uuid, 'user_last_login_datetime': login_data.u_last_login_datetime } });
				}
			)

		}


	}, [last_get_datas_datetime])

	return (


		<div>
			<Paragraph>
				这里只可以浏览数据，确定采集那些字段。
    </Paragraph>
<Table columns={cols} dataSource={datas} scroll={{ x: 1500, y: 300 }} />,

		</div>


	);


}

