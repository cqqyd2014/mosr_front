import React, { useState, useContext,useEffect } from 'react';

import { Typography, Row, Col, Select,Radio } from 'antd';
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

import {InterStateBack} from '../../interface/InterStateBack'

export interface InterPropsDataSource {'setDType':InterStateBack, 'setDatabaseLinkUuid':InterStateBack,'source_type':string,'setSourceType':InterStateBack }
export const GuideDataSource = (props: InterPropsDataSource) => {
	const { Option } = Select;
	const { Title, Paragraph, Text } = Typography;
	const [database_link_uuid,setDatabaseLinkUuid]=useState('')
	const [database_links,setDatabaseLinks]=useState<any>([])
	const [last_update_datetime,setLastUpdateDatetime]=useState(new Date())
	useEffect(() => {
		axios_response(
			{
				info_title: '获取数据通道',

				url: '/data_manage/database_links/',

			}, (database_links_data:any) => {
				console.log(database_links_data)

				setDatabaseLinks(database_links_data)
				if (database_links_data.length>0){
					props.setDType(database_links_data[0].d_type)
					setDatabaseLinkUuid(database_links_data[0].d_uuid)
					props.setDatabaseLinkUuid(database_links_data[0].d_uuid)
				}
				//更新登陆状态
				//_globalDispatch({ 'type': 'login_success', 'payload': { 'permission': permission_data, 'user_name': login_data.u_user_name, 'nickname': login_data.u_nickname, 'user_uuid': login_data.u_uuid, 'user_last_login_datetime': login_data.u_last_login_datetime } });
			}
		)

	}, [last_update_datetime])
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
					<Select value={database_link_uuid} onChange={(e:any) => {
						setDatabaseLinkUuid(e.target.value)
						props.setDatabaseLinkUuid(e.target.value)
					}}>
					{
						database_links.map((item: any, index: number, array: any)=>(
							<Option key={index} value={item.d_uuid}>{item.d_alias}</Option>
						))
					}
						
					</Select>
				</Col>
			</Row>
			<Row>
				<Col span={6}>
					选择方式数据获取方式
</Col>
				<Col span={18}>
<Radio.Group onChange={(e:any)=>{
	props.setSourceType(e.target.value)
	//console.log(e.target.value)
}} value={props.source_type}>
        <Radio value='Table'>选择表</Radio>
        <Radio value='SQL'>自定义SQL</Radio>
        
      </Radio.Group>
				</Col>
			</Row>

		</div>


	);


}

