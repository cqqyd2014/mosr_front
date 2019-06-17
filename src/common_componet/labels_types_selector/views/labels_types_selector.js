import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';



import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'






import $ from 'jquery';




import { MdLabel } from "react-icons/md";










class LabelsTypesSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
        properties_value: 'name',
        properties_text_value: '',
        properties_operation: '等于',

    };

  }
 


  componentDidMount = () => {


  }
  handelLableTypeClick = (event) => {
    let target = event.target
    let select_value = target.value;

   
    let clickItem = this.props.item;
    let select_labels_types = clickItem.select_labels_types;
    if ($.inArray(select_value, select_labels_types) === -1) {
        select_labels_types.push(select_value);
    }
    else {
        select_labels_types.splice($.inArray(select_value, select_labels_types), 1);
    }
    
    this.props.handelLabelsTypesBack(select_labels_types);

  }


  render() {





    return (

        
        <Card bg="light" style={{ flex: '1 1 auto' }}>
        <Card.Header><MdLabel />选择标签/类型</Card.Header>
        <Card.Body>
            
          <Card.Title>可以选择多个节点标签/关系类型</Card.Title>
          <Card.Text>对于多个标签，系统为“并且”的处理方式，对于多个类型，系统为“或者”的处理方式。</Card.Text>
          <Form.Control as="select" multiple value={this.props.item.select_labels_types} onChange={this.handelLableTypeClick}>
            {typeof (this.props.types_data) == 'undefined' ? '' : this.props.types_data.map((row, index) => {


              return (<option key={index}>{row}</option>


              )
            })}


          </Form.Control>
          
        </Card.Body>
      </Card>






    );
  }


}
LabelsTypesSelector.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(LabelsTypesSelector);
