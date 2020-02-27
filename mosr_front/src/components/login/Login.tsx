import React, { useState, useContext } from 'react';

import { Modal, Input, Row, Col, Carousel, Typography, Divider } from 'antd';

import logo1_img from './img/logo1.png'
import logo2_img from './img/logo2.png'
import logo3_img from './img/logo3.png'
import logo4_img from './img/logo4.png'
import { axios_response } from '../../public_func/axios_response'
import { globalContext } from '../../store/global_context'

export interface LoginProps { compiler: string; framework: string; }
export const Login = () => {

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



		<div>

			<Modal
				title="请登陆社群关系分析系统"
				visible={login_visible}

				onOk={() => {


					if (login_user_name === '') {
						Modal.error({
							title: '登陆系统',
							content: '用户名不能为空',
						});
						return
					}
					if (login_user_password === '') {
						Modal.error({
							title: '登陆系统',
							content: '密码不能为空',
						});
						return
					}
					setLoginConfirmLoading(true);
					
					axios_response(
						{
							info_title: '登陆系统',

							url: login_url_string,

						}, (data: any) => {

							setLoginConfirmLoading(false);

							if (data !== 'error') {
								let get_permisssion_url_string = '/system/users/permission/' + data.u_uuid
								
								SetUserUuid(data.u_uuid)
								
								axios_response(
									{
										info_title: '获取权限',

										url: get_permisssion_url_string,

									}, (permission_data) => {
										console.log('获取')

										//更新登陆状态
										_globalDispatch({ type: 'login_success' });
									}
								)

							}

						}
					)
				}
				}
				onCancel={() => Modal.info({
					title: '感谢',
					content: (
						<div>
							<p>感谢局领导、金融处领导和同事们的支持，、、感谢家人的爱。</p>
							<p>如您有更好的建议，请与我联系13368431187</p>
						</div>
					),
					onOk() { },
				})}
				confirmLoading={login_confirmLoading}
				okText='登陆'
				cancelText='感谢'
			>
				<Row justify="space-around" align="middle">
					<Col span={24}>
						<Carousel autoplay>
							<div>
								<img src={logo4_img} alt='社群关系分析系统' />
							</div>
							<div>
								<img src={logo2_img} alt='社群关系分析系统' />
							</div>
							<div>
								<img src={logo3_img} alt='社群关系分析系统' />
							</div>
							<div>
								<img src={logo1_img} alt='社群关系分析系统' />
							</div>
						</Carousel>
					</Col>

				</Row>
				<Row>
					<Col>


						<Paragraph>
							随着数据化的趋势，越来越多的数据分析应用需要普通的审计人员参与。系统基于<Text mark>『高效能』和『易用性』</Text>
							的设计理念，降低对SQL语言的要求，让使用者专注于<Text strong>更好的分析体验</Text>。
    </Paragraph>
					</Col>
				</Row>
				<Row type="flex" justify="space-around" align="middle">
					<Col span={12} >
						<Row type="flex" justify="space-around" align="middle">
							<Col span={6} >用户名：</Col>
							<Col span={18}><Input value={login_user_name} onChange={(e) => setLoginUserName(e.target.value)} /></Col>
						</Row>
					</Col>
					<Col span={12}>
						<Row type="flex" justify="space-around" align="middle">
							<Col span={6}>密码：</Col>
							<Col span={18}><Input.Password value={login_user_password} onChange={(e) => setLoginUserPassword(e.target.value)} /></Col>
						</Row>
					</Col>
				</Row>
				<Row type="flex" justify="end">
					<Col span={12}>重庆市审计局 金融处 王利 20200201</Col>
				</Row>

			</Modal>

		</div>

	);

}

