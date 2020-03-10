import React, { useState, useContext, useEffect } from 'react';

import { Tag, PageHeader, Steps, Layout, message, InputNumber, Modal, Row, Select, Spin, Input, Alert, Col, Table, Button, Typography, Divider } from 'antd';
import { globalContext } from '../../store/global_context'

import { axios_delete, axios_jsonput, axios_response, axios_jsonpost } from '../../public_func/_axios'
import { GuideDataSource } from './GuideDataSource'
import {GuideTableSql} from './GuideTableSql'
import {
	ExclamationCircleOutlined,
	HomeOutlined,
	SettingOutlined,
	MessageOutlined,
	LogoutOutlined,
	LoadingOutlined,
} from '@ant-design/icons';


import { InterComponentProps } from '../InterComponentProps'
import { generateUUID } from '../../public_func/uuid'
import { dateFormatterFull } from '../../public_func/date_extend'
import { getPartFromIpString, combineIps } from '../../public_func/net_common'
import { gen_db_url } from '../../public_func/database_common'
import {StepFooter} from '../../components/common_componets/StepFooter'
import { DetailTable } from './DetailTable'
import {GuideDataPreview} from './GuideDataPreview'
export interface DataSourceProps extends InterComponentProps { }
export const DatabasePipes = (props: DataSourceProps) => {
	const { Option } = Select;
	const { Step } = Steps;
	const { confirm } = Modal;

	const [data, setData] = useState()
	const [init_guide_datetime, setInitGuideDatetime] = useState(new Date)
	


	const [last_update_datetime, setLastUpdateDatetime] = useState(new Date)



	const { Header, Sider, Content } = Layout;
	const { Search } = Input;
	const { Title, Paragraph, Text } = Typography;

	const [new_update_confirmloading, setNewUpdateConfirmLoading] = useState(false)
	const [new_guide_dialog_visible, setNewGuideDialogVisible] = useState(false)
	//const [new_or_update, setNewOrUpdate] = useState('new')//类型分为new和update
	const [ok_button_disable, setOkButtonDisable] = useState(true)
	const [data_table_loading, setDataTableLoading] = useState(false);

	const [connecting, setConnecting] = useState(false)
	const [check_message, setCheckMessage] = useState('')
	const [last_modified, setLastModified] = useState(new Date)
	const [e_tag, setETag] = useState('')
	const [p_uuid, setDbUuid] = useState('')
	const [d_type,setDType]=useState('')
	const [source_type, setSourceType] = useState('Table')
	const [datalink_uuid,setDataLinkUuid]=useState('')
	const [source_sql,setSourceSql]=useState('')
	const [db_add_datetime, setDbAddDatetime] = useState(new Date)
	//向导有关
	const [step_current, setStepCurrent] = useState(0)

	//let get_permisssion_url_string = '/system/users/permission/' + user_uuid
	let { _globalState, _globalDispatch } = useContext(globalContext);
	return (
		<PageHeader
			ghost={false}
			onBack={() => window.history.back()}
			title="数据管道"
			subTitle="访问数据源中具体的数据表，建立指向具体数据的管道。"
			extra={[
				<Button key="3" icon="plus" onClick={() => {

					setLastModified(new Date)
					setStepCurrent(0)
					setNewGuideDialogVisible(true)


				}}>增加数据管道向导</Button>,
				<Button key="2" icon="reload" onClick={() => {
					setLastUpdateDatetime(new Date)
				}
				}
				>刷新列表数据</Button>,
				<Button key="1" type="primary">
					帮助
        </Button>,
			]}
		>

			<Content style={{ margin: '0 16px', textAlign: 'left' }}>
				<div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
					<Paragraph>
						在这里可以通过选择表或采用更灵活的SQL语句建立与外部数据的管道。一个管道对应一个数据。在之后的数据抽取中，节点和边的数据来源于此。
    </Paragraph>
					<Modal
						footer={null}
						confirmLoading={new_update_confirmloading}
						width='1000px'
						title='新增数据通道向导'
						visible={new_guide_dialog_visible}
						cancelText='取消'
						onCancel={() => {
							setNewGuideDialogVisible(false)
						}}
						okButtonProps={{ disabled: ok_button_disable }}

					>
						<Steps current={step_current}>

							<Step title="数据源" description="选择数据源及数据获取方式" />
							<Step title="数据" description="定义数据，查看数据" />
							<Step title="数据类型" description="确认数据字段类型 " />
						</Steps>
						<div className="steps-content">
							{step_current == 0 &&
								<GuideDataSource setDType={setDType} setDatabaseLinkUuid={setDataLinkUuid} setSourceType={setSourceType} source_type={source_type} />
							}
							{step_current == 1 &&
								<GuideTableSql d_type={d_type} setSourceSql={setSourceSql} source_type={source_type} datalink_uuid={datalink_uuid}  />
							}
							{
								step_current==2&&
								<GuideDataPreview d_type={d_type} source_sql={source_sql} datalink_uuid={datalink_uuid}/>
							}
						</div>
						<StepFooter current={step_current} setCurrent={setStepCurrent} steps_length={3} complete={()=>{}}/>
					</Modal>












					<DetailTable last_update_datetime={last_update_datetime} setLastUpdateDatetime={setLastUpdateDatetime} />
				</div>
			</Content>
		</PageHeader>
	);

}

