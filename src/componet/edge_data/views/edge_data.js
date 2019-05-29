import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import back_server from '../../../func/back_server';
import axios from 'axios';
import * as Actions from '../redux/actions';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import Alert from 'react-bootstrap/Alert'
import * as XLSX from 'xlsx';
import $ from 'jquery';
import InputGroup from 'react-bootstrap/InputGroup'

class EdgeData extends Component {
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
      edge_type: '',
      column_items: [],
      items_check_ok: false,
      label_items: [],
      new_label_value: '',
      

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



  onItemsCheck = () => {
    //是否有column_items，如果没有，表没有读取出来
    if (this.state.column_items.length == 0) {
      this.setState({ 'check_message': '数据表未选择或未能解析，请清理数据表' });
      this.setState({ 'check_type': 'danger' });
      this.setState({ 'items_check_ok': false });
      return;

    }
    //至少一个标签label_items
    if (this.state.edge_type == '') {
      this.setState({ 'check_message': '必须定义关系类型数据' });
      this.setState({ 'check_type': 'danger' });
      this.setState({ 'items_check_ok': false });
      return;
    }
    //有且只能有一个编码列
    let items = this.state.column_items;
    let key_flag = 0;
    for (let key in items) {
      let item = items[key];
      if (item.type == '起点') {
        key_flag++;
      }

    }
    if (key_flag != 1) {
      this.setState({ 'check_message': '必须定义一个起点列' });
      this.setState({ 'check_type': 'danger' });
      this.setState({ 'items_check_ok': false });
      return;
    }
    //有且只能有一个显示名称

    let display_flag = 0;
    for (let key in items) {
      let item = items[key];
      if (item.type == '终点') {
        display_flag++;
      }

    }
    if (display_flag != 1) {
      this.setState({ 'check_message': '必须定义一个终点列' });
      this.setState({ 'check_type': 'danger' });
      this.setState({ 'items_check_ok': false });
      return;
    }
    this.setState({ 'check_message': '校验通过，可以开始导入数据' });
    this.setState({ 'check_type': 'success' });
    this.setState({ 'items_check_ok': true });

  }
  onSubmit = () => {
    const data = new FormData();
    data.append('file', this.fileInput.current.files[0]);  //相当于 input:file 中的name属性
    data.append('column_items', JSON.stringify(this.state.column_items));
    data.append('edge_type', this.state.edge_type);
    fetch(back_server.restful_api_base_url() + 'edges_upload/', {
      method: 'POST',
      body: data
    }).then(response => {
      console.log(response)
      this.setState({ 'check_message': '数据导入成功' });
      this.setState({ 'check_type': 'success' });
    })
  };

  onDeleteLable = (index, event) => {
    let label_items = this.state.label_items;
    label_items.splice(index, 1)
    console.log(label_items)
    this.setState({ 'label_items': label_items })

  }

  onItemsChange = (index, event) => {

    let target = event.target;

    let column_items = this.state.column_items;
    let item = column_items[index];
    item = { 'column': item['column'], "type": target.value };
    column_items[index] = item;
    this.setState({ 'column_items': column_items });

  }

  onImportExcel = file => {
    // 获取上传的文件对象
    const { files } = file.target;
    // 通过FileReader对象读取文件
    const fileReader = new FileReader();
    fileReader.onload = event => {
      try {
        const { result } = event.target;
        // 以二进制流方式读取得到整份excel表格对象
        const workbook = XLSX.read(result, { type: 'binary' });
        let data = []; // 存储获取到的数据
        // 遍历每张工作表进行读取（这里默认只读取第一张表）
        for (const sheet in workbook.Sheets) {
          if (workbook.Sheets.hasOwnProperty(sheet)) {
            // 利用 sheet_to_json 方法将 excel 转成 json 数据
            data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet], { range: 'A1:Z5' }));
            // break; // 如果只取第一张表，就取消注释这行
          }
        }
        //console.log(data);
        let rows = [];
        let heads = [];

        let column_items = [];
        if (data.length > 2) {
          //得到head
          let item_head = data[0];

          for (let key in item_head) {

            heads.push(key);
            //通过heads生成column_items
            column_items.push({ 'column': key, "type": '其他属性' })

          }
          this.setState({ 'column_items': column_items });



          for (let item in data) {
            let row = []
            let data_item = (data[item]);


            for (let head in heads) {
              row.push(data_item[heads[head]]);
            }
            rows.push(row);


          }
          this.setState({ 'xls_heads': heads });
          this.setState({ 'xls_datas': rows });

        }

