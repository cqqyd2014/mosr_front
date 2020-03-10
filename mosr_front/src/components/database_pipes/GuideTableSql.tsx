import React, { useState, useContext,useEffect } from 'react';

import { Typography, Row, Col, Select,Radio } from 'antd';
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
import {GuideTable} from './GuideTable'
export interface InterPropsTableSql {'setSourceSql':InterStateBack, 'source_type':string,'datalink_uuid':string,'d_type':string}
export const GuideTableSql = (props: InterPropsTableSql) => {
	const { Option } = Select;
	const { Title, Paragraph, Text } = Typography;
	
	
	return (


		<div>
			<Paragraph>
				请定义指向的数据，当前，你选择的方式为{props.source_type}。{props.source_type=='Table'?'现在你需要从可用的表中选择指向的表，以获取数据':''}
    </Paragraph>
			{props.source_type=='Table'?<GuideTable d_type={props.d_type} setSourceSql={props.setSourceSql} datalink_uuid={props.datalink_uuid} />:'XXX'}

		</div>


	);


}

