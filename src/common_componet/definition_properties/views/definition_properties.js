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




import { MdAssignment } from "react-icons/md";










class DefinitionProperties extends Component {
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

  handleDeleteProperty = (index, event) => {
   
    //let clickItem = this.props.item
    let properties = this.props.item.properties;
    properties.splice(index, 1);
    //properties.push({'name':this.state.properties_value,'value':this.state.properties_text_value});
    
    this.props.handelPropertiesBack(properties);
  }

  handleAddProperty = (event) => {
    let item_properties = this.props.item.properties
    
    item_properties.push({ 'name': this.state.properties_value, 'operation': this.state.properties_operation, 'value': this.state.properties_text_value });
    
    this.props.handelPropertiesBack(item_properties);

  }


  render() {





    return (

        
              <Card bg="light" style={{ flex: '1 1 auto' }}>
                <Card.Header><MdAssignment />定义属性</Card.Header>
                <Card.Body>
                  <Card.Title>当前已经定义的属性列表</Card.Title>

                  <Table responsive>
                    <thead>
                      <tr>
                        <th>属性</th>
                        <th>操作</th>
                        <th>值</th>
                        <th>管理</th>


                      </tr>
                    </thead>
                    <tbody>{
                      this.props.item.properties.map((row, index) => {


                        return (<tr key={index}><td>{row.name}</td><td>{row.operation}</td><td>{row.value}</td><td><Button variant="secondary" onClick={this.handleDeleteProperty.bind(this, index)}>删除</Button></td></tr>


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
                  <Row><Col>操作</Col><Col><Form.Control as="select" value={this.state.properties_oper} onChange={this.handlePropertiesOperChange}>
                   <option >等于</option>
                   <option >大于</option>
                   <option >小于</option>
                   <option >包含</option>
                   <option >不等于</option>

                  </Form.Control></Col></Row>
                  <Row><Col>属性值</Col>
                  <Col><Form.Control type="text" value={this.state.properties_text_value} onChange={this.handlePropertiesTextChange}/></Col>
                  </Row>

                  <Button variant="primary" onClick={this.handleAddProperty}>
                    添加新属性
    </Button>
                </Card.Body>
              </Card>






    );
  }


}
DefinitionProperties.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(DefinitionProperties);
