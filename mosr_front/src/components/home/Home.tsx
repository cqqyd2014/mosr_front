import React, { useState, useContext } from 'react';

import { Layout, Breadcrumb, Row, Col, Carousel, Typography, Divider } from 'antd';


import { axios_response,axios_jsonpost } from '../../public_func/_axios'
import { globalContext } from '../../store/global_context'
import home_img from './img/home.png'
import { MyBreadCrumb } from '../my_breadcrumb/MyBreadCrumb'

import { InterComponentProps } from '../InterComponentProps'
export interface HomeProps extends InterComponentProps { }
export const Home = (props: HomeProps) => {
	const { Header, Sider, Content } = Layout;

	const { Title, Paragraph, Text } = Typography;

	const [login_visible, setLoginVisible] = useState(true);
	const [login_confirmLoading, setLoginConfirmLoading] = useState(false);
	const [login_user_name, setLoginUserName] = useState('');
	const [login_user_password, setLoginUserPassword] = useState('');
	const [user_uuid, SetUserUuid] = useState('');

	let login_url_string = '/system/users/login/' + login_user_name + '/' + login_user_password
	//let get_permisssion_url_string = '/system/users/permission/' + user_uuid
	let { _globalState, _globalDispatch } = useContext(globalContext);
	return (

		<Content style={{ margin: '0 16px', textAlign: 'left' }}>
			<MyBreadCrumb _breadcrumb={props._breadcrumb} _icon={props._icon}/>


			<div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
				<img src={home_img} style={{ width: '100%' }} />
				<Typography>
					<Title>大拐点：传统审计方式会像马车一样被淘汰</Title>
					<Paragraph>
						<Text mark>「这是一个旧时代的结尾，也是一个新时代的开端，充满了失望，也抽长着希望，充满了残暴，也有很多温柔，如此逼近又如此看不清楚。」</Text>
					</Paragraph>
					<Divider />
					<Paragraph>

						今天的科技领域，也正在发生着一些悄无声息的剧变，正如余光中在上面的《地图》一文中写到的那样。一个明显的征兆是，信息化，数字化，智能化，带来的社群关系的数据化，我们都是这样数字网络的结点，通过QQ、微信……与其他的人联系在一起——现实地社群网络已经成为数字化虚拟网络世界。
    </Paragraph><Paragraph>
					因此，数据审计也走到了这样一个拐点，从关注单个审计对象到关注对象所处的社群关系，并发现由此产生的“知识”。“关联所有数据资源实现社群知识画像”是我们想达到的目的，同时还要“扔掉SQL处理数据 ”、“可视化处理数据 ”、“处理TB级海量数据 ”……。请跟我一起来探索社群知识的秘密吧！
    </Paragraph><Divider />
				</Typography>
			</div>
		</Content>
	);

}

