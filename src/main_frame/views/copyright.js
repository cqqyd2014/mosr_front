import React,{Component} from 'react';
import {connect} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import back_server from '../../func/back_server';
import axios from 'axios';

import {uft8ToBase64} from '../../func/common';




class Copyright extends Component {
    constructor(props) {
      super(props);
      this.state={
          'version':'',
          
        };
  
    }
    /*
    handelSubmit=(event)=>{
      event.preventDefault();
  
    }
    handleComUSCCChange=(event)=>{
      //console.log(event.target.value);
      this.props.onComUSCCChange(event.target.value);
    }
    handleComNameChange=(event)=>{
      this.props.onComNameChange(event.target.value);
    }
    handleTextChange=(event)=>{
      let o=event.target;
      let target_value={[o.name]:o.value}
      //let target_value={[o.name]:'f'}
      let old=this.state.form_value;
      let new_value=Object.assign({},old,target_value)
      console.log(new_value);
      this.setState({form_value:new_value});
    }
    getTextState=(id)=>{
      let form_value=this.state.form_value;
      let value=form_value[id];
      return value;
  
    }
    handleInvestAmountChange=(event)=>{
      let amount=event.target.value;
      this.setState({
        invest_amount:amount,
        invest_amount_big:math.rmbToBig(amount),
        invest_amount_thousand:math.moneyToThousand(amount)
      });
      
    }
    */
    componentDidMount=()=>{
      //console.log(back_server.restful_api_base_url()+'system/pars/'+uft8ToBase64(JSON.stringify({'par_code':'version'})))
     
      axios.get(back_server.restful_api_base_url()+'system/pars/'+uft8ToBase64(JSON.stringify({'par_code':'version'})))
    .then((response)=> {
      
      this.setState({'version':response.data.par_value});
  
    })
    .catch(function (error) {
      console.log(error);
    });

    }
    
    render() {
      return (
        
  <div className="copyright bg-white">
    <p>
      &copy; <span id="copy-year">2019</span> 版权所有 重庆市审计局金融处 联系人 
      <a
        className="text-primary"
        href="mailto:wangli2000_cn@126.com"
        target="_blank"
        >王利</a
      >.版本号{this.state.version}
    </p>
    <script>
      var d = new Date();
      var year = d.getFullYear();
      document.getElementById("copy-year").innerHTML = year;
  </script>
  </div>


        

        
      );
    }
    
  
  }
  Copyright.propTypes = {
    //onComUSCCChange:PropTypes.func.isRequired,
    //onComNameChange:PropTypes.func.isRequired,
    }
  
  const mapStateToProps = (state) => {
    return {
      //todos: selectVisibleTodos(state.todos, state.filter)
    };
  }
  
  const mapDispatchToProps = {
    /* 
      onComUSCCChange:Actions.comUSCCChangeAction,
      onComNameChange:Actions.comNameChangeAction 
     */
  };
  export default connect(mapStateToProps, mapDispatchToProps)(Copyright);
