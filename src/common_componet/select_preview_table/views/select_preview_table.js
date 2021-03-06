import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';


import Alert from 'react-bootstrap/Alert'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'

import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'


import back_server from '../../../func/back_server';
import axios from 'axios';



import { MdApps } from "react-icons/md";










class SelectPreviewTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      tables:[],
      preview_tabel_cols:[],
      preview_tabel_cols_types:[],
      preview_tabel_cells:[],
      select_table:'',
      error_message:'',

    };

  }



  componentDidMount = () => {
   
    this.props.onRef(this)


  }


  getTopRowCells=(select_table,top)=>{
    var config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }
    //console.log(select_table)
    axios.post(back_server.restful_api_base_url() + 'get_top_row_cells/', {'top':top,'select_table':select_table, 'db_type': this.props.db_type, 'db_address': this.props.db_address, 'db_port': this.props.db_port, 'db_name': this.props.db_name, 'db_username': this.props.db_username, 'db_password': this.props.db_password }, config
    )
      .then((response)=>{
        let response_data = response.data;

        this.setState({'preview_tabel_cells':response_data})
        
        

        
        
      })
      .catch((error)=> {
        console.log(error);
      });

  }


  getCols=(select_table)=>{
    var config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }
    //console.log(select_table)
    axios.post(back_server.restful_api_base_url() + 'get_cols/', {'select_table':select_table, 'db_type': this.props.db_type, 'db_address': this.props.db_address, 'db_port': this.props.db_port, 'db_name': this.props.db_name, 'db_username': this.props.db_username, 'db_password': this.props.db_password }, config
    )
      .then((response)=>{
        let response_data = response.data;
        let col_names=[]
        let col_types=[]
        //console.log(response_data)
        if (response_data.length===0){
          this.setState({ 'error_message': '当前表不能获取字段，字段中可能存在特殊字符，请修改后再导入' });
          this.setState({'preview_tabel_cells':[]})
          this.setState({ 'preview_tabel_cols': [] });
        this.setState({ 'preview_tabel_cols_types': [] });
          return
        }
        for (let i in response_data){
          let item=response_data[i]
          col_names.push(item[0])
          col_types.push(item[1])
        }
        
        this.setState({ 'preview_tabel_cols': col_names });
        this.setState({ 'preview_tabel_cols_types': col_types });
        this.props.onGetCols(col_names,col_types)
        this.getTopRowCells(select_table,5);


        
        
      })
      .catch((error)=> {
        console.log(error);
      });

  }

  getTables=()=>{
    var config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }
    
    axios.post(back_server.restful_api_base_url() + 'get_tables/', { 'db_type': this.props.db_type, 'db_address': this.props.db_address, 'db_port': this.props.db_port, 'db_name': this.props.db_name, 'db_username': this.props.db_username, 'db_password': this.props.db_password }, config
    )
      .then((response)=>{
        let response_data = response.data;
        
        
        this.setState({ 'tables': response_data });
        //设置第一个为选定的表
        if (response_data.length>0){
          this.setState({'select_table':response_data[0]});
          this.getCols(response_data[0]);
          this.props.onSelectTable(response_data[0]);
        }
        

        
      })
      .catch((error)=> {
        console.log(error);
      });


  }


  handelSelectTableChange = (event) => {
    //console.log(event.target.value)
    this.setState({'select_table':event.target.value});
    this.getCols(event.target.value);
    this.props.onSelectTable(event.target.value);

  }



  render() {





    return (


      <Card bg="light" style={{ flex: '1 1 auto' }}>
        <Card.Header><MdApps />选择并预览表格</Card.Header>
        <Card.Body>
          <Card.Title>选择表格之后，系统将预览前5条记录</Card.Title>

          <Row>
            <Col><Form.Label>现有数据表</Form.Label>
              <Form.Control as="select" value={this.state.select_table} onChange={this.handelSelectTableChange}>

              
              {
                            this.state.tables.length>0?this.state.tables.map((row, index) => {
                              return (
                                <option key={index}>{row}</option>

                              )
                            }):''
                          }
                

              </Form.Control></Col>
            

          </Row>
          <Row>
            <Col>
            <Table responsive>
                      <thead>
                        <tr>
                          {
                            this.state.preview_tabel_cols.map((row, index) => {
                              return (
                                <td key={index}>{row}</td>

                              )
                            })
                          }

                        </tr>
                      </thead>
                      <tbody>
                        {
                          this.state.preview_tabel_cells.map((row, r_index) => {
                            return (<tr key={r_index}>
                              {
                                this.state.preview_tabel_cols.map((head, h_index) => {
                                  return (
                                    <td key={h_index}>{row[h_index]}</td>

                                  )
                                })
                              }

                            </tr>
                            )
                          })
                        }
                      </tbody>
                    </Table>

            </Col>

          </Row>

{this.state.error_message.length !== 0 ? <Alert variant='danger'>
{this.state.error_message}
</Alert> : ''}

        </Card.Body>
      </Card>






    );
  }


}
SelectPreviewTable.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(SelectPreviewTable);
