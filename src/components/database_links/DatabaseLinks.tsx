import React, { useState, useContext, useEffect } from 'react';

import { Layout, message, InputNumber, Modal, Row, Select, Spin, Input, Alert, Col, Table, Button, Typography, Divider } from 'antd';
import { globalContext } from '../../store/global_context'
import { MyBreadCrumb } from '../my_breadcrumb/MyBreadCrumb'
import { axios_delete, axios_jsonput, axios_response, axios_jsonpost } from '../../public_func/_axios'

import {
	ExclamationCircleOutlined,
	HomeOutlined,
	SettingOutlined,
	MessageOutlined,
	LogoutOutlined,
	LoadingOutlined,
} from '@ant-design/icons';

import { recordToRow } from '../RecordToRow'
import { InterComponentProps } from '../InterComponentProps'
import { generateUUID } from '../../public_func/uuid'
import { dateFormatterFull } from '../../public_func/date_extend'
import { getPartFromIpString, combineIps } from '../../public_func/net_common'
import { gen_db_url } from '../../public_func/database_common'


export interface DataSourceProps extends InterComponentProps { }
export const DatabaseLinks = (props: DataSourceProps) => {
	const { Option } = Select;
	const { confirm } = Modal;
	const columns = [
		{
			title: '序号',
			dataIndex: '_index',
			key: '_index',
			render: (text: string) => <a>{text}</a>,
		},
		{
			title: '数据库类型',
			dataIndex: 'd_type',
			key: 'd_type',
		},
		{
			title: 'IP地址',
			dataIndex: 'd_ip',
			key: 'd_ip',
		},
		{
			title: '端口',
			key: 'd_port',
			dataIndex: 'd_port',

		},
		{
			title: '数据库名/实例名',
			key: 'd_db_name',
			dataIndex: 'd_db_name',

		},
		{
			title: '用户名',
			key: 'd_user_name',
			dataIndex: 'd_user_name',

		},
		{
			title: '密码',
			key: 'd_password',
			dataIndex: 'd_password',

		},
		{
			title: '别名',
			key: 'd_alias',
			dataIndex: 'd_alias',

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
								//console.log(database_link_data)
								setDbType(database_link_data.d_type)
								setIp1(getPartFromIpString(database_link_data.d_ip, 0))
								setIp2(getPartFromIpString(database_link_data.d_ip, 1))
								setIp3(getPartFromIpString(database_link_data.d_ip, 2))
								setIp4(getPartFromIpString(database_link_data.d_ip, 3))
								setDbName(database_link_data.d_db_name)
								setDbUsername(database_link_data.d_user_name)
								setDbPassword(database_link_data.d_password)
								setDbAlias(database_link_data.d_alias)
								setDbMemo(database_link_data.d_memo)
								setNewOrUpdate('update')
								setDbUuid(database_link_data.d_uuid)
								setLastModified(database_link_data.last_modified)
								setETag(database_link_data.e_tag)
								setOkButtonDisable(true)
								setDbAddDatetime(database_link_data.d_add_datetime)
								setNewUpdateDialogVisible(true)
								//setDatalinksLoading(false)
								//let row_data = recordToRow({ 'data': database_link_data, 'starIndex': 0, 'keys': ['d_uuid'] })
								//console.log(row_data)
								//setData(row_data)
								//更新登陆状态
								//_globalDispatch({ 'type': 'login_success', 'payload': { 'permission': permission_data, 'user_name': login_data.u_user_name, 'nickname': login_data.u_nickname, 'user_uuid': login_data.u_uuid, 'user_last_login_datetime': login_data.u_last_login_datetime } });
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
										setLastUpdateDatetime(new Date)

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


					}}>测试可用性</Button>

				</span>
			),
		},
	];
	const [data, setData] = useState()
	const [last_update_datetime, setLastUpdateDatetime] = useState(new Date)
	useEffect(() => {
		// Update the document title using the browser API
		//setDatalinksLoading(true)
		axios_response(
			{
				info_title: '获取数据联接',

				url: '/data_manage/database_links/',

			}, (database_link_data) => {
				setDatalinksLoading(false)
				let row_data = recordToRow({ 'data': database_link_data, 'starIndex': 0, 'keys': ['d_uuid'] })
				//console.log(row_data)
				setData(row_data)
				//更新登陆状态
				//_globalDispatch({ 'type': 'login_success', 'payload': { 'permission': permission_data, 'user_name': login_data.u_user_name, 'nickname': login_data.u_nickname, 'user_uuid': login_data.u_uuid, 'user_last_login_datetime': login_data.u_last_login_datetime } });
			}
		)
	}, [last_update_datetime]);


	const { Header, Sider, Content } = Layout;
	const { Search } = Input;
	const { Title, Paragraph, Text } = Typography;

	const [new_update_confirmloading, setNewUpdateConfirmLoading] = useState(false)
	const [new_update_dialog_visible, setNewUpdateDialogVisible] = useState(false)
	const [new_or_update, setNewOrUpdate] = useState('new')//类型分为new和update
	const [ok_button_disable, setOkButtonDisable] = useState(true)
	const [datalinks_loading, setDatalinksLoading] = useState(false);
	const [db_type, setDbType] = useState('MS SQLSERVER');
	const [ip1, setIp1] = useState(127)
	const [ip2, setIp2] = useState(0)
	const [ip3, setIp3] = useState(0)
	const [ip4, setIp4] = useState(1)
	const [database_drivers, setDatabaseDrivers] = useState('');
	const [database_driver, setDatabaseDriver] = useState('');
	const [database_url, setDatabaseUrl] = useState('');
	const [db_username, setDbUsername] = useState('sa')
	const [db_password, setDbPassword] = useState('')
	const [db_port, setDbPort] = useState(1433)
	const [db_name, setDbName] = useState('master')
	const [connecting, setConnecting] = useState(false)
	const [check_message, setCheckMessage] = useState('')
	const [last_modified, setLastModified] = useState(new Date)
	const [e_tag, setETag] = useState('')
	const [db_uuid, setDbUuid] = useState('')
	const [db_alias, setDbAlias] = useState('')
	const [db_memo, setDbMemo] = useState('')
	const [db_add_datetime, setDbAddDatetime] = useState(new Date)
	const myBreadCrumb=MyBreadCrumb({'_breadcrumb':props._breadcrumb ,'_icon':props._icon})

	//let get_permisssion_url_string = '/system/users/permission/' + user_uuid
	let { _globalState, _globalDispatch } = useContext(globalContext);
	return (


		<Content style={{ margin: '0 16px', textAlign: 'left' }}>
			<Modal
				confirmLoading={new_update_confirmloading}
				width='1000px'
				title={new_or_update === 'new' ? '新数据源' : '更新数据源'}
				visible={new_update_dialog_visible}
				okText={new_or_update === 'new' ? '确定保存新数据源' : '确定更新数据源'}
				onOk={() => {
					if (db_alias === '') {
						message.error('别名不能为空');
						return
					}

					setNewUpdateConfirmLoading(true)
					let ipstring: string = combineIps({ 'ip1': ip1, 'ip2': ip2, 'ip3': ip3, 'ip4': ip4 })
					let d_url: string = gen_db_url({ 'd_type': db_type, 'd_ip': ipstring, 'd_port': db_port, 'd_db_name': db_name, 'd_db_username': db_username, 'd_db_password': db_password })
					if (new_or_update == 'new') {

						axios_jsonpost(
							{
								info_title: '新增数据联接',

								url: '/data_manage/database_links/',
								data: {
									'array_datas': [{
										'd_ip': ipstring,
										'd_port': db_port,
										'd_db_name': db_name,
										'd_user_name': db_username,
										'd_password': db_password,
										'd_url': d_url,
										'last_modified': dateFormatterFull(last_modified),
										'd_add_datetime': dateFormatterFull(last_modified),
										'e_tag': generateUUID(),
										'd_add_username': _globalState.user_name,
										'd_alias': db_alias,
										'd_memo': db_memo,
										'd_uuid': db_uuid,
										'd_type': db_type,
										'is_delete': false
									}]
								},

							}, (save_data: any) => {

								setNewUpdateConfirmLoading(false)


								//setCheckMessage(check_data.message)
								setConnecting(false)
								//console.log(check_data)
								if (save_data.status) {
									message.info('操作成功')
									setNewUpdateDialogVisible(false)
									setLastUpdateDatetime(new Date)
								}
								else {
									Modal.error({ title: '新增或修改数据库连接', content: save_data.message })
								}

								//更新登陆状态
								//_globalDispatch({ 'type': 'login_success', 'payload': { 'permission': permission_data, 'user_name': login_data.u_user_name, 'nickname': login_data.u_nickname, 'user_uuid': login_data.u_uuid, 'user_last_login_datetime': login_data.u_last_login_datetime } });
							}
						)
					}
					else {
						//更新记录

						let data = {
							'array_datas': [
								{
									"d_ip": ipstring,
									"d_port": db_port,
									'd_db_name': db_name,
									'd_user_name': db_username,
									'd_password': db_password,
									'd_url': d_url,
									'd_add_datetime': db_add_datetime,
									'd_add_username': _globalState.user_name,
									'd_alias': db_alias,
									'd_memo': db_memo,
									'd_type': db_type,
									'last_modified': last_modified,
									'e_tag': e_tag,
									'd_uuid': db_uuid,
									'is_delete': false

								}],
							'_for_xywl2019_update': { 'pk': ['d_uuid'] }
						};

						axios_jsonput(
							{
								info_title: '新增数据联接',

								url: '/data_manage/database_links/',
								data: data,

							}, (put_data: any) => {

								setNewUpdateConfirmLoading(false)


								//setCheckMessage(check_data.message)
								setConnecting(false)
								//console.log(check_data)
								if (put_data.status) {
									message.info('操作成功')
									setNewUpdateDialogVisible(false)
									setLastUpdateDatetime(new Date)
								}


								//更新登陆状态
								//_globalDispatch({ 'type': 'login_success', 'payload': { 'permission': permission_data, 'user_name': login_data.u_user_name, 'nickname': login_data.u_nickname, 'user_uuid': login_data.u_uuid, 'user_last_login_datetime': login_data.u_last_login_datetime } });
							}
						)

					}


				}}
				cancelText='取消'
				onCancel={() => {
					setNewUpdateDialogVisible(false)
				}}
				okButtonProps={{ disabled: ok_button_disable }}

			>
				<p>请选择数据库类型，输入相关参数，测试通过之后，保存。</p>
				<Divider />
				<Row type="flex" justify="space-around" align="middle">
					<Col span={2} >数据库类型</Col>
					<Col span={6}>
						<Select value={db_type} onChange={
							(e: any) => {
								setOkButtonDisable(false);
								setDbType(e.target.value)
							}
						}>

							<Option value="MS SQLSERVER">MS SQLSERVER</Option>
							<Option value="Oracle" >Oracle</Option>

						</Select>
					</Col>
					<Col span={2}>IP地址</Col>
					<Col span={6}>
						<InputNumber style={{ 'width': '50px' }} min={0} step={1} max={255} value={ip1} onChange={(e: any) => { setOkButtonDisable(true); setIp1(e) }} />.
					<InputNumber style={{ 'width': '50px' }} min={0} step={1} max={255} value={ip2} onChange={(e: any) => { setOkButtonDisable(true); setIp2(e) }} />.
					<InputNumber style={{ 'width': '50px' }} min={0} step={1} max={255} value={ip3} onChange={(e: any) => { setOkButtonDisable(true); setIp3(e) }} />.
					<InputNumber style={{ 'width': '50px' }} min={0} step={1} max={255} value={ip4} onChange={(e: any) => { setOkButtonDisable(true); setIp4(e) }} />
					</Col>
					<Col span={2}>端口号</Col>
					<Col span={6}>
						<InputNumber min={1} value={db_port} onChange={(e: any) => { setOkButtonDisable(true); setDbPort(e); }} />
					</Col>
				</Row>
				<Row type="flex" justify="space-around" align="middle">
					<Col span={2} >数据库名/实例名</Col>
					<Col span={6}>
						<Input value={db_name} onChange={(e) => { setOkButtonDisable(true); setDbName(e.target.value); }} />

					</Col>
					<Col span={2}>用户名</Col>
					<Col span={6}>
						<Input value={db_username} onChange={(e) => { setOkButtonDisable(true); setDbUsername(e.target.value); }} />
					</Col>
					<Col span={2}> 密码</Col>
					<Col span={6}>
						<Input value={db_password} onChange={(e) => { setOkButtonDisable(true); setDbPassword(e.target.value); }} />
					</Col>
				</Row>
				<Row type="flex" justify="space-around" align="middle">
					<Col span={2} >连接别名</Col>
					<Col span={6}>
						<Input value={db_alias} onChange={(e) => { setDbAlias(e.target.value); }} />

					</Col>
					<Col span={2}>备注</Col>
					<Col span={14}>
						<Input value={db_memo} onChange={(e) => { setDbMemo(e.target.value); }} />
					</Col>

				</Row>
				<Row type="flex" justify="end">
					<Col span={4}>
						<Button type="primary" loading={connecting} onClick={
							() => {
								//关键字段不能为空
								if (db_name === '') {
									message.error('数据库名/实例名不能为空');
									return
								}
								if (db_username === '') {
									message.error('用户名不能为空');
									return
								}
								if (db_password === '') {
									message.error('密码不能为空');
									return
								}
								setConnecting(true)
								axios_response(
									{
										info_title: '测试数据库连接',

										url: '/data_manage/database_links/check_db_link/' + encodeURIComponent(db_type) + '/' + encodeURIComponent(combineIps({ 'ip1': ip1, 'ip2': ip2, 'ip3': ip3, 'ip4': ip4 })) + '/' + encodeURIComponent(db_port) + '/' + encodeURIComponent(db_name) + '/' + encodeURIComponent(db_username) + '/' + encodeURIComponent(db_password),

									}, (_check_data: any) => {
										setCheckMessage(_check_data.message)
										setConnecting(false)
										//console.log(check_data)
										_check_data.status === true ? setOkButtonDisable(false) : Modal.error({ title: '测试数据库连接', 'content': _check_data.message, })
										//更新登陆状态
										//_globalDispatch({ 'type': 'login_success', 'payload': { 'permission': permission_data, 'user_name': login_data.u_user_name, 'nickname': login_data.u_nickname, 'user_uuid': login_data.u_uuid, 'user_last_login_datetime': login_data.u_last_login_datetime } });
									}
								)

							}
						}>测试数据库连接</Button>
					</Col>
				</Row>

				<Divider />
				测试结果：{check_message}
			</Modal>
			<MyBreadCrumb _breadcrumb={props._breadcrumb} _icon={props._icon} />
			<Typography>
				<Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>
					数据源
    </Divider>
				<Paragraph>
					在这里定义系统可以访问的数据源，采集外围数据。采用网络传输的模式，需要数据源的ip地址、端口、用户名及密码。
					</Paragraph>
				<Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>

				</Divider>
				<Button type="primary" icon="plus" onClick={() => {
					setDbType('MS SQLSERVER')
					setIp1(127)
					setIp2(0)
					setIp3(0)
					setIp4(1)
					setDbName('master')
					setDbUsername('sa')
					setDbPassword('')
					setDbAlias('')
					setDbMemo('')
					setNewOrUpdate('new')
					setDbUuid(generateUUID())
					setLastModified(new Date)
					setNewUpdateDialogVisible(true)

				}}>
					点击添加新数据源
</Button><Button type="primary" icon="reload" onClick={() => {
					setLastUpdateDatetime(new Date)

				}}>
					刷新数据
</Button>
				<Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>

				</Divider>
				{datalinks_loading ?

					<Spin tip="加载中...">
						<Alert
							message="休息一会儿"
							description="正在读取数据，请等待一会儿。"
							type="info"
						/>
					</Spin>
					: ''}




			</Typography>

			<Table columns={columns} dataSource={data} />
		</Content>
	);

}

