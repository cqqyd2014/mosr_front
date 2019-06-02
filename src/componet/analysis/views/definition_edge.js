import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';


import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

import Accordion from 'react-bootstrap/Accordion'

import DefinitionProperties from './definition_properties';


import LabelsTypesSelect from './labels_types_select';


import $ from 'jquery';


import { IconContext } from "react-icons";

import { MdClass,} from "react-icons/md";










class DefinitionEdge extends Component {
  constructor(props) {
    super(props);
    this.state = {


    };

  }
  
  handleMax = (event) => {
    let target = event.target
    let _max_value = target.value;
    //let item_list = this.state.item_list;
    let clickItem =this.props.item;

    clickItem._max = _max_value;
    this.props.handelEdgeDataBack(clickItem);
  }
  handelPropertiesBack=(item_properties)=>{
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
  handelLabelsTypessBack=(select_labels_types)=>{
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

        <Modal show={this.props.edge_show} onHide={this.handleEdgeClose} size="lg">
          <IconContext.Provider value={{ color: "gray", size: "2em" }}>
                <Modal.Header closeButton>
                  <Modal.Title>定义关系</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                <p>关系的类型有两种，一种为单层关系，可以指定关系类型，一种为多层关系，层数不确定，需指定最大最小层数。</p>



<Accordion defaultActiveKey={this.props.item.edgeRadioValue}>
    <Card>
        <Accordion.Toggle as={Button} variant="link" eventKey="单层关系" onClick={this.edgeRadioChange.bind(this, '单层关系')}>
        单层关系
            </Accordion.Toggle>
        <Accordion.Collapse eventKey="单层关系">
            <Card.Body>
            <LabelsTypesSelect handelLabelsTypessBack={ this.handelLabelsTypessBack} item={{...this.props.item}} labels_types={this.props.edge_types_data}/>
                        
                        <DefinitionProperties handelPropertiesBack={this.handelPropertiesBack} item={{...this.props.item}} properties_data={this.props.properties_data}/>
            </Card.Body>
        </Accordion.Collapse>
    </Card>
    <Card>
        <Accordion.Toggle as={Button} variant="link" eventKey="多层关系" onClick={this.edgeRadioChange.bind(this, '多层关系')}>
        多层关系
</Accordion.Toggle>
        <Accordion.Collapse eventKey="多层关系">
            <Card.Body><Row>
                          <Col><Form.Label>最小</Form.Label>
                            <Form.Control type="text" value={this.props.item._min} onChange={this.handleMin} /></Col><Col><Form.Label>最大</Form.Label>
                            <Form.Control type="text" value={this.props.item._max} onChange={this.handleMax} /></Col>
                        </Row></Card.Body>
        </Accordion.Collapse>
    </Card>
</Accordion>








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
DefinitionEdge.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(DefinitionEdge);
