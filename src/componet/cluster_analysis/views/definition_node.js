import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';


import Modal from 'react-bootstrap/Modal'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Accordion from 'react-bootstrap/Accordion'

import DefinitionProperties from './definition_properties';


import LabelsTypesSelect from './labels_types_select';


import $ from 'jquery';




import { MdLabel, MdClass } from "react-icons/md";
import { IconContext } from "react-icons";









class DefinitionNode extends Component {
    constructor(props) {
        super(props);
        this.state = {


        };

    }



    componentDidMount = () => {


    }


    handelLabelsTypessBack = (select_labels_types) => {
        let clickItem = this.props.item

        clickItem.select_labels_types = select_labels_types;
        this.props.handelNodeDataBack(clickItem);

    }

    handelPropertiesBack = (item_properties) => {
        let clickItem = this.props.item

        clickItem.properties = item_properties;
        this.props.handelNodeDataBack(clickItem);

    }
    handelRefNodeChange=(event)=>{
        let target = event.target
        let ref_node = target.value;

        let clickItem = this.props.item
       
        clickItem.ref_node = ref_node;
        this.props.handelNodeDataBack(clickItem);

    }

    handlePropertiesChange = (event) => {
        this.setState({ 'properties_value': event.target.value });

    }
    handlePropertiesOperChange = (event) => {
        this.setState({ 'properties_operation': event.target.value });
    }
    handlePropertiesTextChange = (event) => {
        this.setState({ 'properties_text_value': event.target.value });
    }
    handleNodeClose = () => {
        this.props.handleNodeClose();
    }
    handelNodeLableClick = (event) => {
        let target = event.target
        let select_value = target.value;

        let clickItem = this.props.item
        let select_labels = clickItem.select_labels;
        if ($.inArray(select_value, select_labels) === -1) {
            select_labels.push(select_value);
        }
        else {
            select_labels.splice($.inArray(select_value, select_labels), 1);
        }
        clickItem.select_labels = select_labels;
        this.props.handelNodeDataBack(clickItem);
    }


    handleAddProperty = (event) => {
        let clickItem = this.props.item
        let properties = clickItem.properties;
        properties.push({ 'name': this.state.properties_value, 'operation': this.state.properties_operation, 'value': this.state.properties_text_value });
        clickItem.properties = properties
        this.props.handelNodeDataBack(clickItem);

    }
    edgeRadioChange = (edgeRadioValue, event) => {
        //this.setState({ 'edgeRadioValue': edgeRadioValue });
        let clickItem = this.props.item;
        //let item_list = this.state.item_list;
        //设置默认值
        if (edgeRadioValue==='关联节点'){
            if (clickItem.ref_node===''){
                //设置初始
                for (let index in this.props.item_list){
                    if (this.props.item.name!==this.props.item_list[index].name&&index%2===0){
                        clickItem.ref_node=this.props.item_list[index].name;
                    }
                }
            }
        }


        

        clickItem.edgeRadioValue = edgeRadioValue;
        this.props.handelNodeDataBack(clickItem);
    }

    render() {





        return (

            <Modal show={this.props.node_show} onHide={this.handleNodeClose} size="lg">
                <IconContext.Provider value={{ color: "gray", size: "2em" }}>
                    <Modal.Header closeButton>
                        <Modal.Title>定义节点</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                    <p>单一节点为普通节点，可以定义标签及属性，关联节点为“虚拟节点”，用于指向已经存在的节点</p>
                    



                                        <Accordion defaultActiveKey={this.props.item.edgeRadioValue}>
                                            <Card>
                                                <Accordion.Toggle as={Button} variant="link" eventKey="单一节点" onClick={this.edgeRadioChange.bind(this, '单一节点')}>
                                                    单一节点
                                                    </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="单一节点">
                                                    <Card.Body>
                                                    <LabelsTypesSelect handelLabelsTypessBack={this.handelLabelsTypessBack} item={{ ...this.props.item }} labels_types={this.props.node_lables_data} />
                                        <DefinitionProperties handelPropertiesBack={this.handelPropertiesBack} item={{ ...this.props.item }} properties_data={this.props.properties_data} />
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                            <Card>
                                                <Accordion.Toggle as={Button} variant="link" eventKey="关联节点" onClick={this.edgeRadioChange.bind(this, '关联节点')}>
                                                    关联节点
    </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="关联节点">
                                                    <Card.Body>
                                                        
                                                    <Form.Group >
    <Form.Label>选择指向的节点</Form.Label>
    <Form.Control as="select" value={this.props.item.ref_node} onChange={this.handelRefNodeChange}>
    {
                      typeof (this.props.item.name) != 'undefined'?(this.props.item_list.map((row, index) => {


                        return (row.type==='node'&&row.name!==this.props.item.name?<option key={index}>{row.name}</option>:''


                        )
                      })):''
                    }


    
    </Form.Control>
  </Form.Group>
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                        </Accordion>




                                       
                              

                       
                    </Modal.Body>
                    <Modal.Footer>

                        <Button variant="primary" onClick={this.handleNodeClose}>
                            关闭
    </Button>
                    </Modal.Footer>
                </IconContext.Provider>
            </Modal>




        );
    }


}
DefinitionNode.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(DefinitionNode);
