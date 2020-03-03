import React, { useState, useContext } from 'react';

import { Layout, Spin, Alert, Col, Carousel, Typography, Divider } from 'antd';

import { MyBreadCrumb } from '../my_breadcrumb/MyBreadCrumb'
import { axios_response,axios_jsonpost } from '../../public_func/_axios'
import { globalContext } from '../../store/global_context'
import {InterComponentProps} from '../InterComponentProps'
export interface LoginProps extends InterComponentProps{}

export const UserManage = (props:LoginProps) => {
	
	const { Header, Sider, Content } = Layout;

	console.log(props._breadcrumb)
	return (
<Content style={{ margin: '0 16px' , textAlign: 'left'}}>

            <MyBreadCrumb _breadcrumb={props._breadcrumb} _icon={props._icon}/>
<Spin tip="Loading...">
    <Alert
      message="Alert message title"
      description="Further details about the context of this alert."
      type="info"
    />
  </Spin>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
ertertertr
</div>
          </Content>
	);

}

