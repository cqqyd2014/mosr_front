import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import back_server from '../../../func/back_server';
import axios from 'axios';

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Alert from 'react-bootstrap/Alert'
import { MdPeople, MdViewComfy, MdTimer, MdAssignment, MdTimeline } from "react-icons/md";
class Head extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_log: '当前无运行',
      flag_show_process_detail: false,
      process_detail_data: [],
      node_labels_update_status: '更新中...',
      edge_type_update_status: '更新中...',
      labels_items: [],
      types_items: [],

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
  handleProcessDetailModalClose = (event) => {
    this.setState({ 'flag_show_process_detail': false })
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

  render() {
    return (

      <header className="main-header " id="header">
        <nav className="navbar navbar-static-top navbar-expand-lg"  >
          {/*<!-- Sidebar toggle button -->*/}
          <button id="sidebar-toggler" className="sidebar-toggle">
            <span className="sr-only">收放导航栏</span>
          </button>
          {/*<!-- search form -->*/}
          <div className="search-form d-none d-lg-inline-block" style={{ display: 'flex', flex: '1 1 auto' }}>
            <div className="input-group" style={{ alignItems: 'stretch', display: 'flex', flex: '1 1 auto', padding: '0px' }}>
              <Alert variant={this.props.alter_type} style={{ alignItems: 'stretch', flex: '1 1 auto', margin: '0px' }}>
                {this.props.message}
              </Alert>
            </div>

          </div>

          <div className="navbar-right ">
            <ul className="nav navbar-nav">
              {/*<!-- Github Link Button -->*/}
              <li className="github-link mr-3">
                <a className="btn btn-outline-secondary btn-sm" href="#" onClick={this.handleRefeshProcessDetail}>
                  <span className="d-none d-md-inline-block mr-2">查看运行日志</span>
                  <i className="mdi mdi-github-circle"></i>
                </a>

              </li>
              <li className="dropdown notifications-menu">
                <button className="dropdown-toggle" data-toggle="dropdown">
                  <MdViewComfy />
                </button>
                <ul className="dropdown-menu dropdown-menu-right">
                  <li className="dropdown-header">系统指标准备情况</li>
                  <li>
                    <a href="#">
                      <MdPeople /> 节点标签更新情况
                          <span className=" font-size-12 d-inline-block float-right"><MdTimer />{this.props.update_labels}</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <MdTimeline /> 关系类型更新情况
                          <span className=" font-size-12 d-inline-block float-right"><MdTimer />{this.props.update_types}</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <MdAssignment /> 属性更新情况
                          <span className=" font-size-12 d-inline-block float-right"><MdTimer />{this.props.update_properties}</span>
                    </a>
                  </li>

                </ul>
              </li>


            </ul>
          </div>
        </nav>
        <Modal
          size="lg"
          show={this.state.flag_show_process_detail}
          onHide={this.handleProcessDetailModalClose}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              历史运行记录
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table responsive>
              <thead>
                <tr>
                  <th>启动时间</th>
                  <th>类型</th>
                  <th>命令</th>


                </tr>
              </thead>
              <tbody>
                {
                  this.state.process_detail_data.map((row, index) => {
                    return (<tr key={index}>
                      <td>{row.process_detail.pd_start_datetime}</td>
                      <td>{row.system_code.code_value}</td>
                      <td>{row.process_detail.pd_command}</td>
                    </tr>
                    )
                  })
                }
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleProcessDetailModalClose}>关闭</Button>
          </Modal.Footer>
        </Modal>

      </header>




    );
  }


}
Head.propTypes = {
  //onComUSCCChange:PropTypes.func.isRequired,
  //onComNameChange:PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    update_labels: state.SystemReducer.update_labels,
    update_types: state.SystemReducer.update_types,
    update_properties: state.SystemReducer.update_properties,




    message:state.HeadReducer.message,
    alter_type:state.HeadReducer.alter_type,
    
  };
}

const mapDispatchToProps = {



};
export default connect(mapStateToProps, mapDispatchToProps)(Head);
