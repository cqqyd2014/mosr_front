import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import back_server from '../../../func/back_server';
import axios from 'axios';
import * as Actions from '../redux/actions';
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import Alert from 'react-bootstrap/Alert'
import ListGroup from 'react-bootstrap/ListGroup'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

import * as XLSX from 'xlsx';
import $ from 'jquery';
import InputGroup from 'react-bootstrap/InputGroup'
import { Neo4JGraph } from '../../neo4jgraph';
import * as NeoGraphActions from '../../neo4jgraph/redux/actions'
import * as HeadActions from '../../head/redux/actions'
import { processDetail } from '../../../func/common';
import { MdPeople, MdCompareArrows, MdTrendingFlat, MdTimeline, MdBubbleChart, MdLibraryBooks,   } from "react-icons/md";
import { IconContext } from "react-icons";


class About extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      type_items: [],
      last_type: 'node',//为node或者edge
      item_list: [
        { 'name':'N1','type': 'node', 'select_labels': [] }
      ],
      limit_count: 50,
      node_show: false,
      click_item: 0,
      edge_show: false,
      save_show:false,
      cyphter_sql:'',
      save_title:'',
      save_desc:''






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
   

  }

  render() {

    let item_count = this.state.item_list.length;
    return (

      <div className="content-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', flex: '1 1 auto' }}>
        <div className="content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', flex: '1 1 auto' }}>
          <div className="row" style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', flex: '1 1 auto' }}>
            <div className="col-lg-12" style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', flex: '1 1 auto' }}>

              {this.props.full == true ? '' : (<div className="card card-default" style={{ flex: '1 1 auto' }}>
                <div className="card-header  justify-content-between">
                  <h2>重庆市审计局金融处</h2>
                </div>
                <div className="card-body">
                  <blockquote className="blockquote">
                    <p className="mb-0">随着人工智能的到来，新型金融机构及其业务的层出不穷，互联网新金融的兴起和大数据、云计算的影响，金融审计呈现新的趋势——业务穿透审计、资金流跟踪审计、重大金融风险预警审计……对金融审计人提出了更高的要求。2018年初，根据“风险防控跟踪审计”的需要，我们思考如何实现海量数据的智能化设计——数据可视化、建模智能化。希望实现“以业务为导向，以智能化为方向，以大数据为依托”的一套全新的分析系统。历时一年，考察了各种大数据技术，最终确定了以图数据库为核心的方案，力图实现社会关系网络的智能化知识发现。</p>
                    <p className="mb-0">感谢全处同志为该项目所作的贡献。感谢周红东、徐晓静两届金融处领导对本项目的指引。感谢计算机处有关同志对我们的支持。感谢局各级领导对金融处的关心和厚爱。</p>
                    <p className="mb-0">如有任何疑问，请与金融处王利联系，电话13368431187，邮箱wangli2000_cn@126.com。</p>
                  </blockquote>
                  
                  
                    <IconContext.Provider value={{ color: "gray", size: "2em" }}>
                     
                    </IconContext.Provider>
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
About.propTypes = {
  //onComUSCCChange:PropTypes.func.isRequired,
  //onComNameChange:PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    node_lables_data: state.SystemReducer.node_lables_data,
    edge_types_data: state.SystemReducer.edge_types_data,
    full: state.neo4jGraphReducer.full
  };
}

const mapDispatchToProps = {
  neo4jgraphChange: NeoGraphActions.neo4jCypherChangeAction,
  onNodeMessageChange: HeadActions.headMessageChangeAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(About);
