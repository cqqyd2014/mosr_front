import React,{Component} from 'react';
import {connect} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';

import {MdHelp,MdFilter,MdBubbleChart,MdFolder, MdDashboard } from "react-icons/md";
import {NavDropdown,Nav,Navbar,FormControl,InputGroup,ButtonToolbar,Form,Row,Col,Button,FormGroup,Label,Input,Container} from 'reactstrap';
class Aside extends Component {
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
        
        
        <aside className="left-sidebar bg-sidebar">
            <div id="sidebar" className="sidebar sidebar-with-footer">
              {/*<!-- Aplication Brand -->*/}
              <div className="app-brand">
                <a href="/index.html">
                  <svg className="brand-icon" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" width="30" height="33"
                    viewBox="0 0 30 33">
                    <g fill="none" fill-rule="evenodd">
                      <path className="logo-fill-blue" fill="#7DBCFF" d="M0 4v25l8 4V0zM22 4v25l8 4V0z" />
                      <path className="logo-fill-white" fill="#FFF" d="M11 4v25l8 4V0z" />
                    </g>
                  </svg>
                  <span className="brand-name">社群知识发现系统</span>
                </a>
              </div>
              {/*<!-- begin sidebar scrollbar -->*/}
              <div className="sidebar-scrollbar">

                {/*<!-- sidebar menu -->*/}
                <ul className="nav sidebar-inner" id="sidebar-menu">
                  

                  
                  <li  className="has-sub" >
                    <a className="sidenav-item-link" href="javascript:void(0)" data-toggle="collapse" data-target="#dashboard"
                      aria-expanded="false" aria-controls="dashboard">
                      <i className="mdi mdi-view-dashboard-outline"></i>
                      <span className="nav-text">系统概览</span> <b className="caret"></b>
                    </a>
                    <ul  className="collapse"  id="dashboard"
                      data-parent="#sidebar-menu">
                      <div className="sub-menu">
                        
                        
                        
                        <li >
                          <a className="sidenav-item-link" href="index.html">
                            <span className="nav-text">现有数据</span>
                            
                          </a>
                        </li>
                        
                        

                        
                        
                        
                        <li >
                          <a className="sidenav-item-link" href="analytics.html">
                            <span className="nav-text">服务器状态</span>

                            
                          </a>
                        </li>
                        
                        

                        
                      </div>
                    </ul>
                  </li>
                  

                  

                  
                  <li  className="has-sub" >
                    <a className="sidenav-item-link" href="javascript:void(0)" data-toggle="collapse" data-target="#ui-elements"
                      aria-expanded="false" aria-controls="ui-elements">
                      <i class="mdi mdi-chart-pie"></i>
                      <span className="nav-text">定义社群</span> <b className="caret"></b>
                    </a>
                    <ul  className="collapse"  id="ui-elements"
                      data-parent="#sidebar-menu">
                      <div className="sub-menu">
                        
                        
                        <li  className="has-sub" >
                          <a className="sidenav-item-link" href="javascript:void(0)" data-toggle="collapse" data-target="#components"
                            aria-expanded="false" aria-controls="components">
                            <span className="nav-text">创建新社群</span> <b className="caret"></b>
                          </a>
                          <ul  className="collapse"  id="components">
                            <div className="sub-menu">
                              
                              <li >
                                <a href="alert.html">创建新社群</a>
                              </li>
                              

                              
                              
                            </div>
                          </ul>
                        </li>
                        

                        
                        
                        <li  className="has-sub" >
                          <a className="sidenav-item-link" href="javascript:void(0)" data-toggle="collapse" data-target="#icons"
                            aria-expanded="false" aria-controls="icons">
                            <span className="nav-text">我的社群模板</span> <b className="caret"></b>
                          </a>
                          <ul  className="collapse"  id="icons">
                            <div className="sub-menu">
                              
                              <li >
                                <a href="material-icon.html">模板1</a>
                              </li>
                              
                              <li >
                                <a href="flag-icon.html">模板2</a>
                              </li>
                              
                            </div>
                          </ul>
                        </li>
                        


                        

                        
                      </div>
                    </ul>
                  </li>
                  

                  

                  
                  <li  className="has-sub" >
                    <a className="sidenav-item-link" href="javascript:void(0)" data-toggle="collapse" data-target="#charts"
                      aria-expanded="false" aria-controls="charts">
                      <i class="mdi mdi-image-filter-none"></i>
                      <span className="nav-text">社群知识发现</span> <b className="caret"></b>
                    </a>
                    <ul  className="collapse"  id="charts"
                      data-parent="#sidebar-menu">
                      <div className="sub-menu">
                        
                        
                        
                        <li >
                          <a className="sidenav-item-link" href="chartjs.html">
                            <span className="nav-text">ChartJS</span>
                            
