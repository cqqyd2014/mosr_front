import React, { useState, useContext } from 'react';

import { Breadcrumb,Icon } from 'antd';
import { globalContext } from '../../store/global_context'

import {
	UserOutlined,
	HomeOutlined,
	SettingOutlined,
	MessageOutlined,
	LogoutOutlined,
	LoadingOutlined,
} from '@ant-design/icons';

import home_img from './img/home.png'
export interface MyBredCrumbProps { _breadcrumb: string[],_icon:string}
export const MyBreadCrumb = (props:MyBredCrumbProps) => {

	return (
		<span>
		
		<Breadcrumb style={{ margin: '16px 0' }}>
		
              
              {
	props._breadcrumb.map((item: any, index: number, array: any) => 
	index===0?
	<Breadcrumb.Item key={index}>
	<Icon type={props._icon} theme="outlined" />
	<span>{item}</span></Breadcrumb.Item>
	:
	<Breadcrumb.Item key={index}>
	
	<span>{item}</span></Breadcrumb.Item>
	)
}
            </Breadcrumb>
</span>
		
	);

}

