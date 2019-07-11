import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';


import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

import ListGroup from 'react-bootstrap/Accordion'




import $ from 'jquery';


import { IconContext } from "react-icons";












class DefinitionSum extends Component {
  constructor(props) {
    super(props);
    this.state = {


    };

  }

  handleMax = (event) => {
    let target = event.target
    let _max_value = target.value;
    //let item_list = this.state.item_list;
    let clickItem = this.props.item;

    clickItem._max = _max_value;
    this.props.handelEdgeDataBack(clickItem);
  }
  handelPropertiesBack = (item_properties) => {
    let clickItem = this.props.item

    clickItem.properties = item_properties;
    this.props.handelEdgeDataBack(clickItem);

  }
  handleMin = (event) => {




    let target = event.target
    let _min_value = target.value;
    //let item_list = this.state.item_list;
    let clickItem = this.props.item

    clickItem._min = _min_value;
    this.props.handelEdgeDataBack(clickItem);

  }
  handelLabelsTypesBack = (select_labels_types) => {
    let clickItem = this.props.item

    clickItem.select_labels_types = select_labels_types;
    this.props.handelEdgeDataBack(clickItem);
  }


  handelEdgeTypeClick = (event) => {
    let target = event.target
    let select_value = target.value;


    let clickItem = this.props.item;
    let select_types = clickItem.select_types;
    if ($.inArray(select_value, select_types) === -1) {
      select_types.push(select_value);
    }
    else {
      select_types.splice($.inArray(select_value, select_types), 1);
    }
    clickItem.select_types = select_types;
    this.props.handelEdgeDataBack(clickItem);
  }
  edgeRadioChange = (edgeRadioValue, event) => {
    //this.setState({ 'edgeRadioValue': edgeRadioValue });

    //let item_list = this.state.item_list;
    let clickItem = this.props.item;

    clickItem.edgeRadioValue = edgeRadioValue;
    this.props.handelEdgeDataBack(clickItem);
  }
  componentDidMount = () => {


  }
  handleEdgeClose = () => {
    this.props.handleEdgeClose();
  }



  render() {





    return (
        是否启用汇聚

      <Modal show={this.props.edge_show} onHide={this.handleEdgeClose} size="lg">
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
    <Form.Label>选择指向的节点</Form.Label>
    <Form.Control as="select" value={this.props.sum_node} onChange={this.handelSumNodeChange}>
    {
                      typeof (this.props.item.name) != 'undefined'?(this.props.item_list.map((row, index) => {


                        return (row.type==='node'?<option key={index}>{row.name}</option>:''


                        )
                      })):''
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
    <Form.Label>选择统计的节点，定义需要统计的节点属性</Form.Label>
    <Form.Control as="select" value={this.props.sum_node} onChange={this.handelSumNodeChange}>
    {
                      typeof (this.props.item.name) != 'undefined'?(this.props.item_list.map((row, index) => {


                        return (row.type==='node'?<option key={index}>{row.name}</option>:''


                        )
                      })):''
                    }


    
    </Form.Control>
  </Form.Group>
  </Card.Body>
</Card>


  </ListGroup.Item>
  
</ListGroup>








          </Modal.Body>













          <Modal.Footer>

            <Button variant="primary" onClick={this.handleEdgeClose}>
              关闭
            </Button>
          </Modal.Footer>


        </IconContext.Provider>
      </Modal>



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
