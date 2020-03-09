import React, { useState, useContext, useEffect } from 'react';

import { Tag, PageHeader, Steps, Layout, message, InputNumber, Modal, Row, Select, Spin, Input, Alert, Col, Table, Button, Typography, Divider } from 'antd';
import { globalContext } from '../../store/global_context'

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
export const DatabasePipes = (props: DataSourceProps) => {
	const { Option } = Select;
	const { Step } = Steps;
	const { confirm } = Modal;
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


					}}>查看详情</Button>

				</span>
			),
		},
	];
	const [data, setData] = useState()
	const [last_update_datetime, setLastUpdateDatetime] = useState(new Date)
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
	const [new_guide_dialog_visible, setNewGuideDialogVisible] = useState(false)
	//const [new_or_update, setNewOrUpdate] = useState('new')//类型分为new和update
	const [ok_button_disable, setOkButtonDisable] = useState(true)
	const [data_table_loading, setDataTableLoading] = useState(false);

	const [connecting, setConnecting] = useState(false)
	const [check_message, setCheckMessage] = useState('')
	const [last_modified, setLastModified] = useState(new Date)
	const [e_tag, setETag] = useState('')
	const [p_uuid, setDbUuid] = useState('')

	const [db_add_datetime, setDbAddDatetime] = useState(new Date)
	//向导有关
	const [step_current, setStepCurrent] = useState(0)

	//let get_permisssion_url_string = '/system/users/permission/' + user_uuid
	let { _globalState, _globalDispatch } = useContext(globalContext);
	return (
		<PageHeader
			ghost={false}
			onBack={() => window.history.back()}
			title="数据管道"
			subTitle="访问数据源中具体的数据表，建立指向具体数据的管道。"
			extra={[
				<Button key="3" icon="plus" onClick={() => {

					setLastModified(new Date)
					setNewGuideDialogVisible(true)

				}}>增加数据管道向导</Button>,
				<Button key="2" icon="reload" onClick={() => {
					setLastUpdateDatetime(new Date)
				}
				}
				>刷新列表数据</Button>,
				<Button key="1" type="primary">
					帮助
        </Button>,
			]}
		>

			<Content style={{ margin: '0 16px', textAlign: 'left' }}>
				<div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
					<Paragraph>
						在这里可以通过选择表或采用更灵活的SQL语句建立与外部数据的管道。一个管道对应一个数据。在之后的数据抽取中，节点和边的数据来源于此。
    </Paragraph>
					<Modal
						confirmLoading={new_update_confirmloading}
						width='1000px'
						title='新增数据通道向导'
						visible={new_guide_dialog_visible}
						cancelText='取消'
						onCancel={() => {
							setNewGuideDialogVisible(false)
						}}
						okButtonProps={{ disabled: ok_button_disable }}

					>
						<Steps current={step_current}>

							<Step title="数据源" description="选择数据源及数据获取方式" />
							<Step title="数据" description="定义数据，查看数据" />
							<Step title="数据类型" description="确认数据字段类型 " />
						</Steps>
						<div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
</div>
					</Modal>





					{data_table_loading ?

						<Spin tip="加载中...">
							<Alert
								message="休息一会儿"
								description="正在读取数据，请等待一会儿。"
								type="info"
							/>
						</Spin>
						: ''}






					<Table columns={columns} dataSource={data} />
				</div>
			</Content>
		</PageHeader>
	);

}