                          </a>
                        </li>
                        
                        

                        
                      </div>
                    </ul>
                  </li>
                  

                  

                  
                  <li  className="has-sub" >
                    <a className="sidenav-item-link" href="javascript:void(0)" data-toggle="collapse" data-target="#pages"
                      aria-expanded="false" aria-controls="pages">
                      <i class="mdi mdi-book-open-page-variant"></i>
                      <span className="nav-text">我的分析模板</span> <b className="caret"></b>
                    </a>
                    <ul  className="collapse"  id="pages"
                      data-parent="#sidebar-menu">
                      <div className="sub-menu">
                        
                        
                        
                        <li >
                          <a className="sidenav-item-link" href="user-profile.html">
                            <span className="nav-text">我的模板</span>
                            
                          </a>
                        </li>
                        
                        

                        
                        
                        <li  className="has-sub" >
                          <a className="sidenav-item-link" href="javascript:void(0)" data-toggle="collapse" data-target="#authentication"
                            aria-expanded="false" aria-controls="authentication">
                            <span className="nav-text">模板管理</span> <b className="caret"></b>
                          </a>
                          <ul  className="collapse"  id="authentication">
                            <div className="sub-menu">
                              
                              <li >
                                <a href="sign-in.html">导入模板</a>
                              </li>
                              
                              <li >
                                <a href="sign-up.html">模板导出</a>
                              </li>
                              
                            </div>
                          </ul>
                        </li>
                        

                        

                        

                        
                      </div>
                    </ul>
                  </li>
                  

                  

                  
                  <li  className="has-sub active expand" >
                    <a className="sidenav-item-link" href="javascript:void(0)" data-toggle="collapse" data-target="#documentation"
                      aria-expanded="false" aria-controls="documentation">
                      <i class="mdi mdi-magnify"></i>
                      <span className="nav-text">帮助主题</span> <b className="caret"></b>
                    </a>
                    <ul  className="collapse show"  id="documentation"
                      data-parent="#sidebar-menu">
                      <div className="sub-menu">
                        
                        
                        
                        <li className="section-title">
                          使用帮助
                        </li>
                        
                        

                        
                        
                        
                        <li >
                          <a className="sidenav-item-link" href="introduction.html">
                            <span className="nav-text">设计理念</span>
                            
                          </a>
                        </li>
                        
                        

                        
                        
                        
                        <li >
                          <a className="sidenav-item-link" href="setup.html">
                            <span className="nav-text">案例入门</span>
                            
                          </a>
                        </li>
                        
                        

                        
                        
                        
                        <li >
                          <a className="sidenav-item-link" href="customization.html">
                            <span className="nav-text">相关技术规范</span>
                            
                          </a>
                        </li>
                        
                        

                        
                        
                        
                        <li className="section-title">
                          关于我们
                        </li>
                        
                        

                        
                        
                        <li  className="has-sub" >
                          <a className="sidenav-item-link" href="javascript:void(0)" data-toggle="collapse" data-target="#headers"
                            aria-expanded="false" aria-controls="headers">
                            <span className="nav-text">重庆市审计局金融处</span> <b className="caret"></b>
                          </a>
                          <ul  className="collapse"  id="headers">
                            <div className="sub-menu">
                              
                              <li >
                                <a href="header-fixed.html">Header Fixed</a>
                              </li>
                              
                              <li >
                                <a href="header-static.html">Header Static</a>
                              </li>
                              
                              <li >
                                <a href="header-light.html">Header Light</a>
                              </li>
                              
                              <li >
                                <a href="header-dark.html">Header Dark</a>
                              </li>
                              
                            </div>
                          </ul>
                        </li>
                        

                        
                        
                        <li  className="has-sub active expand" >
                          <a className="sidenav-item-link" href="javascript:void(0)" data-toggle="collapse" data-target="#sidebar-navs"
                            aria-expanded="false" aria-controls="sidebar-navs">
                            <span className="nav-text">layout Sidebars</span> <b className="caret"></b>
                          </a>
                          <ul  className="collapse show"  id="sidebar-navs">
                            <div className="sub-menu">
                              
                              <li >
                                <a href="sidebar-open.html">Sidebar Open</a>
                              </li>
                              
                              <li >
                                <a href="sidebar-minimized.html">Sidebar Minimized</a>
                              </li>
                              
                              <li >
                                <a href="sidebar-offcanvas.html">Sidebar Offcanvas</a>
                              </li>
                              
                              <li >
                                <a href="sidebar-with-footer.html">Sidebar With Footer</a>
                              </li>
                              
                              <li  className="active" >
                                <a href="sidebar-without-footer.html">Sidebar Without Footer</a>
                              </li>
                              
                              <li >
                                <a href="right-sidebar.html">Right Sidebar</a>
                              </li>
                              
                            </div>
                          </ul>
                        </li>
                        

                        
                        
                        
                        <li >
                          <a className="sidenav-item-link" href="rtl.html">
                            <span className="nav-text">RTL Direction</span>
                            
                          </a>
                        </li>
                        
                        

                        
                      </div>
                    </ul>
                  </li>
                  

                  
                </ul>

              </div>
            </div>
          </aside>

       

        
        

        
      );
    }
    
  
  }
  Aside.propTypes = {
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
  export default connect(mapStateToProps, mapDispatchToProps)(Aside);