        //console.log(length(data));
      } catch (e) {
        // 这里可以抛出文件类型错误不正确的相关提示
        console.log('文件类型不正确');
        return;
      }
    };
    // 以二进制方式打开文件
    fileReader.readAsBinaryString(files[0]);
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
  onNodeTypeChange=(event)=>{
    let target = event.target

    this.setState({ 'node_type': target.value })
  }
  handleEdgeTypeChange = (event) => {
    let target = event.target

    this.setState({ 'edge_type': target.value })
  }
  handelNewLabelAdd = (event) => {
    if (this.state.new_label_value == '') {
      return;
    }
    let label_items = this.state.label_items;
    label_items.push(this.state.new_label_value);
    this.setState({ 'new_label_value': '' })
    this.setState({ 'label_items': label_items })
  }

  render() {


    return (

      <div className="content-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', flex: '1 1 auto' }}>
        <div className="content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', flex: '1 1 auto' }}>
          <div className="row" style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', flex: '1 1 auto' }}>
            <div className="col-lg-12" style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', flex: '1 1 auto' }}>
              <Form onSubmit={this.onSubmit} id="node_form">

                <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', flex: '1 1 auto' }}>
                  <Card.Header as="h5">自定义关系数据</Card.Header>
                  <Card.Body>
                    <Card.Title>1、选取电子表格</Card.Title>
                    <Card.Text>
                      关系数据有连个节点，该节点应该为节点的编码。注意，本系统默认只读取一个Sheet
    </Card.Text>

                    <div>
                      <input name='xls_file' type='file' accept='.xlsx, .xls' onChange={this.onImportExcel} ref={this.fileInput} />
                    </div>

                    <Card.Title>2、预览前5行数据</Card.Title>
                    <Card.Text>
                      A至Z列，第一行为标题列，无合并单元格
    </Card.Text>

                    <Table responsive>
                      <thead>
                        <tr>
                          {
                            this.state.xls_heads.map((row, index) => {
                              return (
                                <td key={index}>{row}</td>

                              )
                            })
                          }

                        </tr>
                      </thead>
                      <tbody>
                        {
                          this.state.xls_datas.map((row, r_index) => {
                            return (<tr key={r_index}>
                              {
                                this.state.xls_heads.map((head, h_index) => {
                                  return (
                                    <td key={h_index}>{row[h_index]}</td>

                                  )
                                })
                              }

                            </tr>
                            )
                          })
                        }
                      </tbody>
                    </Table>
                    <Card.Title>3、关系类型（显示名称）、起始节点、终点、其他属性</Card.Title>
                    <Card.Text>
                      关系类型是唯一的，也是显示名称。所有关系是有方向的，需要勇两个节点来描述，其他属性可选。
    </Card.Text>
                    
                    <div>
                    <Form.Label>关系类型（显示名称）</Form.Label>

                      <Form.Control type="text" placeholder="输入关系类型" value={this.state.edge_type} onChange={this.handleEdgeTypeChange} /> 
                    </div>
                    <div>定义属性</div>
                    <Table responsive>

                      <thead>
                        <tr>
                          <td>属性</td>
                          <td>定义</td>
                        </tr>
                      </thead>
                      <tbody>

                        {
                          this.state.column_items.map((row, index) => {

                            return (<tr key={index}>
                              <td >{row.column}</td>
                              <td>
                                <Form.Control as="select" value={this.state.column_items[index].type}  onChange={this.onItemsChange.bind(this, index)}>
                                  <option>起点</option>
                                  <option>终点</option>
                                  <option>其他属性</option>
                                  <option>不导入</option>

                                </Form.Control></td>
                            </tr>


                            )
                          })
                        }

                      </tbody>
                    </Table>
                    <Card.Title>3、开始导入</Card.Title>
                    <Card.Text>
                      确定以上信息，开始导入。
    </Card.Text>
                    {this.state.check_message != '' ? <Alert variant={this.state.check_type}>
                      {this.state.check_message}
                    </Alert> : ''}

                    <Button variant="primary" onClick={this.onItemsCheck}>第一步校验</Button>

                    {this.state.items_check_ok ? <Button variant="primary" onClick={this.onSubmit}>第二步开始导入</Button> : <Button variant="primary" disabled>第二步开始导入</Button>}


                  </Card.Body>
                </Card>



              </Form>
            </div>
          </div>
        </div>
      </div>





    );
  }


}
EdgeData.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(EdgeData);
