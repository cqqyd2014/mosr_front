import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';



import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import Alert from 'react-bootstrap/Alert'

import back_server from '../../../func/back_server';
import axios from 'axios';



import { MdApps } from "react-icons/md";










class DefinitionDatabaseConnection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      db_type: 'MS SQLSERVER',
      db_address: 'localhost',
      db_port: '1433',
      db_name: 'master',
      db_username: 'sa',
      db_password: 'Wang1980',
      connect_message_body: '',
      connect_message_type: ''

    };

  }



  componentDidMount = () => {


  }

  handelDbNameChange = (event) => {
    this.setState({ 'db_name': event.target.value });

  }
  handelDbUserNameChange = (event) => {
    this.setState({ 'db_username': event.target.value });
  }
  handelDbPasswordChange = (event) => {
    this.setState({ 'db_password': event.target.value });
  }
  handelDbPortChange = (event) => {
    this.setState('db_port', event.target.value);
  }

  handelDbAddressChange = (event) => {

    this.setState('db_address', event.target.value);
  }

  handelDbTypeChange = (event) => {
    this.setState('db_type', event.target.value);

  }

  handletestConnection = (event) => {
    var config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }
    axios.post(back_server.restful_api_base_url() + 'test_connection/', { 'db_type': this.state.db_type, 'db_address': this.state.db_address, 'db_port': this.state.db_port, 'db_name': this.state.db_name, 'db_username': this.state.db_username, 'db_password': this.state.db_password }, config
    )
      .then((response)=>{
        let response_data = response.data;

        this.setState({ 'connect_message_type': response_data.connect_message_type });
        this.setState({ 'connect_message_body': response_data.connect_message_body });
        if (response_data.connect_message_type==='success'){
          this.props.onDbConnected(true,this.state.db_type,this.state.db_address,this.state.db_port,this.state.db_name,this.state.db_username,this.state.db_password)
        }
        else{
          this.props.onDbConnected(false,this.state.db_type,this.state.db_address,this.state.db_port,this.state.db_name,this.state.db_username,this.state.db_password)
        }
      })
      .catch((error)=> {
        console.log(error);
      });

  }


  render() {





    return (


      <Card bg="light" style={{ flex: '1 1 auto' }}>
        <Card.Header><MdApps />定义数据库连接</Card.Header>
        <Card.Body>
          <Card.Title>系统当前支持各种大型数据库连接</Card.Title>

          <Row>
            <Col><Form.Label>数据库类型</Form.Label>
              <Form.Control as="select" value={this.state.db_type} onChange={this.handelDbTypeChange}>
                <option>MS SQLSERVER</option>
                

              </Form.Control></Col>
            <Col>
              <Form.Label>网络地址</Form.Label>
              <Form.Control type="text" placeholder="0.0.0.0" value={this.state.db_address} onChange={this.handelDbAddressChange} />
            </Col>
            <Col>
              <Form.Label>端口号</Form.Label>
              <Form.Control type="text" value={this.state.db_port} onChange={this.handelDbPortChange} />
            </Col>

          </Row>
          <Row>
            <Col><Form.Label>数据库名</Form.Label>
              <Form.Control type="text" value={this.state.db_name} onChange={this.handelDbNameChange} /></Col>
            <Col>
              <Form.Label>用户名</Form.Label>
              <Form.Control type="text" value={this.state.db_username} onChange={this.handelDbUserNameChange} />
            </Col>
            <Col>
              <Form.Label>密码</Form.Label>
              <Form.Control type="password" value={this.state.db_password} onChange={this.handelDbPasswordChange} />
            </Col>

          </Row>


          <Button variant="primary" onClick={this.handletestConnection}>
            测试连接
    </Button>
          {this.state.connect_message_body != '' ? <Alert variant={this.state.connect_message_type}>
            {this.state.connect_message_body}
          </Alert> : ''}

        </Card.Body>
      </Card>






    );
  }


}
DefinitionDatabaseConnection.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(DefinitionDatabaseConnection);
