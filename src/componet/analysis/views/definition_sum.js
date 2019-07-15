import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
import PropertiesList from '../../../common_componet/definition_properties/views/properties_list'
import back_server from '../../../func/back_server';

import ListGroup from 'react-bootstrap/ListGroup'




import $ from 'jquery';


import { IconContext } from "react-icons";












class DefinitionSum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      group_node: '节点1',//分组的节点
      group_node_id_properties: '',//分组节点的编码属性
      count_node: '',//聚合sumcount的节点
      count_node_id_properties: '',//统计节点的编码属性
      count_close_to_edge: '',//聚合sumcount的关系

      count_node_type: 'node',//以节点或者节点相邻的边为条件，相邻的边不能是不定长度
      error_message: '',
      count_show: false,//对话框是否出现
      count_enable: false,//是否启用汇聚


    };

  }

  handelGroupNodeChange = (event) => {
    this.onGroupNodeChange(event.target.value)



  }

  //设置节点的编码列

  getNodeCode = (node, type) => {
    
    if (node.select_labels_types.length !== 0) {

      axios.get(back_server.restful_api_base_url() + 'neo4j_catlog_properties_code/', {
        params: {
          u_label_type: node.select_labels_types[0]
        }
      })
        .then((response) => {
          //let data=database.baseparameter(response);
          if (type === 'group_node') {

            this.setState({ 'group_node_id_properties': response.data.u_column_name })
          }
          else {

            this.setState({ 'count_node_id_properties': response.data.u_column_name })
          }



        })
        .catch(function (error) {
          console.log(error);
        });
    }

  }

  onGroupNodeChange = (node) => {

    this.setState({ 'group_node': node })
    if (this.props.item_list.length > 1) {
      let start_node = this.props.item_list[0]
      let count_node = (node === start_node.name) ? this.props.item_list[this.props.item_list.length - 1] : this.props.item_list[0]
      this.setState({ 'count_node': count_node.name })
      //设置临近的属性

      let count_close_to_edge = (node === start_node.name) ? this.props.item_list[this.props.item_list.length - 2].name : this.props.item_list[1].name
      this.setState({ 'count_close_to_edge': count_close_to_edge })
      //设置group_node的id属性
      //从item_list中取出group_node
      let group_node = (node !== start_node.name) ? this.props.item_list[this.props.item_list.length - 1] : this.props.item_list[0]
      



    }


  }
  sum_init = () => {
    this.onGroupNodeChange('节点1')

    this.setState({ 'count_node_type': 'node' })
    this.setState({ 'error_message': "" })
    this.setState({'count_enable':false})




  }



  componentDidMount = () => {
    this.props.onRef(this)
    this.sum_init()



  }
  checkClose = () => {
    if (true) {
      this.props.onSetSumEnable(true)
    }
    else {

    }

  }

  getComponetValue = () => {
    let properties = null
    if (typeof (this.propertiesList1) !== 'undefined') {
      if (this.state.count_node_type === 'node') {

        properties = this.propertiesList1.getComponetValue()
      }
      else {
        properties = this.propertiesList2.getComponetValue()
      }
    }

    return {
      'count_node_id_properties': this.state.count_node_id_properties, 'count_enable': this.state.count_enable, 'group_node_id_properties': this.state.group_node_id_properties, 'group_node': this.state.group_node, 'count_node': this.state.count_node, 'count_close_to_edge': this.state.count_close_to_edge
      , 'count_node_type': this.state.count_node_type, 'properties': properties
    }
  }

  handleSumOK = () => {
    //检测条件设定
    let properties
    //console.log(this.state.count_node_type)
    if (this.state.count_node_type === 'node') {

      properties = this.propertiesList1.getComponetValue()
    }
    else {
      properties = this.propertiesList2.getComponetValue()
    }
    //console.log(properties)
    if (properties.value === '') {
      this.setState({ 'error_message': '值不能为空' })
      return
    }
    //this.props.onSetCountEnable(true)
    //this.props.onSetCountShow(false)
    this.setState({ 'count_enable': true })
    this.setState({ 'count_show': false })

    let first_node = this.props.item_list[0]
    let group_node = (this.state.group_node === first_node.name) ? this.props.item_list[0]: this.props.item_list[this.props.item_list.length - 1] 
    let count_node = (this.state.count_node === first_node.name) ? this.props.item_list[0]: this.props.item_list[this.props.item_list.length - 1]
    this.getNodeCode(group_node, "group_node")
    this.getNodeCode(count_node, "count_node")

  }


  handleHide = () => {

  }
  handleSumCancel = () => {

  }

  countNodeTypeChange = (value) => {
    this.setState({ 'count_node_type': value })
    console.log(value)
    if (value === 'node') {
      this.propertiesList1.init()
    }
    else {
      this.propertiesList2.init()
    }
  }

  onPropertiesTextChange = (value) => {
    this.setState({ 'properties_text_value': value })

  }

  onPropertiesColumnTypeChange = (value) => {
    this.setState({ 'properties_column_type': value })
  }
  onCountCloseToEdgeChange = (edge) => {
    this.setState({ 'count_close_to_edge': edge })
  }
  onPropertiesValueChange = (value) => {
    this.setState({ 'properties_value': value })
  }

  refPropertiesList1 = (ref) => {
    this.propertiesList1 = ref
  }
  refPropertiesList2 = (ref) => {
    this.propertiesList2 = ref
  }




  onCountChange = (event) => {
    //只有一个节点不能设置汇聚
    if (this.props.item_list.length === 1) {
      this.setState({ 'error_message': '只有一个节点不能设置汇聚' })

      return
    }

    //汇聚节点只能有一个标签，
    let node_start = this.props.item_list[0]
    let node_end = this.props.item_list[this.props.item_list.length - 1]
    //console.log(node_start)
    if (node_start.select_labels_types.length !== 1) {
      this.setState({ 'error_message': node_start.name + '只能有一个标签，但有' + node_start.select_labels_types.length + '个标签' })
      return
    }
    //console.log(node_end)
    if (node_end.select_labels_types.length !== 1) {
      this.setState({ 'error_message': node_end.name + '只能有一个标签，但有' + node_end.select_labels_types.length + '个标签' })
      return
    }


    this.setState({ 'error_message': '' })

    //console.log(this.state.count_enable)
    if (!this.state.count_enable) {
      this.setState({ 'count_show': true })
    }
    else {
      this.setState({ 'count_enable': false })
    }

  }


  render() {
    let edge_flag = false

    //当临近的关系是多层关系时，选择关系定义不可用
    let item_list = this.props.item_list
    let group_node = this.props.group_node
    if (item_list.length > 1) {
      let close_to_edge = ''
      if (group_node === '节点1') {
        //得到倒数第二个，关系
        let edge = item_list[item_list.length - 2]
        close_to_edge = edge

      }
      else {
        let edge = item_list[1]
        close_to_edge = edge

      }

      if (close_to_edge.edgeRadioValue === "多层关系") {
        edge_flag = false
      }
      else {
        edge_flag = true
      }
    }


    let propertiesList = null
    if (typeof (this.propertiesList1) !== 'undefined') {
      if (this.state.count_node_type === 'node') {
        //console.log(this.propertiesList1)
        propertiesList = this.propertiesList1.getComponetValue()
      }
      else {
        propertiesList = this.propertiesList2.getComponetValue()
      }
    }





    return (




      <div>
        {this.props.item_list.length > 1 ?
          <Form.Group >
            <Form.Check type="checkbox" label="是否启用汇聚" checked={this.state.count_enable} onChange={this.onCountChange} />
            {this.state.error_message.length !== 0 ? <Alert variant='danger'>
              {this.state.error_message}
            </Alert> : ''}
            {this.state.count_enable ?
              <div>
                <Row>
                  <Col>
                    <Form.Group  >
                      <Form.Label>
                        分组的节点
    </Form.Label>

                      <Form.Control readOnly defaultValue={this.state.group_node} />

                    </Form.Group></Col>
                  <Col >
                    <Form.Group  >
                      <Form.Label>
                        汇总的节点/关系
    </Form.Label>

                      <Form.Control readOnly defaultValue={this.state.count_node_type === 'node' ? this.state.count_node : this.state.count_close_to_edge} />

                    </Form.Group>

                  </Col>

                </Row>
                <Row>

                  <Col><Form.Group  >
                    <Form.Label>
                      属性
    </Form.Label>

                    <Form.Control readOnly defaultValue={propertiesList.name} />

                  </Form.Group></Col>

                  <Col><Form.Group  >
                    <Form.Label>
                      统计
    </Form.Label>

                    <Form.Control readOnly defaultValue={propertiesList.properties_count_type} />

                  </Form.Group></Col>
                  <Col><Form.Group  >
                    <Form.Label>
                      操作
    </Form.Label>

                    <Form.Control readOnly defaultValue={propertiesList.operation} />

                  </Form.Group></Col>
                  <Col><Form.Group  >
                    <Form.Label>
                      值
    </Form.Label>

                    <Form.Control readOnly defaultValue={propertiesList.value} />

                  </Form.Group></Col>

                </Row>

              </div>
              : ''}
          </Form.Group> : ''}

        <Modal show={this.state.count_show} onHide={this.handleHide} size="lg">
          <IconContext.Provider value={{ color: "gray", size: "2em" }}>
            <Modal.Header closeButton>
              <Modal.Title>定义汇聚</Modal.Title>
            </Modal.Header>
            <Modal.Body >
              <p>以节点汇聚,汇聚的条件是连通该节点的其他节点的属性。举个栗子:查询贷款资金通过转帐集中汇入部分帐户，其实是通过壳公司融资。汇聚帐户是实际控制公司，需要统计壳转入该公司资金的帐户数量，比如超过5个。注意，汇聚在模型中，一般从初始节点开始，至最后的节点。因此，当节点数量变化的时候，该参数需要重新设置。</p>



              <ListGroup>
                <ListGroup.Item>
                  <Card>
                    <Card.Header as="h5">定义汇聚节点</Card.Header>
                    <Card.Body>

                      <Form.Group >
                        <Form.Label>选择指向的节点，节点只可能是头尾节点</Form.Label>
                        <Form.Control as="select" value={this.state.group_node} onChange={this.handelGroupNodeChange}>
                          {
                            typeof (this.props.item_list) != 'undefined' ? this.props.item_list.map((row, index) => {


                              return (index === 0 || index === (this.props.item_list.length - 1) ? <option key={index}>{row.name}</option> : ''


                              )
                            }) : ''
                          }



                        </Form.Control>
                      </Form.Group>
                    </Card.Body>
                  </Card>


                </ListGroup.Item>
                <ListGroup.Item>
                  <Card>
                    <Card.Header as="h5">定义统计节点</Card.Header>
                    <Card.Body>

                      <Form.Group >
                        <Form.Label>一旦确定了汇聚节点，另一个头尾节点便为统计节点</Form.Label>
                        <Form.Control type="text" readOnly value={this.state.count_node} />


                      </Form.Group>
                      <Accordion defaultActiveKey={this.state.count_node_type}>
                        <Card>
                          <Accordion.Toggle as={Button} variant="link" eventKey="node" onClick={this.countNodeTypeChange.bind(this, 'node')}>
                            统计节点属性——以设定对节点统计的过滤条件
                                                    </Accordion.Toggle>
                          <Accordion.Collapse eventKey="node">
                            <Card.Body>



                              <PropertiesList onRef={this.refPropertiesList1} u_type='node' properties_data={this.props.properties_data} sum_flag={true} />

                            </Card.Body>
                          </Accordion.Collapse>
                        </Card>
                        {edge_flag ?
                          <Card>
                            <Accordion.Toggle as={Button} variant="link" eventKey="edge" onClick={this.countNodeTypeChange.bind(this, 'edge')}>
                              统计临近的关系的属性——以设定关系的过滤条件
    </Accordion.Toggle>
                            <Accordion.Collapse eventKey="edge">
                              <Card.Body>
                                <Form.Group >
                                  <Form.Label>临近的关系</Form.Label>
                                  <Form.Control type="text" readOnly value={this.state.count_close_to_edge} />


                                </Form.Group>

                                <PropertiesList onRef={this.refPropertiesList2} u_type='edge' properties_data={this.props.properties_data} sum_flag={true} />
                              </Card.Body>
                            </Accordion.Collapse>
                          </Card>
                          : <Alert variant='warning'>
                            相邻的关系是多层关系，因此不支持对不确定关系的统计
                                          </Alert>}
                      </Accordion>

                    </Card.Body>
                  </Card>


                </ListGroup.Item>

              </ListGroup>








            </Modal.Body>













            <Modal.Footer>

              <Button variant="primary" onClick={this.handleSumOK}>
                确定
            </Button><Button variant="primary" onClick={this.handleSumCancel}>
                取消
            </Button>
              {this.state.error_message.length !== 0 ? <Alert variant='danger'>
                {this.state.error_message}
              </Alert> : ''}

            </Modal.Footer>


          </IconContext.Provider>
        </Modal>

      </div>

    );
  }


}
DefinitionSum.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(DefinitionSum);
