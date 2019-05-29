import React,{Component} from 'react';
import {connect} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import Table from 'react-bootstrap/Table'
import axios from 'axios';
import back_server from '../../../func/back_server';

import {NavDropdown,Nav,Navbar,FormControl,InputGroup,ButtonToolbar,Form,Row,Col,Button,FormGroup,Label,Input,Container} from 'reactstrap';
class SystemData extends Component {
    constructor(props) {
      super(props);
      this.state={
        system_data:[],
          
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

      axios.get(back_server.restful_api_base_url()+'SystemData/')
    .then((response)=> {
      //let data=database.baseparameter(response);
      //console.log(response);
      this.setState({system_data:response.data});
  
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
                        <h2>系统现有数据 </h2>
                      </div>
                      <div className="card-body">
                        <blockquote className="blockquote">
                          <p className="mb-0">系统现有基础数据可直接使用，包含工商、婚姻登记等信息。</p>
                        </blockquote>
                        <Table responsive>
  <thead>
    <tr>
      <th>数据名称</th>
      <th>数据截至时间</th>
      <th>记录条数</th>
      
      
    </tr>
  </thead>
  <tbody>
  {
    this.state.system_data.map((row,index)=>{
      return (<tr key={index}>
                 <td>{row.system_data.sys_name}</td>
                 <td>{row.system_data.sys_end_date}</td>
                 <td>{row.system_data.sys_count}</td>
                 
                 </tr>
                  )
              })
            }
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
  SystemData.propTypes = {
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
  export default connect(mapStateToProps, mapDispatchToProps)(SystemData);
