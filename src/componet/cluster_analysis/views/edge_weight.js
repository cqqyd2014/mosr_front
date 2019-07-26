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


class EdgeWeight extends Component {
  constructor(props) {
    super(props);
   
    this.state = {
     









    };

  }
  


  componentDidMount = () => {

  }





  render() {

    //let item_count = this.state.item_list.length;
    return (

     

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






    );
  }


}
EdgeWeight.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(EdgeWeight);
