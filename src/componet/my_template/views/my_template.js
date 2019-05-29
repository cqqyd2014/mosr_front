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
import { Neo4JGraph } from '../../neo4jgraph';
import * as NeoGraphActions from '../../neo4jgraph/redux/actions'
import * as HeadActions from '../../head/redux/actions'
import {processDetail} from '../../../func/common';

class MyTempalte extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      my_templates:[],
      

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


  componentDidMount = () => {
    //console.log("did mount");
    
    

    axios.get(back_server.restful_api_base_url() + 'my_templates/')
      .then((response) => {
        //let data=database.baseparameter(response);
        console.log(response.data);
        this.setState({ 'my_templates': response.data })
        

      })
      .catch(function (error) {
        console.log(error);
      });
  }
  onLableClick=(index,event)=>{

    //console.log(index);
    //console.log(this.state.label_items);
    let items=(this.props.node_lables_data);
    let item=items[index];
    //console.log(item)
    let neo4jgraph_cypher='match (n:'+item+') return n limit 50'
    this.child.refeshdata(neo4jgraph_cypher);
    
  }
  onRef = (ref) => {
    this.child = ref
}
handelQueryClick=(index,event)=>{
  let cypher_sql=this.state.my_templates[index].qt_cypher
  cypher_sql = cypher_sql.substr(1, cypher_sql.length-2); 
  console.log(cypher_sql);
  this.child.refeshdata(cypher_sql);
}
  render() {


    return (

      <div className="content-wrapper" style={{display:'flex',flexDirection:'column',alignItems:'stretch',flex:'1 1 auto'}}>
      <div className="content" style={{display:'flex',flexDirection:'column',alignItems:'stretch',flex:'1 1 auto'}}>
        <div className="row" style={{display:'flex',flexDirection:'column',alignItems:'stretch',flex:'1 1 auto'}}>
          <div className="col-lg-12" style={{display:'flex',flexDirection:'column',alignItems:'stretch',flex:'1 1 auto'}}>

            {this.props.full == true ? '' : (<div className="card card-default" style={{flex:'1 1 auto'}}>
              <div className="card-header  justify-content-between">
                <h2>我的查询模板</h2>
              </div>
              <div className="card-body">
                <blockquote className="blockquote">
                  <p className="mb-0">保存的查询模板</p>
                </blockquote>
                <Table responsive>
              <thead>
                <tr>
                  <th>保存时间</th>
                  <th>查询名称</th>
                  <th>查询描述</th>
                  <th>运行查询</th>

                </tr>
              </thead>
              <tbody>
                {
                  this.state.my_templates.map((row, index) => {
                    return (<tr key={index}>
                      <td>{row.qt_datetime}</td>
                      <td>{row.qt_title}</td>
                      <td>{row.qt_desc}</td>
                      <td><Button variant="secondary" onClick={this.handelQueryClick.bind(this, index)}>运行查询</Button></td>
                    </tr>
                    )
                  })
                }
              </tbody>
            </Table>
              </div>
            </div>
            )}
            <Neo4JGraph style={{display:'flex',alignItems:'stretch',flex:'1 1 auto'}} onRef={this.onRef}/>





          </div>
        </div>
      </div>
    </div>





    );
  }


}
MyTempalte.propTypes = {
  //onComUSCCChange:PropTypes.func.isRequired,
  //onComNameChange:PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    node_lables_data: state.SystemReducer.node_lables_data,
    full: state.neo4jGraphReducer.full
  };
}

const mapDispatchToProps = {
  neo4jgraphChange: NeoGraphActions.neo4jCypherChangeAction,
  onNodeMessageChange:HeadActions.headMessageChangeAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(MyTempalte);
