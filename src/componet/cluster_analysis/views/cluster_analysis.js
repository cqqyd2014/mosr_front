import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import back_server from '../../../func/back_server';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup'
import Modal from 'react-bootstrap/Modal'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'


import ButtonGroup from 'react-bootstrap/ButtonGroup'


import { Cytoscapejs } from '../../cytoscapejs';


import { MdPeople, MdTimeline, MdClass, MdAssignment, MdLabel } from "react-icons/md";
import { IconContext } from "react-icons";


class ClusterAnalysis extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      weight_edges:[],

      show_edge_model:false









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




  onNodeClick = (index, event) => {
    //console.log(this.props.properties_data)
    //console.log(index);
    //console.log(this.state.label_items);
    //let items = (this.state.item_list);
    //let item = items[index];
    this.setState({ 'node_show': true });
    this.setState({ 'click_item': index });
    //console.log(item)
    //let neo4jgraph_cypher='match p=()-[r:'+item+']-() return p  limit 50'
    //this.child.refeshdata(neo4jgraph_cypher);

  }
  onRef = (ref) => {
    this.child = ref
  }
  handelLimitChange = (event) => {
    let target = event.target
    this.setState({ 'limit_count': target.value });

  }


  handelEdgeDataBack = (item) => {

    this.ModelDataBack(item);
  }


  ModelDataBack = (item) => {

    let item_list = this.state.item_list;


    item_list[this.state.click_item] = item;

    this.setState({ 'item_list': item_list });


  }

  handelNodeDataBack = (item) => {

    this.ModelDataBack(item);

  }
  onEdgeClick = (index, event) => {
    //let items = (this.state.item_list);
    //let item = items[index];
    this.setState({ 'edge_show': true });
    this.setState({ 'click_item': index });

  }
  addItem = () => {
    let item_list = this.state.item_list;
    if (this.state.item_list.length % 2 === 0) {
      //当前是关系，新增节点
      let new_node = { 'name': '节点' + parseInt((this.state.item_list.length + 2) / 2), 'type': 'node', 'select_labels_types': [], 'properties': [], 'bg': 'success', 'text': 'white' ,'edgeRadioValue':'单一节点','ref_node':''};
      item_list.push(new_node);
    }
    else {
      //当前是节点，新增关系
      let new_type = { 'name': '关系' + parseInt((this.state.item_list.length + 2) / 2), 'type': 'dege', 'select_labels_types': [], 'properties': [], 'bg': 'danger', 'text': 'white', '_min': 1, '_max': 1, 'edgeRadioValue': '单层关系' };
      item_list.push(new_type);

    }
    this.setState({ 'item_list': item_list });

  }


  handelAddNewWeightEdges = (event) => {
    let weight_edges=this.state.weight_edges;
    let new_weight_edge={'edge_name':'','weight_type':1,'weight_value':0,'weight_section_values':[],'weight_enum_values':[]}//weight_type:1为直接设定权值2为分段设定权值（数字）3为枚举权值
    weight_edges.push(new_weight_edge)
    this.setState({'weight_edges':weight_edges})
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





  getCypherSQL = () => {
    //构建path  match p=()-[r]-() return p
    let _where_array = [];
    let cypher_string = '';
    for (let i = 0; i < this.state.item_list.length; i++) {
      let item = this.state.item_list[i];
      if (item.type === 'node') {
        cypher_string = cypher_string + '(' + item.name;
        //处理标签
        //console.log(item.select_labels);
        if (item.edgeRadioValue === '单一节点') {
          for (let i = 0; i < item.select_labels_types.length > 0; i++) {
            cypher_string = cypher_string + ":" + item.select_labels_types[i];
          }
          //{ name: 'Tom Hanks', born: 1956 }所有的等于条件在这里，其他条件在where里面
          let temp_propertes = ""
          for (let i = 0; i < item.properties.length > 0; i++) {
            switch (item.properties[i].operation) {
              case '等于':
                temp_propertes = temp_propertes + item.properties[i].name + ":\'" + item.properties[i].value + "\'";
                break;
              case '大于':
                _where_array.push(item.name + "." + item.properties[i].name + ">\'" + item.properties[i].value + "\'")
                break;
              case '小于':
                _where_array.push(item.name + "." + item.properties[i].name + "<\'" + item.properties[i].value + "\'")
                break;
              case '包含':
                _where_array.push(item.name + "." + item.properties[i].name + " contains \'" + item.properties[i].value + "\'")
                break;
              case '不等于':
                _where_array.push(item.name + "." + item.properties[i].name + " != \'" + item.properties[i].value + "\'")
                break;
              default:
  
            }
  
  
          }
  
          cypher_string = cypher_string + "{" + temp_propertes + "})";

        }
        else{
          cypher_string = cypher_string + ")";
          _where_array.push(item.name +'='+item.ref_node)

        }

        

      }
      else {
        cypher_string = cypher_string + '-[' + item.name;
        //console.log(item.edgeRadioValue);
        if (item.edgeRadioValue === '单层关系') {

          for (let j = 0; j < item.select_labels_types.length; j++) {

            if (j === 0) {
              cypher_string = cypher_string + ":" + item.select_labels_types[0];
            }
            else {
              cypher_string = cypher_string + "|" + item.select_labels_types[j];
            }
          }
          let temp_propertes = ""
          for (let i = 0; i < item.properties.length > 0; i++) {
            switch (item.properties[i].operation) {
              case '等于':
                temp_propertes = temp_propertes + item.properties[i].name + ":\'" + item.properties[i].value + "\'";
                break;
              case '大于':
                _where_array.push(item.name + "." + item.properties[i].name + ">\'" + item.properties[i].value + "\'")
                break;
              case '小于':
                _where_array.push(item.name + "." + item.properties[i].name + "<\'" + item.properties[i].value + "\'")
                break;
              case '包含':
                _where_array.push(item.name + "." + item.properties[i].name + " contains \'" + item.properties[i].value + "\'")
                break;
              case '不等于':
                _where_array.push(item.name + "." + item.properties[i].name + " != \'" + item.properties[i].value + "\'")
                break;
              default:

            }


          }
          cypher_string = cypher_string + "{" + temp_propertes + "}]-";
        }
        else {
          //*3..5
          cypher_string = cypher_string + "*" + item._min + ".." + item._max;
          cypher_string = cypher_string + "]-";
        }
        


      }
    }
    //处理所有where
    let _where = ''
    //console.log(_where_array);
    if (_where_array.length > 0) {
      _where = ' where ' + _where_array.join(" and ");
    }
    cypher_string = 'match p=' + cypher_string + _where + ' return p limit ' + this.state.limit_count;
    console.log(cypher_string);
    this.setState({ 'cyphter_sql': cypher_string });
    return cypher_string;
  }

  handleRunClick = (event) => {

    //console.log(cypher_string);
    let cypher_string = this.getCypherSQL();
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
    axios.post(back_server.restful_api_base_url() + 'SaveTemplate/', { qt_title: this.state.save_title, qt_desc: this.state.save_desc, qt_object: JSON.stringify(this.state.item_list), qt_cypher: JSON.stringify(this.state.cyphter_sql) }, config
    )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    this.setState({ 'save_show': false });

  }






  handelTitleChange = (event) => {
    this.setState({ 'save_title': event.target.value });
  }
  handelDescChange = (event) => {
    this.setState({ 'save_desc': event.target.value });
  }


  handleEdgeClose = () => {
    this.setState({ 'edge_show': false });
  }


  handleNodeClose = () => {
    this.setState({ 'node_show': false });
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
                  <h2>聚类模型设计器</h2>
                </div>
                <div className="card-body">
                  <blockquote className="blockquote">
                    <p className="mb-0">聚类模型用于分析社会关系的连通性,具有连通性的个体之间必定有关系，对于分析个体的群组性有重要意义。比如密切联系的关联企业，可能为同一控制的资金系；具有强关联的群体，必定有其它更深层次的关联。根据系统中的不同关系可以设定关联性的权值，以便作归一化的分析。</p>
                  </blockquote>
                  
                  <div>定义关系权值</div>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>关系名称</th>
                        <th>关系数量</th>
                        <th>权值</th>
                        <th>管理</th>


                      </tr>
                    </thead>
                    <tbody>{
                      this.state.weight_edges.map((row, index) => {


                        return (<tr key={index}><td>{row.name}</td><td>{row.operation}</td><td>{row.value}</td><td><Button variant="secondary" onClick={this.handleDeleteProperty.bind(this, index)}>删除</Button></td></tr>


                        )
                      })
                    }
                    </tbody>

                  </Table>
                  
                  <div style={{ display: 'flex' }}>
                    <ButtonGroup  >

                      <Button variant="success" onClick={this.handelAddNewWeightEdges}>设定新关系权值</Button>
                      
                    </ButtonGroup></div>
                </div>
              </div>
              )}
              <div>
                <Button variant="primary" onClick={this.handleRunClick}>单击查看分析结果</Button><Button variant="primary" onClick={this.handleSaveClick}>保存查询模板</Button>
              </div>
              <Cytoscapejs style={{ display: 'flex', alignItems: 'stretch', flex: '1 1 auto' }} onRef={this.onRef} />



              <Modal show={this.state.show_edge_model} onHide={this.handleSaveClose}>
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
ClusterAnalysis.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(ClusterAnalysis);
