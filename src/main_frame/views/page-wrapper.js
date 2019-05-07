import React,{Component} from 'react';
import {connect} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import Head from './head'
import Copyright from './copyright'


import {NavDropdown,Nav,Navbar,FormControl,InputGroup,ButtonToolbar,Form,Row,Col,Button,FormGroup,Label,Input,Container} from 'reactstrap';
class PageWrapper extends Component {
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
        <div className="page-wrapper">
        {/*<!-- Header -->*/}
          <Head/>
            <div className="content-wrapper">
              <div className="content">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="card card-default">
                      <div className="card-header  justify-content-between">
                        <h2>Sidebar Without Footer </h2>
                      </div>
                      <div className="card-body">
                        <blockquote className="blockquote">
                          <p className="mb-0">Sidebar has no footer by default. Remove class
                            <code>sidebar-with-footer</code> from
                            <code>&lt;body id="sidebar" className="sidebar"&gt;</code> if it was added before and remove any content added after
                            side navigation</p>
                        </blockquote>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          <footer className="footer mt-auto">
            <Copyright/>
          </footer>

          </div>
        

        
      );
    }
    
  
  }
  PageWrapper.propTypes = {
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
  export default connect(mapStateToProps, mapDispatchToProps)(PageWrapper);
