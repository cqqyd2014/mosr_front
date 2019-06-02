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
import PropertiesTable from './properties_table';
import DefinitionNode from './definition_node';

import DefinitionEdge from './definition_edge';

import ButtonGroup from 'react-bootstrap/ButtonGroup'


import { Cytoscapejs } from '../../cytoscapejs';


import { MdPeople, MdTimeline, MdClass, MdAssignment, MdLabel } from "react-icons/md";
import { IconContext } from "react-icons";


class Analysis extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      type_items: [],
      last_type: 'node',//为node或者edge
      item_list: [
        { 'name': '节点1', 'type': 'node', 'select_labels_types': [], 'properties': [], 'bg': 'success', 'text': 'white','edgeRadioValue':'单一节点','ref_node':'' }
      ],
      limit_count: 50,
      node_show: false,
      click_item: 0,
      edge_show: false,
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
  handelNew = (event) => {
    this.addItem();
    this.addItem();

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
                  <div>定义模型</div>
                  <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                    <IconContext.Provider value={{ color: "gray", size: "4em" }}>
                      {

                        this.state.item_list.map((row, index) => {

                          return (<Card key={index} style={{ width: '18rem' }} border={row.bg} >

                            <Card.Body >
                              <Card.Title >{row.name}{row.type === 'node' ? <MdPeople /> : <MdTimeline />}</Card.Title >
                              <div>
                                {row.type === 'node' ?
                                  (
                                    


<div>

<div>类型：{this.state.item_list[index].edgeRadioValue}</div>
                                    {this.state.item_list[index].edgeRadioValue === '单一节点' ? 
                                    <div>
                                      <div>标签：</div>
                                      
                                      <ListGroup  style={{ padding: '0px',  }}>{this.state.item_list[index].select_labels_types.map((row2, index2) => { return (<ListGroup.Item key={index2} style={{ padding: '0px',  }}>{row2}</ListGroup.Item>) })}</ListGroup>

                                      <PropertiesTable item={{...this.state.item_list[index]}}/>
                                          </div>
                                       :(<div>关联节点: <IconContext.Provider value={{ color: "blue", size: "2em" }}><MdPeople /></IconContext.Provider>{this.state.item_list[index].ref_node}</div>)}

                                     
                                    

                                  </div>



                                  )
                                  : (<div>
                                    <div>关系类型：{this.state.item_list[index].edgeRadioValue}</div>
                                    {this.state.item_list[index].edgeRadioValue === '单层关系' ? 
                                    <div>
                                      <div>标签：</div>
                                      
                                      <ListGroup  style={{ padding: '0px',  }}>{this.state.item_list[index].select_labels_types.map((row2, index2) => { return (<ListGroup.Item key={index2} style={{ padding: '0px',  }}>{row2}</ListGroup.Item>) })}</ListGroup>
                                          <PropertiesTable item={{...this.state.item_list[index]}}/>
                                          </div>
                                       :'最小层次' + this.state.item_list[index]._min + '最大层次' + this.state.item_list[index]._max}

                                     
                                    

                                  </div>
                                  )
                                }

                              </div>

                              {row.type === 'node' ? <Button variant="secondary" onClick={this.onNodeClick.bind(this, index)}>定义节点</Button>
                                : <Button variant="secondary" onClick={this.onEdgeClick.bind(this, index)}>定义关系</Button>}

                            </Card.Body>
                          </Card>


                          )
                        })
                      }
                    </IconContext.Provider>
                  </div>
                  <div style={{ display: 'flex' }}>
                    <ButtonGroup  >

                      <Button variant="success" onClick={this.handelNew}>新增节点或者关系</Button>
                      <Button variant="success" onClick={this.handelDelete}>删除最后一个节点或者关系</Button>
                    </ButtonGroup></div>
                </div>
              </div>
              )}
              <div>
                <Button variant="primary" onClick={this.handleRunClick}>单击查看分析结果</Button><Button variant="primary" onClick={this.handleSaveClick}>保存查询模板</Button>
              </div>
              <Cytoscapejs style={{ display: 'flex', alignItems: 'stretch', flex: '1 1 auto' }} onRef={this.onRef} />

              <DefinitionNode handelNodeDataBack={this.handelNodeDataBack} handleNodeClose={this.handleNodeClose} properties_data={this.props.properties_data} node_lables_data={this.props.node_lables_data} node_show={this.state.node_show} item_list={this.state.item_list} item={{ ...this.state.item_list[this.state.click_item] }} />
              <DefinitionEdge handelEdgeDataBack={this.handelEdgeDataBack} handleEdgeClose={this.handleEdgeClose} properties_data={this.props.properties_data} edge_types_data={this.props.edge_types_data} edge_show={this.state.edge_show} item={{ ...this.state.item_list[this.state.click_item] }} />


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
