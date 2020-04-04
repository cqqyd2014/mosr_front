import React, { useState, useContext, useEffect } from 'react';

import { Typography,Pagination, Statistic,Radio,Row, Col, Select } from 'antd';
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

import { InterStateBack } from '../../interface/InterStateBack'
import {select_from_table_sql} from '../../public_func/database_common'
export interface InterPropsTable {'d_type':string, 'datalink_uuid': string,'setSourceSql':InterStateBack}
export const GuideTable = (props: InterPropsTable) => {
	const { Option } = Select;
	const { Title, Paragraph, Text } = Typography;
	
	const [display_start_index,setDisplayStartIndex]=useState(0)
	const [display_page_index,setDisplayPageIndex]=useState(1)
	const [display_page_size,setDisplayPageSize]=useState(20)
	const [tables, setTables ]  = useState<any>([]);
	const [selectedTableName,setSelectedTableName]=useState('')
	let display_tables:Array<any>=tables.slice( (display_page_index-1)*display_page_size, display_page_index*display_page_size)
	const [last_get_tables_datetime,setLastGetTablesDatetime]=useState(new Date())
	useEffect(() => {
		
		//获取表
		let url_table = '/data_manage/database_links/get_tables/' + props.datalink_uuid
		if (props.datalink_uuid!=''){
			axios_response(
			{
				info_title: '获取表',

				url: url_table,

			}, (get_tables_data: any) => {
				if (get_tables_data.tables.length != 0){
					setSelectedTableName(get_tables_data.tables[0])
					let sql=select_from_table_sql({'d_type':props.d_type,'d_table_name':get_tables_data.tables[0]})
				
				props.setSourceSql(sql)
					
				}
				 
				
				setTables(get_tables_data.tables)
				//更新登陆状态
				//_globalDispatch({ 'type': 'login_success', 'payload': { 'permission': permission_data, 'user_name': login_data.u_user_name, 'nickname': login_data.u_nickname, 'user_uuid': login_data.u_uuid, 'user_last_login_datetime': login_data.u_last_login_datetime } });
			}
		)
		
		}
		

	}, [last_get_tables_datetime])
	return (


		<div>
		
		<Paragraph>
		当前数据连接可以获得以下数据表，请选择您需要指向的数据表。
    </Paragraph>
		
		
			<Radio.Group value={selectedTableName} buttonStyle="solid"
			onChange={(e)=>{
				
				
				let sql=select_from_table_sql({'d_type':props.d_type,'d_table_name':e.target.value})
				
				props.setSourceSql(sql)
				setSelectedTableName(e.target.value)
			}}>
				{display_tables.map((item: any, index: number, array: any) => (
					<Radio.Button key={index} value={item}>{index+(display_page_index-1)*display_page_size+1}、{item}</Radio.Button>
				))}


			</Radio.Group>
			 <Pagination
      total={tables.length}
      showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
      pageSize={20}
      defaultCurrent={1}
showSizeChanger
onChange={(page, pageSize)=>{
	setDisplayPageIndex(page)
	setDisplayPageSize(pageSize as number)
}}
onShowSizeChange={(current, size)=>{
	setDisplayPageIndex(current)
	setDisplayPageSize(size)
	
}}
    />

		</div>


	);


}

