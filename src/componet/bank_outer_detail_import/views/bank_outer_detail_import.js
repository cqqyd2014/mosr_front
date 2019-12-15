import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import back_server from '../../../func/back_server';
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

import Form from 'react-bootstrap/Form'
import io from 'socket.io-client';
import * as HeadActions from '../../head/redux/actions'
import TemplateCEB from './templates/ceb'


//const socket = io(back_server.ws_api_base_url());


class BankOuterDetailImport extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      bank_list:[],
      bank_selected:'CEB',
      import_message:'',
      

    };

  }


  componentDidMount = () => {
    
   
    
    console.log(back_server.restful_api_base_url() + 'bank/infos/')

    axios.get(back_server.restful_api_base_url() + 'bank/infos/')
      .then((response) => {
        
        //let data=database.baseparameter(response);
        this.setState({'bank_list': response.data })
        
        

      })
      .catch(function (error) {
        
        console.log(error);
      });
  }




  render() {


    return (

      <div className="content-wrapper" style={{display:'flex',flexDirection:'column',alignItems:'stretch',flex:'1 1 auto'}}>
      <div className="content" style={{display:'flex',flexDirection:'column',alignItems:'stretch',flex:'1 1 auto'}}>
        <div className="row" style={{display:'flex',flexDirection:'column',alignItems:'stretch',flex:'1 1 auto'}}>
          <div className="col-lg-12" style={{display:'flex',flexDirection:'column',alignItems:'stretch',flex:'1 1 auto'}}>

            {this.props.full === true ? '' : (<div className="card card-default" style={{flex:'1 1 auto'}}>
              
            <Alert variant="info">
  <Alert.Heading>各家银行的司法查询数据</Alert.Heading>
  <p>
  不同银行有不同的查询模板，支持光大银行
  </p>
  
</Alert>
              
              
              <div className="card-body">
                <div>
                <Form.Group >
    <Form.Label>1、当前的数据为</Form.Label>
    <Form.Control as="select" value={this.state.bank_selected}>
              {
                                                this.state.bank_list.map((row, index) => {


                                                  return (<option key={index} value ={row.bank_code}>{row.bank_name}</option>


                                                  )
                                                })
                                              }
    </Form.Control>
    </Form.Group></div>
    <div>{
      this.state.bank_selected==='CEB'?<TemplateCEB/>:''

    }</div>
              
                
            
            
{this.state.import_message !== '' ? <Alert variant={this.state.import_type}>
{this.state.import_message}
</Alert> : ''}

            
              </div>
            </div>
            )}
            





          </div>
        </div>
      </div>
    </div>





    );
  }


}
BankOuterDetailImport.propTypes = {
  //onComUSCCChange:PropTypes.func.isRequired,
  //onComNameChange:PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    node_lables_data: state.SystemReducer.node_lables_data,
    full: state.CytoscapejsReducer.full
  };
}

const mapDispatchToProps = {
  //neo4jgraphChange: NeoGraphActions.neo4jCypherChangeAction,
  onNodeMessageChange:HeadActions.headMessageChangeAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(BankOuterDetailImport);
