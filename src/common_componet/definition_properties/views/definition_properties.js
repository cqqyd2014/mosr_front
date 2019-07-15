import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';


import PropertiesList from './properties_list'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import { MdAssignment } from "react-icons/md";

class DefinitionProperties extends Component {
  constructor(props) {
    super(props);
    this.state = {
        

    };

  }
 


  componentDidMount = () => {
    

    
    
    

    


  }
  onPropertiesValueChange = (value) => {

    this.setState({ 'properties_value': value });

  }
  onPropertiesOperChange = (value) => {
    this.setState({ 'properties_operation': value });
  }
  onPropertiesTextChange = (value) => {
    this.setState({ 'properties_text_value': value });
    
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
  onPropertiesColumnTypeChange=(value)=>{
    this.setState({'properties_column_type':value})
  }

  handleAddProperty = (event) => {
    


    let properties_list_value=this.properties_list.getComponetValue()
    console.log(properties_list_value)
    if(properties_list_value.value===''){
      return
    }



    let item_properties = this.props.item.properties
    
    item_properties.push(properties_list_value);
    
    this.props.handelPropertiesBack(item_properties);

  }

  refPropertiesList=(ref)=>{
    this.properties_list=ref

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
                        <th>类型</th>
                        <th>操作</th>
                        <th>值</th>
                        <th>管理</th>


                      </tr>
                    </thead>
                    <tbody>{
                      this.props.item.properties.map((row, index) => {


                        return (<tr key={index}><td>{row.name}</td><td>{row.type}</td><td>{row.operation}</td><td>{row.value}</td><td><Button variant="secondary" onClick={this.handleDeleteProperty.bind(this, index)}>删除</Button></td></tr>


                        )
                      })
                    }
                    </tbody>

                  </Table>

                  <PropertiesList onRef={this.refPropertiesList}  u_type={this.props.u_type} properties_data={this.props.properties_data} sum_flag={false}/>

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
