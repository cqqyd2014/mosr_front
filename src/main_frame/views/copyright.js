import React,{Component} from 'react';
import {connect} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';





class Copyright extends Component {
    constructor(props) {
      super(props);
      this.state={
          title:'',
          
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
      //console.log(system_info.restful_api_base_url());
      /* axios_ajax.get(system_info.restful_api_base_url(),'api/baseparameter/money_type',{},this,(a,b)=>{
        console.log(a);
        console.log(b);
      }); 
      axios.get(system_info.restful_api_base_url()+'api/baseparameter/money_type')
    .then((response)=> {
      let data=database.baseparameter(response);
      //console.log(data);
      this.setState({invest_money_types:data});
  
    })
    .catch(function (error) {
      console.log(error);
    });
  */
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
      >.
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
