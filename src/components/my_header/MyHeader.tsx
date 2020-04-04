import React, { useState, useContext } from 'react';

import { Layout, Spin,Alert,Tooltip, Modal, Input, Row, Col, Badge, Typography, Button } from 'antd';
import { globalContext } from '../../store/global_context'

import {
	UserOutlined,
	QuestionCircleOutlined,
	SettingOutlined,
	MessageOutlined,
	LogoutOutlined,

} from '@ant-design/icons';

import home_img from './img/home.png'
//export interface LoginProps { compiler: string; framework: string; }
export const MyHeader = () => {
	const { confirm } = Modal;
	const { Header, Sider, Content } = Layout;
	const { Search } = Input;
	const { Title, Paragraph, Text } = Typography;


	const [login_confirmLoading, setLoginConfirmLoading] = useState(false);
	const [login_user_name, setLoginUserName] = useState('');
	const [login_user_password, setLoginUserPassword] = useState('');
	const [user_uuid, SetUserUuid] = useState('');

	let login_url_string = '/system/users/login/' + login_user_name + '/' + login_user_password
	//let get_permisssion_url_string = '/system/users/permission/' + user_uuid
	let { _globalState, _globalDispatch } = useContext(globalContext);
	return (
		<Header className="site-layout-background" style={{ padding: 0 }} >
		
		
		
			<Row justify="space-around" align="middle">
				<Col span={16} >
					<Search placeholder="查询By身份证号、统一社会编码、机构名称" loading style={{ padding: 10 }} /></Col>
				<Col span={8}>
					<Tooltip title="查看信息">
						<Badge count={1}>

							<Button icon="message" style={{ margin: 5 }} />


						</Badge>
					</Tooltip>


					<Tooltip title="个人信息">

						<Button icon="user" style={{ margin: 5 }}>
							{_globalState.nickname}
						</Button>
					</Tooltip>
					<Tooltip title="设置">
						<Button icon="setting" style={{ margin: 5 }}>

						</Button>

					</Tooltip>
					<Tooltip title="退出系统">
						<Button icon="logout" style={{ margin: 5 }} onClick={() =>
							confirm({
								title: '要退出系统吗?',
								icon: <QuestionCircleOutlined />,
								content: '不想再多用一会儿？',
								onOk() {

									_globalDispatch({ 'type': 'logout' })
								},
								onCancel() {
									console.log('Cancel');
								},
							})
						}>


						</Button>

					</Tooltip>
				</Col>

			</Row>

		</Header>
	);

}

