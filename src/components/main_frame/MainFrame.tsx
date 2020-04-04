
import './main_frame.css';

import React, { useState, useContext } from 'react';

import { Layout, Menu, Spin, Icon, Alert } from 'antd';
import { HashRouter, Route, Redirect } from 'react-router-dom';

import { axios_response, axios_jsonpost } from '../../public_func/_axios'
import { globalContext } from '../../store/global_context'
import { Home } from '../home/Home'
import { UserManage } from '../user_manage/UserManage'
import { MyHeader } from '../my_header/MyHeader'
import { DatabaseLinks } from '../database_links/DatabaseLinks'
import { DatabasePipes } from '../database_pipes/DatabasePipes'
import { createHashHistory, createBrowserHistory } from 'history';
const browser = createBrowserHistory();
const history = createHashHistory();
const { Footer, } = Layout;
const { SubMenu } = Menu;
export interface LoginProps { compiler: string; framework: string; }
export const MainFrame = () => {

	const { Header, Sider, Content } = Layout;

	const [collapsed, setCollapsed] = useState(false);


	//let url_string='/system/users/login/'+login_user_name+'/'+login_user_password
	let { _globalState, _globalDispatch } = useContext(globalContext);
	let permission = _globalState.permission
	return (

		<Layout style={{ minHeight: '100vh' }}>
			<Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
				<div className="logo" style={{ height: "32px", background: 'rgba(255, 255, 255, 0.2)', margin: '16px' }} >社群关系分析系统</div>
				<Menu theme="dark" defaultSelectedKeys={['0']} mode="inline">
					{

						permission.map((item: any, index: number, array: any) => (item.m_type == 'module' ? <Menu.Item key={index} onClick={() => { history.push(item.m_route_url); }}>
							<Icon type={item.m_icon} theme="outlined" style={{ fontSize: '20px' }} />
							<span>{item.m_name}</span>
						</Menu.Item>
							: (
								<SubMenu
								onTitleClick={() => { history.push(item.m_route_url); }}
									key={"sub" + index}
									title={
										<span>
											<Icon type={item.m_icon} theme="outlined" style={{ fontSize: '20px' }} />
											<span>{item.m_name}</span>
										</span>
									}
								>
									{
										item.sub_module.map((sub_item: any, sub_index: number, sub_array: any) => (
											<Menu.Item key={index + "-" + sub_index} onClick={() => { history.push(sub_item.m_route_url); }}>{sub_item.m_name}</Menu.Item>
										)
										)}

								</SubMenu>
							)

						)
						)
					}
				</Menu>
			</Sider>
			<Layout className="site-layout">

				<MyHeader />
				<HashRouter>
					<div>


						<Route path='/home' exact render={() => <Home _breadcrumb={["首页"]} _icon={'home'} />}></Route>
						<Route path='/user_manage' exact render={() => <UserManage _breadcrumb={["系统管理", "用户管理"]} _icon={'control'} />}></Route>
						<Route path='/database_links' exact render={() => <DatabaseLinks _breadcrumb={["数据管理", "数据源"]} _icon={'database'} />}></Route>
						<Route path='/database_pipes' exact render={() => <DatabasePipes _breadcrumb={["数据管理", "数据源"]} _icon={'database'} />}></Route>

						<Redirect to="/home" from='/' />
					</div>
				</HashRouter>
				<Footer style={{ textAlign: 'center' }}>王利 ©2019 重庆市审计局金融处</Footer>
			</Layout>
		</Layout>


	);

}

