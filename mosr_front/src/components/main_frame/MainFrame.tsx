
import './main_frame.css';

import React, { useState,useContext } from 'react';

import { Layout, Menu, Breadcrumb, Icon } from 'antd';


import { axios_response } from '../../public_func/axios_response'
import {globalContext} from '../../store/global_context'
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
export interface LoginProps { compiler: string; framework: string; }
export const MainFrame = () => {
	
	const { Header, Sider, Content } = Layout;

	const [collapsed, setCollapsed] = useState(false);
	
	
	//let url_string='/system/users/login/'+login_user_name+'/'+login_user_password
	let {_globalState,_globalDispatch} = useContext(globalContext);
	return (
		
		<Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={()=>setCollapsed(!collapsed)}>
          <div className="logo" style={{ height: "32px",background: 'rgba(255, 255, 255, 0.2)',  margin: '16px'}} >社群关系分析系统</div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Icon type="home" />
              <span>首页</span>
            </Menu.Item>
            <SubMenu
              key="sub0"
              title={
                <span>
                  <Icon type="database" />
                  <span>数据管理</span>
                </span>
              }
            >
              <Menu.Item key="2">定义数据链接</Menu.Item>
              <Menu.Item key="3">定义采集模板</Menu.Item>
              <Menu.Item key="4">采集数据</Menu.Item>
				<Menu.Item key="5">处理数据片</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>User</span>
                </span>
              }
            >
              <Menu.Item key="6">Tom</Menu.Item>
              <Menu.Item key="7">Bill</Menu.Item>
              <Menu.Item key="8">Alex</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="team" />
                  <span>Team</span>
                </span>
              }
            >
              <Menu.Item key="9">Team 1</Menu.Item>
              <Menu.Item key="10">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="11">
              <Icon type="file" />
              <span>File</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>Bill is a cat.</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>王利 ©2019 重庆市审计局金融处</Footer>
        </Layout>
      </Layout>
		
		
	);

}

