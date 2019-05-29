import React,{Component} from 'react';
import {connect} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import Table from 'react-bootstrap/Table'
import axios from 'axios';
import back_server from '../../../func/back_server';

import {NavDropdown,Nav,Navbar,FormControl,InputGroup,ButtonToolbar,Form,Row,Col,Button,FormGroup,Label,Input,Container} from 'reactstrap';
class SystemStatus extends Component {
    constructor(props) {
      super(props);
      this.state={
        free_space:0,
        system_default_dir:'',
        free_mem:0
          
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
    componentDidMount=()=>{

      axios.get(back_server.restful_api_base_url()+'systemstatus/')
    .then((response)=> {
      //let data=database.baseparameter(response);
      //console.log(response);
      this.setState({system_default_dir:response.data.system_default_dir});
      this.setState({free_space:response.data.free_space});
  
    })
    .catch(function (error) {
      console.log(error);
    });

    }
    
    render() {
      return (

            <div className="content-wrapper">
              <div className="content">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="card card-default">
                      <div className="card-header  justify-content-between">
                        <h2>分析服务器可用资源 </h2>
                      </div>
                      <div className="card-body">
                        <blockquote className="blockquote">
                          <p className="mb-0">系统运行时将在分析服务器上生成分析数据，需关注服务器可用资源状况。</p>
                        </blockquote>
                        <Table responsive>
  <thead>
    <tr>
      <th>项目</th>
      <th>详情</th>
      
      
      
    </tr>
  </thead>
  <tbody>
  <tr>
      <td>数据存储目录</td>
      <td>{this.state.system_default_dir}</td>
  </tr>
  <tr>
      <td>可用磁盘空间（单位MB）</td>
      <td>{this.state.free_space}</td>
  </tr>
  </tbody>
</Table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>

        

        
      );
    }
    
  
  }
  SystemStatus.propTypes = {
    //onComUSCCChange:PropTypes.func.isRequired,
    //onComNameChange:PropTypes.func.isRequired,
    }
  
  const mapStateToProps = (state) => {
    return {
      //todos: selectVisibleTodos(state.todos, state.filter)
    };
  }
  
  const mapDispatchToProps = {
    /* 
      onComUSCCChange:Actions.comUSCCChangeAction,
      onComNameChange:Actions.comNameChangeAction 
     */
  };
  export default connect(mapStateToProps, mapDispatchToProps)(SystemStatus);
