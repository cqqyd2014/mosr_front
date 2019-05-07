import React,{Component} from 'react';
import {connect} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import Aside from './aside'
import PageWrapper from './page-wrapper'
import {NavDropdown,Nav,Navbar,FormControl,InputGroup,ButtonToolbar,Form,Row,Col,Button,FormGroup,Label,Input,Container} from 'reactstrap';
class MainFrame extends Component {
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
   componentWillMount() {
     /*
     let script_bootstrap = document.createElement('script');
     script_bootstrap.type = 'text/javascript';
     script_bootstrap.src = 'assets/plugins/bootstrap/js/bootstrap.bundle.min.js';
     document.getElementById('root').appendChild(script_bootstrap);
     let script_nprogress = document.createElement('script');
     script_nprogress.type = 'text/javascript';
     script_nprogress.src = 'assets/plugins/nprogress/nprogress.js';
     document.getElementById('root').appendChild(script_nprogress);
     let script_nprogress_run = document.createElement('script');
     script_nprogress_run.type = 'text/javascript';
     script_nprogress_run.src = 'NProgress.configure({ showSpinner: false });NProgress.start();';
     document.getElementById('root').appendChild(script_nprogress_run);
     let script_jquery = document.createElement('script');
     script_jquery.type = 'text/javascript';
     script_jquery.src = 'assets/plugins/jquery/jquery.min.js';
     document.getElementById('root').appendChild(script_jquery);

     let script_test = document.createElement('script');
     script_test.type = 'text/javascript';
     script_test.src = 'assets/js/test.js';
     document.getElementById('root').appendChild(script_test);

*/

   }
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
        <div>
          
        <div className="mobile-sticky-body-overlay"></div>

        <div className="wrapper">
        <Aside/>
        <PageWrapper/>
        </div>
          
        </div>
        

        
      );
    }
    
  
  }
  MainFrame.propTypes = {
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
  export default connect(mapStateToProps, mapDispatchToProps)(MainFrame);
