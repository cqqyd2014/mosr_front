import React, { useState,useContext } from 'react';

import { Modal, Input, Row, Col, Carousel } from 'antd';
import logo1_img from './img/logo1.png'
import logo2_img from './img/logo2.png'
import logo3_img from './img/logo3.png'
import logo4_img from './img/logo4.png'
import { axios_response } from '../../public_func/axios_response'
import {initState as globalState} from '../../store/global_state'
import {reducer as globalReducer} from '../../store/global_reducer'
import {globalContext} from '../../store/global_context'

export interface LoginProps { compiler: string; framework: string; }
export const Login = () => {
	
	

	const [login_visible, setLoginVisible] = useState(true);
	const [login_confirmLoading, setLoginConfirmLoading] = useState(false);
	const [login_user_name, setLoginUserName] = useState('');
	const [login_user_password, setLoginUserPassword] = useState('');
	
	let url_string='/system/users/login/'+login_user_name+'/'+login_user_password
	let {_globalState,_globalDispatch} = useContext(globalContext);
	
	console.log(_globalState)
	return (
		
		
		
		<div>

			<Modal
				title="请登陆社群关系分析系统"
				visible={login_visible}
				
				onOk={() => {

					
					if (login_user_name===''){
						Modal.error({
							title: '登陆系统',
							content: '用户名不能为空',
						});
						return
					}
					if (login_user_password===''){
						Modal.error({
							title: '登陆系统',
							content: '密码不能为空',
						});
						return
					}
					setLoginConfirmLoading(true);
					axios_response(
						{info_title:'登陆系统',
						
							url: url_string,

						}, (data) => {
							//console.log(data);
							if (data!=='error'){
								//用户名密码认证通过
							}
							setLoginConfirmLoading(false);
						}
					)
				}
				}
				onCancel={() => Modal.info({
					title: '感谢'+_globalState.user_last_login_datetime,
					content: (
						<div>
							<p>感谢局领导、金融处领导和同事们的支持，感谢家人的爱。</p>
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

