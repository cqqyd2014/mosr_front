import React, { useState, useContext,useEffect } from 'react';

import { Typography, Button, Col, Select,Radio } from 'antd';
import { globalContext } from '../../store/global_context'
import { axios_delete, axios_jsonput, axios_response, axios_jsonpost } from '../../public_func/_axios'

import {
	UserOutlined,
	HomeOutlined,
	SettingOutlined,
	MessageOutlined,
	LogoutOutlined,
	LoadingOutlined,
} from '@ant-design/icons';

import {InterStateBack} from '../../interface/InterStateBack'

export interface InterButtonClick {
	(): void
}


export interface InterPropsDataSource { 'current':number,'setCurrent':InterStateBack,'steps_length':number,'complete':InterButtonClick}
export const StepFooter = (props: InterPropsDataSource) => {
	const { Option } = Select;
	const { Title, Paragraph, Text } = Typography;
	
	
	return (


		<div className="steps-action">
							{props.current < props.steps_length - 1 && (
								<Button type="primary" onClick={() => {
									const current = props.current + 1;
    props.setCurrent( current );
}}>
									下一步
            </Button>
							)}
							{props.current === props.steps_length - 1 && (
								<Button type="primary" onClick={() => props.complete}>
									完成
            </Button>
							)}
							{props.current > 0 && (
								<Button style={{ marginLeft: 8 }} onClick={() =>{
									 const current = props.current - 1;
    props.setCurrent( current );
								}}>
									上一步
            </Button>
							)}
						</div>

	);


}

