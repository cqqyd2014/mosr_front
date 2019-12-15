import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import back_server from '../../../func/back_server';
import axios from 'axios';
import * as Actions from '../redux/actions';
import io from 'socket.io-client';
import Modal from 'react-bootstrap/Modal'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'




class TycBatchCompany extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      company_list:[],
      import_show:false,
      xls_datas:[],
      new_company:''

     


    };

  }




  handelNewCompanyChange=(event)=>{
    let new_value=event.target.value
    this.setState({'new_company':new_value})

  }
  handelAddCompany=()=>{
    
  }


  componentDidMount = () => {
    




  }
  render() {


    return (

      <div className="content-wrapper" style={{display:'flex',flexDirection:'column',alignItems:'stretch',flex:'1 1 auto'}}>
      <div className="content" style={{display:'flex',flexDirection:'column',alignItems:'stretch',flex:'1 1 auto'}}>
        <div className="row" style={{display:'flex',flexDirection:'column',alignItems:'stretch',flex:'1 1 auto'}}>
          <div className="col-lg-12" style={{display:'flex',flexDirection:'column',alignItems:'stretch',flex:'1 1 auto'}}>

            {this.props.full === true ? '' : (<div className="card card-default" style={{flex:'1 1 auto'}}>
              
            <Alert variant="info">
  <Alert.Heading>根据单位名称查询天眼查信息</Alert.Heading>
  <p>
  先导入待查列表，再勾选查询。
  </p>
  
</Alert>
<Form.Group >
    <Form.Label>请输入单位名称</Form.Label>
    <Form.Control type="text" placeholder="XX公司" value={this.state.new_company} onChange={this.handelNewCompanyChange}/>
    <Button variant="primary" onClick={this.handelAddCompany}>
    加入待查列表
  </Button>
  </Form.Group>
              
              <div className="card-body">
                <Table responsive>
              <thead>
                <tr>
                  <th>勾选</th>
                  <th>单位名称</th>
                  <th>状态</th>
                  <th>加入时间</th>
                  <th>操作</th>

                </tr>
              </thead>
              <tbody>
                {
                  this.state.company_list.map((row, index) => {
                    return (<tr key={index}>
                      <td>{row.qt_datetime}</td>
                      <td>{row.qt_title}</td>
                      <td>{row.qt_desc}</td>
                      <td><Button variant="secondary" onClick={this.handelQueryClick.bind(this, index)}>运行查询</Button>
                      <Button variant="secondary" onClick={this.handelDeleteClick.bind(this, index)}>删除</Button>
                      <Button variant="secondary" onClick={this.handelExportClick.bind(this, index)}>导出</Button></td>
                    </tr>
                    )
                  })
                }
              </tbody>
            </Table>
            <Button variant="primary" onClick={this.handelImportClick}>导入模板</Button>
            <Modal show={this.state.import_show} onHide={this.handleImportClose}>
                <Modal.Header closeButton>
                  <Modal.Title>导入模板</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form.Group >
                    <Form.Label>选择m模板文件</Form.Label>
                    <input name='xls_file' type='file' accept='.xlsx, .xls' onChange={this.onImportExcel} ref={this.fileInput} />
                  </Form.Group>
                  
                  <Table responsive>
                      <thead>
                        <tr>
                         <td>UUID</td><td>时间</td><td>系统对象</td><td>cypher</td><td>名称</td><td>描述</td>

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
                </Modal.Body>
                <Modal.Footer>

                  <Button variant="primary" onClick={this.handleNodeClose}>
                    关闭
            </Button>
                </Modal.Footer>
              </Modal>
              </div>
            </div>
            )}
            





          </div>
        </div>
      </div>
    </div>





    );
  }


}
TycBatchCompany.propTypes = {
  //onComUSCCChange:PropTypes.func.isRequired,
  //onComNameChange:PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {

  return {
    rebuilding: state.SystemReducer.rebuilding,
    rebuild_message: typeof (state.SystemReducer.rebuild_message) == 'undefined' ? [] : [...state.SystemReducer.rebuild_message],
  };
}

const mapDispatchToProps = {
  onNodeLablesUpdateEnd: Actions.nodeLablesUpdateEndAction,
  onNodeLablesUpdateStart: Actions.nodeLablesUpdateStartAction,
  onEdgeTypesUpdateEnd: Actions.edgeTypesUpdateEndAction,
  onEdgeTypesUpdateStart: Actions.edgeTypesUpdateStartAction,
  onPropertiesUpdateEnd: Actions.propertiesUpdateEndAction,
  onPropertiesUpdateStart: Actions.propertiesUpdateStartAction,
  onRebuildDataStartAction: Actions.rebuildDataStartAction,
  onRebuildDataEndAction: Actions.rebuildDataEndAction,
  onRebuildDataProcessAction: Actions.rebuildDataProcessAction

};
export default connect(mapStateToProps, mapDispatchToProps)(TycBatchCompany);
