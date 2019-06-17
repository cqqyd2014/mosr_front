import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import back_server from '../../../func/back_server';
import axios from 'axios';

import Modal from 'react-bootstrap/Modal'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'



import { processDetail, exportExcel,uribase64encode} from '../../../func/common';

import DefinitionModel from './definition_model';



import { Cytoscapejs } from '../../cytoscapejs';


import { MdPeople, MdTimeline, MdClass, MdAssignment, MdLabel } from "react-icons/md";



class Analysis extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      type_items: [],


      limit_count: 50,
      save_show: false,
      
      cyphter_sql: '',
      save_title: '',
      save_desc: '',









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




  
  onRef = (ref) => {
    this.child = ref
  }
  handelLimitChange = (event) => {
    let target = event.target
    this.setState({ 'limit_count': target.value });

  }





 

  
  
  handelDelete = (event) => {
    if (this.state.item_list.length === 1) {

      this.props.onNodeMessageChange("只有一个节点，不能删除", "danger");

      return;

    }
    let item_list = this.state.item_list;
    item_list = item_list.slice(0, -1);
    item_list = item_list.slice(0, -1);
    this.setState({ 'item_list': item_list });
    this.setState({ 'click_item': 0 });

  }




  handleRunClick = (event) => {

    //console.log(cypher_string);
    let cypher_string = this.definitionModel.getCypherSQL()+" limit "+ this.state.limit_count;
    //let cypher_string=this.state.cyphter_sql;
    //console.log("start query");
    //console.log(cypher_string)
    this.child.refeshdata(cypher_string);

  }


  handleSaveClick = (event) => {
    this.setState({ 'save_show': true });
  }
  handleSaveClose = (evnet) => {
    this.setState({ 'save_show': false });
  }
  handleSaveAndClose = (event) => {
    this.getCypherSQL();

    var config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }
    axios.post(back_server.restful_api_base_url() + 'SaveTemplate/', { qt_type:'edge',qt_title: this.state.save_title, qt_desc: this.state.save_desc, qt_object: uribase64encode(JSON.stringify(this.state.item_list)), qt_cypher: uribase64encode(this.state.cyphter_sql) }, config
    )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    this.setState({ 'save_show': false });

  }
  onDefinitionModel=(ref)=>{
    this.definitionModel=ref;
    //console.log(this.definitionModel);


  }





  handelTitleChange = (event) => {
    this.setState({ 'save_title': event.target.value });
  }
  handelDescChange = (event) => {
    this.setState({ 'save_desc': event.target.value });
  }




  render() {

    //let item_count = this.state.item_list.length;
    return (

      <div className="content-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', flex: '1 1 auto' }}>
        <div className="content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', flex: '1 1 auto' }}>
          <div className="row" style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', flex: '1 1 auto' }}>
            <div className="col-lg-12" style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', flex: '1 1 auto' }}>

              {this.props.full === true ? '' : (<div className="card card-default" style={{ flex: '1 1 auto' }}>
                <div className="card-header  justify-content-between">
                  <h2>分析模型设计器</h2>
                </div>
                <div className="card-body">
                  <blockquote className="blockquote">
                    <p className="mb-0">模型应当以节点开始，并以节点结束，期间以关系为关联。在节点和关系中，应该以标签或者属性作为限制性条件。请注意属于预览的数量，不应太大，一般情况下限制为。定义之后可以尝试效果</p>
                  </blockquote>
                  <div>查询数量限制为<Form.Control as="select" value={this.state.index} onChange={this.handelLimitChange}>
                    <option>50</option>
                    <option>100</option>
                    <option>200</option>
                    <option>500</option>
                  </Form.Control></div>
                  <DefinitionModel onRef={this.onDefinitionModel} title="定义模型" properties_data={this.props.properties_data} node_lables_data={this.props.node_lables_data} edge_types_data={this.props.edge_types_data}/>
                  
                </div>
              </div>
              )}
              <div>
                <Button variant="primary" onClick={this.handleRunClick}>单击查看分析结果</Button><Button variant="primary" onClick={this.handleSaveClick}>保存查询模板</Button>
              </div>
              <Cytoscapejs style={{ display: 'flex', alignItems: 'stretch', flex: '1 1 auto' }} onRef={this.onRef} />



              <Modal show={this.state.save_show} onHide={this.handleSaveClose}>
                <Modal.Header closeButton>
                  <Modal.Title>保存查询模板</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form.Group >
                    <Form.Label>保存名称</Form.Label>
                    <Form.Control type="text" value={this.state.save_title} onChange={this.handelTitleChange} />
                    <Form.Label>描述</Form.Label>
                    <Form.Control as="textarea" rows="3" value={this.state.save_desc} onChange={this.handelDescChange} />




                  </Form.Group>
                </Modal.Body>
                <Modal.Footer>

                  <Button variant="primary" onClick={this.handleSaveAndClose}>
                    保存并关闭
            </Button>
                </Modal.Footer>
              </Modal>




            </div>
          </div>
        </div>
      </div>





    );
  }


}
Analysis.propTypes = {
  //onComUSCCChange:PropTypes.func.isRequired,
  //onComNameChange:PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    node_lables_data: state.SystemReducer.node_lables_data,
    properties_data: state.SystemReducer.properties_data,
    edge_types_data: state.SystemReducer.edge_types_data,
    full: state.CytoscapejsReducer.full
  };
}

const mapDispatchToProps = {
  //neo4jgraphChange: NeoGraphActions.neo4jCypherChangeAction,
  //onNodeMessageChange: HeadActions.headMessageChangeAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(Analysis);
