import React, { useState, useContext,useEffect } from 'react';

import { Table, Button, Tag, Modal,Alert ,Spin} from 'antd';
import { globalContext } from '../../store/global_context'
import { axios_delete, axios_jsonput, axios_response, axios_jsonpost } from '../../public_func/_axios'
import { recordToRow } from '../RecordToRow'
import {
	ExclamationCircleOutlined,
	HomeOutlined,
	SettingOutlined,
	MessageOutlined,
	LogoutOutlined,
	LoadingOutlined,
} from '@ant-design/icons';

import {InterStateBack} from '../../interface/InterStateBack'
export interface InterPropsDetailTable { 'last_update_datetime':Date,'setLastUpdateDatetime':InterStateBack}
export const DetailTable = (props: InterPropsDetailTable) => {
	const { confirm } = Modal;
	const [table_data,setTableData]=useState<any>([])
	const [data_table_loading,setDataTableLoading]=useState(false)
	useEffect(() => {
		// Update the document title using the browser API
		//setDatalinksLoading(true)
		setDataTableLoading(true)
		axios_response(
			{
				info_title: '获取数据通道',

				url: '/data_manage/database_pipes/',

			}, (database_pipes_data) => {
				setDataTableLoading(false)
				let row_data = recordToRow({ 'data': database_pipes_data, 'starIndex': 0, 'keys': ['p_uuid'] })
				//console.log(row_data)
				setTableData(row_data)
				//更新登陆状态
				//_globalDispatch({ 'type': 'login_success', 'payload': { 'permission': permission_data, 'user_name': login_data.u_user_name, 'nickname': login_data.u_nickname, 'user_uuid': login_data.u_uuid, 'user_last_login_datetime': login_data.u_last_login_datetime } });
			}
		)
	}, [props.last_update_datetime]);
	
	const columns = [
		{
			title: '序号',
			dataIndex: '_index',
			key: '_index',
			render: (text: string) => <a>{text}</a>,
		},
		{
			title: '通道名',
			dataIndex: 'p_name',
			key: 'p_name',
		},
		{
			title: '数据源名',
			dataIndex: 'p_data_link_alias_name',
			key: 'p_data_link_alias_name',
		},
		{
			title: '通道类型',
			dataIndex: 'p_source_type',
			key: 'p_source_type',
			render: (p_source_type: any) => (
				<span>
					{p_source_type === 'Table' ? <Tag color='geekblue' >
						数据表
            </Tag> : <Tag color='green' >
							SQL语句
            </Tag>
					}
				</span>
			)
		},
		{
			title: '表名',
			key: 'p_table_name',
			dataIndex: 'p_table_name',

		},
		{
			title: 'SQL',
			key: 'p_source_sql',
			dataIndex: 'p_source_sql',

		},
		{
			title: '操作',
			key: 'action',
			render: (text: string, record: any) => (
				<span>
					<Button type="dashed" icon="edit" onClick={() => {
						//console.log(record.key);
						axios_response(
							{
								info_title: '获取单一数据联接',

								url: '/data_manage/database_links/' + record.key,

							}, (database_link_data: any) => {
								
							}
						)
					}}>修改</Button>
					<Button type="dashed" icon="delete" onClick={() => {
						//console.log(record.key);
						confirm({
							title: '数据连接管理?',
							icon: <ExclamationCircleOutlined />,
							content: '是否确定删除此项',
							onOk() {
								let datas = { 'array_pks': [{ 'd_uuid': record.key, 'last_modified': record.last_modified, 'e_tag': record.e_tag }] }
								axios_delete(
									{
										info_title: '删除单一数据联接',

										url: '/data_manage/database_links/',
										data: datas

									}, (delete_data: any) => {
										props.setLastUpdateDatetime(new Date)

										//setDatalinksLoading(false)
										//let row_data = recordToRow({ 'data': database_link_data, 'starIndex': 0, 'keys': ['d_uuid'] })
										//console.log(row_data)
										//setData(row_data)
										//更新登陆状态
										//_globalDispatch({ 'type': 'login_success', 'payload': { 'permission': permission_data, 'user_name': login_data.u_user_name, 'nickname': login_data.u_nickname, 'user_uuid': login_data.u_uuid, 'user_last_login_datetime': login_data.u_last_login_datetime } });
									}
								)
							},
							onCancel() {
								console.log('Cancel');
							},
						});

					}}>删除</Button>
					<Button type="dashed" icon="check" onClick={() => {
						//console.log(record.key);

						//let data = { 'array_pks': [{ 'd_uuid': record.key, 'last_modified': record.last_modified, 'e_tag': record.e_tag }] }
						axios_response(
							{
								info_title: '测试数据库连接',

								url: '/data_manage/database_links/check_db_link/' + encodeURIComponent(record.d_type) + '/' + encodeURIComponent(record.d_ip) + '/' + encodeURIComponent(record.d_port) + '/' + encodeURIComponent(record.d_db_name) + '/' + encodeURIComponent(record.d_user_name) + '/' + encodeURIComponent(record.d_password),

							}, (_check_data: any) => {
								//setCheckMessage(_check_data.message)
								//setConnecting(false)
								//console.log(check_data)
								_check_data.status === true ? Modal.info({
									title: '测试数据库连接',
									content: (
										<div>
											<p>测试连接通过</p>

										</div>
									),
									onOk() { },
								}) : Modal.error({ title: '测试数据库连接', 'content': _check_data.message, })
								//更新登陆状态
								//_globalDispatch({ 'type': 'login_success', 'payload': { 'permission': permission_data, 'user_name': login_data.u_user_name, 'nickname': login_data.u_nickname, 'user_uuid': login_data.u_uuid, 'user_last_login_datetime': login_data.u_last_login_datetime } });
							}
						)


					}}>查看详情</Button>

				</span>
			),
		},
	];
	
	
	return (
		<div>
		{data_table_loading ?

						<Spin tip="加载中...">
							<Alert
								message="休息一会儿"
								description="正在读取数据，请等待一会儿。"
								type="info"
							/>
						</Spin>
						: ''}
<Table columns={columns} dataSource={table_data} />
</div>
	);


}

