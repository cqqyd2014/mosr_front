import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import back_server from '../../../../func/back_server';
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

import Form from 'react-bootstrap/Form'
import io from 'socket.io-client';

import {uft8ToBase64} from '../../../../func/common'



//const socket = io(back_server.ws_api_base_url());


class TemplateCEB extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      
      

    };

  }


  componentDidMount = () => {
      let p={'filters':[{'field':'par_code','operation':'=','parameter1':'version'}]}
      console.log(typeof(p))
      console.log('士大夫士大夫色粉色分')
      console.log(uft8ToBase64(JSON.stringify(p)))

    axios.get(back_server.restful_api_base_url() + 'system/pars/')
      .then((response) => {
        console.log(response.data)
        //let data=database.baseparameter(response);
        //this.setState({'bank_list': response.data })
        
        

      })
      .catch(function (error) {
        
        console.log(error);
      });
   
    
  }




  render() {


    return (

     <div>
         <div>光大银行</div>

     </div>





    );
  }


}
TemplateCEB.propTypes = {
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
  //onNodeMessageChange:HeadActions.headMessageChangeAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(TemplateCEB);
