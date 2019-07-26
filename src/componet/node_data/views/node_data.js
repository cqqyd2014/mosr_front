import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import back_server from '../../../func/back_server';
import axios from 'axios';
import { SelectPreviewTable } from '../../../common_componet/select_preview_table'
import { DefinitionDatabaseConnection } from '../../../common_componet/definition_database_connection'

import ImportNode from './import_node'
import ImportEdge from './import_edge'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import Alert from 'react-bootstrap/Alert'
import Accordion from 'react-bootstrap/Accordion'
import { MdApps ,MdPeople} from "react-icons/md";
import * as XLSX from 'xlsx';

import InputGroup from 'react-bootstrap/InputGroup'

class NodeData extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      current_log: '当前无运行',
      flag_show_process_detail: false,
      process_detail_data: [],
      openXlsFlag: false,
      xls_datas: [],
      xls_heads: [],
      check_message: '',
      check_type: 'success',
      edge_type:'',
      column_items: [],
      items_check_ok: false,
      label_items: [],
      new_label_value: '',
      db_connected: false,
      db_type: '',
      db_address: '',
      db_port: '',
      db_name: '',
      db_username: '',
      db_password: '',
      select_table: '',
      node_edge: 'node',

      //select_tabel_cols:[],



    };

  }
  /*
  handelSubmit=(event)=>{
    event.preventDefault();
 
  }
  handleComUSCCChange=(event)=>{
    //console.log(event.target.value);
    this.props.onComUSCCChange(event.target.value);
  }
  handleComNameChange=(event)=>{
    this.props.onComNameChange(event.target.value);
  }
  handleTextChange=(event)=>{
    let o=event.target;
    let target_value={[o.name]:o.value}
    //let target_value={[o.name]:'f'}
    let old=this.state.form_value;
    let new_value=Object.assign({},old,target_value)
    console.log(new_value);
    this.setState({form_value:new_value});
  }
  getTextState=(id)=>{
    let form_value=this.state.form_value;
    let value=form_value[id];
    return value;
 
  }
  handleInvestAmountChange=(event)=>{
    let amount=event.target.value;
    this.setState({
      invest_amount:amount,
      invest_amount_big:math.rmbToBig(amount),
      invest_amount_thousand:math.moneyToThousand(amount)
    });
    
  }
  */


  reInitCols=()=>{
    let column_items=this.state.column_items
    let table_cols=[]
    let table_cols_types=[]
    for (let index in column_items){
      table_cols.push(column_items[index][0])
      table_cols_types.push(column_items[index][1])
    }
    this.onGetCols(table_cols,table_cols_types)

  }
  onGetCols = (table_cols, table_cols_types) => {


    let select_tabel_cols = []
    for (let item in table_cols) {
      let import_type
      switch (table_cols_types[item]) {
        case 'string':
          import_type = '文本属性'
          break;
        case 'float':
          import_type = '浮点数属性'
          break;
        default:
          import_type = '整数属性'
      }
      let cols = [table_cols[item], table_cols_types[item], import_type]
      select_tabel_cols.push(cols)
    }



    this.setState({ 'column_items': select_tabel_cols });

    //this.setState({ 'select_tabel_cols_types': table_cols_types });

  }

  onSelectTable = (select_table) => {

    this.setState({ 'select_table': select_table })
    this.setState({'items_check_ok':false})
  }



  onSubmit = () => {
    const data = new FormData();
    //data.append('file', this.fileInput.current.files[0]);  //相当于 input:file 中的name属性
    /*
    db_type: '',
      db_address: '',
      db_port: '',
      db_name: '',
      db_username: '',
      db_password: '',
      select_table: '',
      */
     data.append('db_type', this.state.db_type);
     data.append('db_address', this.state.db_address);
     data.append('db_port', this.state.db_port);
     data.append('db_name', this.state.db_name);
     data.append('db_username', this.state.db_username);
     data.append('db_password', this.state.db_password);
     data.append('select_table', this.state.select_table);

    data.append('column_items', this.state.column_items);
    data.append('label_items', this.state.label_items);
    console.log(this.state.node_edge)
    data.append('node_edge', this.state.node_edge);
    data.append('edge_type', this.state.edge_type);
    fetch(back_server.restful_api_base_url() + 'import_queue_upload/', {
      method: 'POST',
      body: data
    }).then(response => {
      console.log(response)
      this.setState({ 'import_message': '加入队列成功，请关注数据采集情况' });
      this.setState({ 'import_type': 'success' });
    })
  };


  onDbConnected = (flag, db_type, db_address, db_port, db_name, db_username, db_password) => {
    this.setState({ 'db_connected': flag })
    this.setState({ 'db_type': db_type })
    this.setState({ 'db_address': db_address })
    this.setState({ 'db_port': db_port })
    this.setState({ 'db_name': db_name })
    this.setState({ 'db_username': db_username })
    this.setState({ 'db_password': db_password })
    if (flag) {
      this.preView.getTables()
    }
    this.setState({'items_check_ok':false})

  }

  onItemsChange = (column_items) => {


    this.setState({ 'column_items': column_items });

  }
  onCheck=(flag)=>{
    this.setState({'items_check_ok':flag})
  }



  handleRefeshProcessDetail = (event) => {

    axios.get(back_server.restful_api_base_url() + 'ProcessDetail/?limit=10')
      .then((response) => {
        //let data=database.baseparameter(response);
        //console.log(response);
        this.setState({ 'process_detail_data': response.data })
        this.setState({ 'flag_show_process_detail': true })

      })
      .catch(function (error) {
        console.log(error);
      });

  }
  handleChooseXlsHide = (event) => {
    this.setState({ 'openXlsFlag': false });

  }
  openXls = (event) => {

    this.setState({ 'openXlsFlag': true });
  }
  componentDidMount = () => {
    //console.log(system_info.restful_api_base_url());
    /* axios_ajax.get(system_info.restful_api_base_url(),'api/baseparameter/money_type',{},this,(a,b)=>{
      console.log(a);
      console.log(b);
    }); 
    axios.get(system_info.restful_api_base_url()+'api/baseparameter/money_type')
  .then((response)=> {
    let data=database.baseparameter(response);
    //console.log(data);
    this.setState({invest_money_types:data});
 
  })
  .catch(function (error) {
    console.log(error);
  });
*/
  }

  onLabelChange = (label_items) => {
    

    this.setState({ 'label_items': label_items })
  }
 

  onPreView = (ref) => {
    this.preView = ref
  }
  node_edge_change = (value, event) => {
    this.setState({ 'node_edge': value })
    this.setState({'items_check_ok':false})
    this.setState({ 'label_items': [] })
    this.setState({ 'edge_type': '' })
    this.reInitCols()
  }
  onEdgeTypeChange=(type)=>{
    this.setState({'edge_type':type})
  }

  render() {


    return (

      <div className="content-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', flex: '1 1 auto' }}>
        <div className="content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', flex: '1 1 auto' }}>
          <div className="row" style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', flex: '1 1 auto' }}>
            <div className="col-lg-12" style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', flex: '1 1 auto' }}>
              <Form onSubmit={this.onSubmit} id="node_form">

              <Alert  variant='info'>
              <Alert.Heading>从远程数据库下载数据</Alert.Heading>
  <p>
              节点数据一般为自然人或者法人机构。自然人最少字段应该包括身份证号码和姓名，法人最少应包含统一社会信用代码和单位名称。节点标签可以为一组。关系数据需要指定起点和终点，关系类型为单一类型。
  </p></Alert>
                    
                      
 
                    <DefinitionDatabaseConnection onDbConnected={this.onDbConnected} />
                    {this.state.db_connected ? <div>
                      <SelectPreviewTable onGetCols={this.onGetCols} onSelectTable={this.onSelectTable} onRef={this.onPreView} db_type={this.state.db_type} db_address={this.state.db_address} db_port={this.state.db_port} db_name={this.state.db_name} db_username={this.state.db_username} db_password={this.state.db_password} />
                      <Card bg="light" style={{ flex: '1 1 auto' }}>
        <Card.Header><MdApps />选择并预览表格</Card.Header>
        <Card.Body>
          <Card.Title>选择表格之后，系统将预览前5条记录</Card.Title>
                      <Accordion defaultActiveKey={this.state.node_edge}>
                      <Card>
                        <Accordion.Toggle as={Button} variant="link" eventKey="node" onClick={this.node_edge_change.bind(this, 'node')}>
                          节点
                                                    </Accordion.Toggle>
                        <Accordion.Collapse eventKey="node">
                        <Card.Body>
                          <ImportNode onCheck={this.onCheck} label_items={Array.of(...this.state.label_items)} onLabelChange={this.onLabelChange} column_items={Array.of(...this.state.column_items)} onItemsChange={this.onItemsChange} />
                          </Card.Body>
                        </Accordion.Collapse>

                        </Card>
                                            <Card>
                        <Accordion.Toggle as={Button} variant="link" eventKey="edge" onClick={this.node_edge_change.bind(this, 'edge')}>
                          关系
    </Accordion.Toggle>
    
                        <Accordion.Collapse eventKey="edge">
                        <Card.Body> 
                          
                          
                        <ImportEdge onCheck={this.onCheck} onEdgeTypeChange={this.onEdgeTypeChange} edge_type={this.state.edge_type} column_items={Array.of(...this.state.column_items)} onItemsChange={this.onItemsChange} />
                         </Card.Body>

                        </Accordion.Collapse>
                        </Card>
                      </Accordion>

                      </Card.Body>
      </Card>


                    </div>
                      : ''}

                    

                   
                  

                    {this.state.items_check_ok ? <Button variant="primary" onClick={this.onSubmit}>加入数据采集队列</Button> : <Button variant="primary" disabled>加入数据采集队列</Button>}

{this.state.import_message !== '' ? <Alert variant={this.state.import_type}>
{this.state.import_message}
</Alert> : ''}
               



              </Form>
            </div>
          </div>
        </div>
      </div>





    );
  }


}
NodeData.propTypes = {
  //onComUSCCChange:PropTypes.func.isRequired,
  //onComNameChange:PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    message: state.HeadReducer.message,
    alter_type: state.HeadReducer.alter_type
  };
}

const mapDispatchToProps = {
  /* 
    onComUSCCChange:Actions.comUSCCChangeAction,
    onComNameChange:Actions.comNameChangeAction 
   */
};
export default connect(mapStateToProps, mapDispatchToProps)(NodeData);
