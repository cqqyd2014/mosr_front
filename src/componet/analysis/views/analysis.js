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
import { Cytoscapejs } from '../../cytoscapejs';
import * as HeadActions from '../../head/redux/actions'
import { processDetail } from '../../../func/common';
import { MdPeople, MdCompareArrows, MdTrendingFlat, MdTimeline, MdBubbleChart, MdClass, MdAssignment, MdLabel } from "react-icons/md";
import { IconContext } from "react-icons";


class Analysis extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      type_items: [],
      last_type: 'node',//为node或者edge
      item_list: [
        { 'name': '节点1', 'type': 'node', 'select_labels': [], 'properties': [], 'bg': 'success', 'text': 'white' }
      ],
      limit_count: 50,
      node_show: false,
      click_item: 0,
      edge_show: false,
      save_show: false,
      cyphter_sql: '',
      save_title: '',
      save_desc: '',
      properties_value:'name',
      properties_text_value:'',







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

  edgeRadioChange = (edgeRadioValue, event) => {
    //this.setState({ 'edgeRadioValue': edgeRadioValue });

    let item_list = this.state.item_list;
    let clickItem = item_list[this.state.click_item]

    clickItem.edgeRadioValue = edgeRadioValue;
    item_list[this.state.click_item] = clickItem

    this.setState({ 'item_list': item_list });
  }


  onNodeClick = (index, event) => {
    console.log(this.props.properties_data)
    //console.log(index);
    //console.log(this.state.label_items);
    let items = (this.state.item_list);
    let item = items[index];
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
  handleNodeClose = () => {
    this.setState({ 'node_show': false });
  }

  handleEdgeClose = () => {
    this.setState({ 'edge_show': false });
  }

  handelEdgeTypeClick = (event) => {
    let target = event.target
    let select_value = target.value;

    let item_list = this.state.item_list;
    let clickItem = item_list[this.state.click_item]
    let select_types = clickItem.select_types;
    if ($.inArray(select_value, select_types) == -1) {
      select_types.push(select_value);
    }
    else {
      select_types.splice($.inArray(select_value, select_types), 1);
    }
    clickItem.select_types = select_types;
    //console.log(select_types);
    item_list[this.state.click_item] = clickItem
    console.log(item_list);
    this.setState({ 'item_list': item_list });
  }
  handelNodeLableClick = (event) => {
    let target = event.target
    let select_value = target.value;
    let item_list = this.state.item_list;
    let clickItem = item_list[this.state.click_item]
    let select_labels = clickItem.select_labels;
    if ($.inArray(select_value, select_labels) == -1) {
      select_labels.push(select_value);
    }
    else {
      select_labels.splice($.inArray(select_value, select_labels), 1);
    }
    clickItem.select_labels = select_labels;
    item_list[this.state.click_item] = clickItem

    this.setState({ 'item_list': item_list });



  }
  onEdgeClick = (index, event) => {
    let items = (this.state.item_list);
    let item = items[index];
    this.setState({ 'edge_show': true });
    this.setState({ 'click_item': index });

  }
  addItem = () => {
    let item_list = this.state.item_list;
    if (this.state.item_list.length % 2 == 0) {
      //当前是关系，新增节点
      let new_node = { 'name': '节点' + parseInt((this.state.item_list.length + 2) / 2), 'type': 'node', 'select_labels': [], 'properties': [], 'bg': 'success', 'text': 'white' };
      item_list.push(new_node);
    }
    else {
      //当前是节点，新增关系
      let new_type = { 'name': '关系' + parseInt((this.state.item_list.length + 2) / 2), 'type': 'dege', 'select_types': [], 'properties': [], 'bg': 'danger', 'text': 'white', '_min': 1, '_max': 1, 'edgeRadioValue': '单层关系' };
      item_list.push(new_type);

    }
    this.setState({ 'item_list': item_list });

  }
  handelNew = (event) => {
    this.addItem();
    this.addItem();

  }
  handelDelete = (event) => {
    if (this.state.item_list.length == 1) {

      this.props.onNodeMessageChange("只有一个节点，不能删除", "danger");

      return;

    }
    let item_list = this.state.item_list;
    item_list = item_list.slice(0, -1);
    item_list = item_list.slice(0, -1);
    this.setState({ 'item_list': item_list });
    this.setState({ 'click_item': 0 });

  }
  handleMin = (event) => {




    let target = event.target
    let _min_value = target.value;
    let item_list = this.state.item_list;
    let clickItem = item_list[this.state.click_item]

    clickItem._min = _min_value;
    item_list[this.state.click_item] = clickItem

    this.setState({ 'item_list': item_list });

  }

  getCypherSQL = () => {
    //构建path  match p=()-[r]-() return p
    let _where_array = [];
    let cypher_string = '';
    for (let i = 0; i < this.state.item_list.length; i++) {
      let item = this.state.item_list[i];
      if (item.type == 'node') {
        cypher_string = cypher_string + '(' + item.name;
        //处理标签
        //console.log(item.select_labels);

        for (let i = 0; i < item.select_labels.length > 0; i++) {
          cypher_string = cypher_string + ":" + item.select_labels[i];
        }
        //{ name: 'Tom Hanks', born: 1956 }
        let temp_propertes = ""
        for (let i = 0; i < item.properties.length > 0; i++) {
          temp_propertes = temp_propertes + item.properties[i].name + ":\'" + item.properties[i].value + "\'";
        }

        cypher_string = cypher_string + "{" + temp_propertes + "})";

      }
      else {
        cypher_string = cypher_string + '-[' + item.name;
        console.log(item.edgeRadioValue);
        if (item.edgeRadioValue == '单层关系') {

          for (let j = 0; j < item.select_types.length; j++) {

            if (j == 0) {
              cypher_string = cypher_string + ":" + item.select_types[0];
            }
            else {
              cypher_string = cypher_string + "|" + item.select_types[j];
            }
          }
        }
        else {
          //*3..5
          cypher_string = cypher_string + "*" + item._min + ".." + item._max
        }
        cypher_string = cypher_string + "]-";

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
    console.log("start query");
    console.log(cypher_string)
    this.child.refeshdata(cypher_string);

  }

  handleMax = (event) => {
    let target = event.target
    let _max_value = target.value;
    let item_list = this.state.item_list;
    let clickItem = item_list[this.state.click_item]

    clickItem._max = _max_value;
    item_list[this.state.click_item] = clickItem

    this.setState({ 'item_list': item_list });
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

  handleAddProperty=(event)=>{
    let item_list=this.state.item_list;
    let clickItem = item_list[this.state.click_item]
    let properties = clickItem.properties;
    properties.push({'name':this.state.properties_value,'value':this.state.properties_text_value});
    clickItem.properties=properties
    item_list[this.state.click_item]=clickItem
    this.setState({'item_list':item_list});

  }

  handlePropertiesChange=(event)=>{
    this.setState({'properties_value':event.target.value});

  }
  handlePropertiesTextChange=(event)=>{
    this.setState({'properties_text_value':event.target.value});
  }


  handelTitleChange = (event) => {
    this.setState({ 'save_title': event.target.value });
  }
  handelDescChange = (event) => {
    this.setState({ 'save_desc': event.target.value });
  }
  handleDeleteProperty=(index,event)=>{
    let item_list=this.state.item_list;
    let clickItem = item_list[this.state.click_item]
    let properties = clickItem.properties;
    properties.splice(index,1);
    //properties.push({'name':this.state.properties_value,'value':this.state.properties_text_value});
    clickItem.properties=properties
    item_list[this.state.click_item]=clickItem
    this.setState({'item_list':item_list});
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
                              <Card.Title >{row.name}{row.type == 'node' ? <MdPeople /> : <MdTimeline />}</Card.Title >
                              <div>
                                {row.type == 'node' ?
                                  (
                                    <div>
                                    <div>标签：</div>
                                    <div>{this.state.item_list[index].select_labels.map((row2, index2) => { return (<div key={index2}>{row2}</div>) })}</div>
                                    <div>属性：</div>
                                    <div>
                                    
                                    <Table responsive>
                            <thead>
                              <tr>
                                <th>属性</th>
                                <th>值</th>
                               


                              </tr>
                            </thead>
                            <tbody>{
                              this.state.item_list[index].properties.map((row, index) => {


                                return (<tr key={index}><td>{row.name}</td><td>{row.value}</td></tr>


                                )
                              })
                            }
                            </tbody>

                          </Table>
                                    
                                    </div>
                                    </div>
                                  )
                                  : (
                                      this.state.item_list[index].edgeRadioValue+':'+(
                                    this.state.item_list[index].edgeRadioValue == '单层关系' ?
                                    this.state.item_list[index].select_types
                                    : '最小层次' + this.state.item_list[index]._min + '最大层次' + this.state.item_list[index]._max)
                                    )
                                    }
                                
                              </div>

                              {row.type == 'node' ? <Button variant="secondary" onClick={this.onNodeClick.bind(this, index)}>定义节点</Button>
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


              <Modal show={this.state.node_show} onHide={this.handleNodeClose}>
                <IconContext.Provider value={{ color: "gray", size: "2em" }}>
                  <Modal.Header closeButton>
                    <Modal.Title>定义节点</Modal.Title>
                  </Modal.Header>
                  <Modal.Body style={{ padding: '0px' }}>
                    <Form.Group >


                      <Card bg="light" style={{ flex: '1 1 auto' }}>
                        <Card.Header><MdLabel />定义节点的标签</Card.Header>
                        <Card.Body>
                          <Card.Title>单击选额标签，选择多个标签为“并且”关系</Card.Title>
                          <Form.Control as="select" multiple value={this.state.item_list[this.state.click_item].select_labels} onChange={this.handelNodeLableClick}>
                            {typeof (this.props.node_lables_data) == 'undefined' ? '' : this.props.node_lables_data.map((row, index) => {


                              return (<option key={index}>{row}</option>


                              )
                            })}


                          </Form.Control>
                        </Card.Body>
                      </Card>
                      <Card bg="light" style={{ flex: '1 1 auto' }}>
                        <Card.Header><MdAssignment />定义节点的属性</Card.Header>
                        <Card.Body>
                          <Card.Title>当前已经定义的属性列表</Card.Title>

                          <Table responsive>
                            <thead>
                              <tr>
                                <th>属性</th>
                                <th>值</th>
                                <th>操作</th>


                              </tr>
                            </thead>
                            <tbody>{
                              this.state.item_list[this.state.click_item].properties.map((row, index) => {


                                return (<tr key={index}><td>{row.name}</td><td>{row.value}</td><td><Button variant="secondary" onClick={this.handleDeleteProperty.bind(this, index)}>删除</Button></td></tr>


                                )
                              })
                            }
                            </tbody>

                          </Table>

                          <Row><Col>属性名称</Col><Col> <Form.Control as="select" value={this.state.properties_value} onChange={this.handlePropertiesChange}>
                            {typeof (this.props.properties_data) != 'undefined' ? this.props.properties_data.map((row, index) => {


                              return (<option key={index}>{row}</option>


                              )
                            }) : ''
                            }

                          </Form.Control></Col></Row>
                          <Row><Col>属性值</Col><Col><Form.Control type="text" value={this.state.properties_text_value} onChange={this.handlePropertiesTextChange}/></Col></Row>

                          <Button variant="primary" onClick={this.handleAddProperty}>
                            添加新属性
            </Button>
                        </Card.Body>
                      </Card>



                    </Form.Group>
                  </Modal.Body>
                  <Modal.Footer>

                    <Button variant="primary" onClick={this.handleNodeClose}>
                      关闭
            </Button>
                  </Modal.Footer>
                </IconContext.Provider>
              </Modal>
              <Modal show={this.state.edge_show} onHide={this.handleEdgeClose}>
                <Modal.Header closeButton>
                  <Modal.Title>定义关系</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ padding: '0px' }}>
                  <Form.Group >

                  <Card bg="light" style={{ flex: '1 1 auto' }}>
                        <Card.Header><MdClass />关系的类型</Card.Header>
                        <Card.Body>
                          <Card.Title>关系的类型有两种，一种为单层关系，可以指定关系类型，一种为多层关系，层数不确定，需指定最大最小层数。</Card.Title>
                          <ListGroup>
                      <ListGroup.Item><Form.Check
                        type="radio"
                        label="单层关系"
                        name="edgeRadios"
                        checked={this.state.item_list[this.state.click_item].edgeRadioValue == '单层关系'}
                        onChange={this.edgeRadioChange.bind(this, '单层关系')}
                      />
                        <Form.Control as="select" multiple value={this.state.item_list[this.state.click_item].select_types} onChange={this.handelEdgeTypeClick}>
                          {typeof (this.props.node_lables_data) == 'undefined' ? '' : this.props.edge_types_data.map((row, index) => {


                            return (<option key={index}>{row}</option>


                            )
                          })}


                        </Form.Control>
                      </ListGroup.Item>
                      <ListGroup.Item><Form.Check
                        type="radio"
                        label="多层关系"
                        name="edgeRadios"
                        checked={this.state.item_list[this.state.click_item].edgeRadioValue == '多层关系'}
                        onChange={this.edgeRadioChange.bind(this, '多层关系')}
                      />

                        <Row>
                          <Col><Form.Label>最小</Form.Label>
                            <Form.Control type="text" value={this.state.item_list[this.state.click_item]._min} onChange={this.handleMin} /></Col><Col><Form.Label>最大</Form.Label>
                            <Form.Control type="text" value={this.state.item_list[this.state.click_item]._max} onChange={this.handleMax} /></Col>
                        </Row>


                      </ListGroup.Item>


                    </ListGroup>
                        </Card.Body>
                      </Card>




                 
                   




                  </Form.Group>
                </Modal.Body>
                <Modal.Footer>

                  <Button variant="primary" onClick={this.handleEdgeClose}>
                    关闭
            </Button>
                </Modal.Footer>



              </Modal>
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
