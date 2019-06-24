import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';


import {_blankAndoComma} from '../../../func/common'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import InputGroup from 'react-bootstrap/InputGroup'

import Alert from 'react-bootstrap/Alert'


import back_server from '../../../func/back_server';
import axios from 'axios';



import { MdApps ,MdPeople} from "react-icons/md";










class ImportEdge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
        
      new_label_value:'',
      
      



    };

  }



  componentDidMount = () => {
   



  }
  handleEdgeTypeChange = (event) => {
    let target = event.target.value
    let _value=_blankAndoComma(_value)

    this.setState({ 'edge_type':  _value})
  }
  onItemsChange = (index, event) => {

    let target = event.target;

    let column_items = this.props.column_items;
    let item = column_items[index];
    item = [item[0],item[1], target.value];
    column_items[index] = item;
    //this.setState({ 'tabel_cols': column_items });
    this.props.onItemsChange(column_items)

  }

  onItemsCheck = () => {
    //是否有column_items，如果没有，表没有读取出来
    if (this.props.column_items.length === 0) {
      this.setState({ 'check_message': '数据表未选择或未能解析，请清理数据表' });
      this.setState({ 'check_type': 'danger' });
      this.setState({ 'items_check_ok': false });
      return;

    }
    //至少一个标签label_items
    if (this.props.edge_type === '') {
      this.setState({ 'check_message': '必须定义关系类型数据' });
      this.setState({ 'check_type': 'danger' });
      this.setState({ 'items_check_ok': false });
      return;
    }
    //有且只能有一个编码列
    let items = this.props.column_items;
    let key_flag = 0;
    for (let key in items) {
      let item = items[key];
      if (item[2] === '起点') {
        key_flag++;
      }

    }
    if (key_flag !== 1) {
      this.setState({ 'check_message': '必须定义一个起点列' });
      this.setState({ 'check_type': 'danger' });
      this.setState({ 'items_check_ok': false });
      return;
    }
    //有且只能有一个显示名称

    let display_flag = 0;
    for (let key in items) {
      let item = items[key];
      if (item[2] === '终点') {
        display_flag++;
      }

    }
    if (display_flag !== 1) {
      this.setState({ 'check_message': '必须定义一个终点列' });
      this.setState({ 'check_type': 'danger' });
      this.setState({ 'items_check_ok': false });
      return;
    }
    this.setState({ 'check_message': '校验通过，可以开始导入数据' });
    this.setState({ 'check_type': 'success' });
    this.setState({ 'items_check_ok': true });
    this.props.onCheck(true);

  }
  handleEdgeTypeChange=(event)=>{
    this.props.onEdgeTypeChange(event.target.value)
  }

  render() {





    return (


      <Card bg="light" style={{ flex: '1 1 auto' }}>
        <Card.Header><MdPeople />导入节点</Card.Header>
        <Card.Body>
          <Card.Title>关系类型是唯一的，也是显示名称。所有关系是有方向的，需要勇两个节点来描述，其他属性可选。</Card.Title>

          <Row>
            <Col>
            <Form.Label>关系类型（显示名称）</Form.Label>

<Form.Control type="text" placeholder="输入关系类型" value={this.props.edge_type} onChange={this.handleEdgeTypeChange} /> 
            
            
            
            </Col>
            

          </Row>
          <Row>
            <Col>
            <Form.Label>定义属性</Form.Label>
            <Table responsive>

<thead>
  <tr>
    <td>属性</td>
    <td>定义</td>
  </tr>
</thead>
<tbody>

  {
    this.props.column_items.map((row, index) => {

      return (<tr key={index}>
        <td >{row[0]}</td>
        <td>
          <Form.Control as="select" value={row[2]}  onChange={this.onItemsChange.bind(this, index)}>
            <option>起点</option>
            <option>终点</option>
            {row[1]==='string'?<option>文本属性</option>:''}
            {row[1]==='float'?<option>浮点数属性</option>:''}
            {row[1]==='long'?<option>整数属性</option>:''}
            <option>不导入</option>

          </Form.Control></td>
      </tr>


      )
    })
  }

</tbody>
</Table>

            </Col>

          </Row>

{this.state.check_message !== '' ? <Alert variant={this.state.check_type}>
{this.state.check_message}
</Alert> : ''}

<Button variant="primary" onClick={this.onItemsCheck}>校验</Button>

        </Card.Body>
      </Card>






    );
  }


}
ImportEdge.propTypes = {
  //onComUSCCChange:PropTypes.func.isRequired,
  //onComNameChange:PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    full: state.CytoscapejsReducer.full
  };
}

const mapDispatchToProps = {

  //neo4jgraphChange: NeoGraphActions.neo4jCypherChangeAction


};
export default connect(mapStateToProps, mapDispatchToProps)(ImportEdge);
