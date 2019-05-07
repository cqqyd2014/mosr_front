import React,{Component} from 'react';
import {connect} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';



import {NavDropdown,Nav,Navbar,FormControl,InputGroup,ButtonToolbar,Form,Row,Col,Button,FormGroup,Label,Input,Container} from 'reactstrap';
class Head extends Component {
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

<header className="main-header " id="header">
  <nav className="navbar navbar-static-top navbar-expand-lg">
    {/*<!-- Sidebar toggle button -->*/}
    <button id="sidebar-toggler" className="sidebar-toggle">
      <span className="sr-only">Toggle navigation</span>
    </button>
    {/*<!-- search form -->*/}
    <div className="search-form d-none d-lg-inline-block">
      <div className="input-group">
        <button type="button" name="search" id="search-btn" className="btn btn-flat">
          <i className="mdi mdi-magnify"></i>
        </button>
        <input type="text" name="query" id="search-input" className="form-control" placeholder="'button', 'chart' etc."
          autofocus autocomplete="off" />
      </div>
      <div id="search-results-container">
        <ul id="search-results"></ul>
      </div>
    </div>

    <div className="navbar-right ">
      <ul className="nav navbar-nav">
        {/*<!-- Github Link Button -->*/}
        <li className="github-link mr-3">
          <a className="btn btn-outline-secondary btn-sm" href="https://github.com/tafcoder/sleek-dashboard" target="_blank">
            <span className="d-none d-md-inline-block mr-2">Source Code</span>
            <i className="mdi mdi-github-circle"></i>
          </a>

        </li>
        <li className="dropdown notifications-menu">
          <button className="dropdown-toggle" data-toggle="dropdown">
            <i className="mdi mdi-bell-outline"></i>
          </button>
          <ul className="dropdown-menu dropdown-menu-right">
            <li className="dropdown-header">You have 5 notifications</li>
            <li>
              <a href="#">
                <i className="mdi mdi-account-plus"></i> New user registered
                <span className=" font-size-12 d-inline-block float-right"><i className="mdi mdi-clock-outline"></i> 10 AM</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="mdi mdi-account-remove"></i> User deleted
                <span className=" font-size-12 d-inline-block float-right"><i className="mdi mdi-clock-outline"></i> 07 AM</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="mdi mdi-chart-areaspline"></i> Sales report is ready
                <span className=" font-size-12 d-inline-block float-right"><i className="mdi mdi-clock-outline"></i> 12 PM</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="mdi mdi-account-supervisor"></i> New client
                <span className=" font-size-12 d-inline-block float-right"><i className="mdi mdi-clock-outline"></i> 10 AM</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="mdi mdi-server-network-off"></i> Server overloaded
                <span className=" font-size-12 d-inline-block float-right"><i className="mdi mdi-clock-outline"></i> 05 AM</span>
              </a>
            </li>
            <li className="dropdown-footer">
              <a className="text-center" href="#"> View All </a>
            </li>
          </ul>
        </li>
        {/*<!-- User Account -->*/}
        <li className="dropdown user-menu">
          <button href="#" className="dropdown-toggle nav-link" data-toggle="dropdown">
            <img src="assets/img/user/user.png" className="user-image" alt="User Image" />
            <span className="d-none d-lg-inline-block">Abdus Salam</span>
          </button>
          <ul className="dropdown-menu dropdown-menu-right">
            {/*<!-- User image -->*/}
            <li className="dropdown-header">
              <img src="assets/img/user/user.png" className="img-circle" alt="User Image" />
              <div className="d-inline-block">
                Abdus Salam <small className="pt-1">abdus@gmail.com</small>
              </div>
            </li>

            <li>
              <a href="profile.html">
                <i className="mdi mdi-account"></i> My Profile
              </a>
            </li>
            <li>
              <a href="email-inbox.html">
                <i className="mdi mdi-email"></i> Message
              </a>
            </li>
            <li>
              <a href="#"> <i className="mdi mdi-diamond-stone"></i> Projects </a>
            </li>
            <li>
              <a href="#"> <i className="mdi mdi-settings"></i> Account Setting </a>
            </li>

            <li className="dropdown-footer">
              <a href="signin.html"> <i className="mdi mdi-logout"></i> Log Out </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>


</header>

        

        
      );
    }
    
  
  }
  Head.propTypes = {
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
  export default connect(mapStateToProps, mapDispatchToProps)(Head);
