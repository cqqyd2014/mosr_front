import React,{Component} from 'react';
import {connect} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import {   Link } from "react-router-dom";
import {MdAttachMoney,MdAccountBalance,MdLiveHelp,MdBubbleChart, MdDashboard,MdTimeline,MdVisibility} from "react-icons/md";
import { IconContext } from "react-icons";



class Aside extends Component {
    constructor(props) {
      super(props);
      this.state={
        navSystemDataFlag:false,
          
        };
  
    }


    clearAllFlag(){
      this.setState({navSystemDataFlag:false});
    }
    
    handleNavSystemData=(event)=>{
      this.clearAllFlag();
      this.setState({navSystemDataFlag:true});
  
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
          <IconContext.Provider  value={{ color: "gray", size: "2em" }}>
            <div id="sidebar" className="sidebar sidebar-with-footer">
              {/*<!-- Aplication Brand -->*/}
              <div className="app-brand">
                
                <Link to="/">
                  <svg className="brand-icon" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" width="30" height="33"
                    viewBox="0 0 30 33">
                    <g fill="none" fillRule="evenodd">
                      <path className="logo-fill-blue" fill="#7DBCFF" d="M0 4v25l8 4V0zM22 4v25l8 4V0z" />
                      <path className="logo-fill-white" fill="#FFF" d="M11 4v25l8 4V0z" />
                    </g>
                  </svg>
                  <span className="brand-name">社群知识发现系统</span>
                  </Link>
              </div>
              {/*<!-- begin sidebar scrollbar -->*/}
              <div className="sidebar-scrollbar">

                {/*<!-- sidebar menu -->*/}
                <ul className="nav sidebar-inner" id="sidebar-menu">
                  

                  
                  <li  className="has-sub" >
                    <a className="sidenav-item-link" href="javascript:void(0)" data-toggle="collapse" data-target="#navi"
                      aria-expanded="false" aria-controls="dashboard">
                      <MdAccountBalance/>
                      <span className="nav-text">导航</span> <b className="caret"></b>
                    </a>
                    <ul  className="collapse"  id="navi"
                      data-parent="#sidebar-menu">
                      <div className="sub-menu">

                        <li >
                          <a className="sidenav-item-link" href="/" >
                            <span className="nav-text">首页</span>
                          </a>
                        </li>
                        
                        

                        
                      </div>
                    </ul>
                  </li>
                  <li  className="has-sub" >
                    <a className="sidenav-item-link" href="javascript:void(0)" data-toggle="collapse" data-target="#dashboard"
                      aria-expanded="false" aria-controls="dashboard">
                      <MdDashboard/>
                      <span className="nav-text">数据管理</span> <b className="caret"></b>
                    </a>
                    <ul  className="collapse"  id="dashboard"
                      data-parent="#sidebar-menu">
                      <div className="sub-menu">

                        
                        <li >
                          <a className="sidenav-item-link" href="/#/node_data">
                            <span className="nav-text">从数据库下载数据</span>
                          </a>
                        </li>
                        <li >
                          <a className="sidenav-item-link" href="/#/back_import">
                            <span className="nav-text">重建分析库</span>
                          </a>
                        </li>
                        <li >
                          <a className="sidenav-item-link" href="/#/manage_node">
                            <span className="nav-text">管理现有节点</span>
                          </a>
                        </li>
                        
                        <li >
                          <a className="sidenav-item-link" href="/#/manage_edge">
                            <span className="nav-text">管理现有关系</span>
                          </a>
                        </li>
                        
                        

                        
                      </div>
                    </ul>
                  </li>

                  
                        
                  

                  

                  
                  <li  className="has-sub" >
                    <a className="sidenav-item-link" href="javascript:void(0)" data-toggle="collapse" data-target="#charts"
                      aria-expanded="false" aria-controls="charts">
                      <MdTimeline/>
                      <span className="nav-text">社群关系发现</span> <b className="caret"></b>
                    </a>
                    <ul  className="collapse"  id="charts"
                      data-parent="#sidebar-menu">
                      <div className="sub-menu">
                        
                        
                        
                        <li >
                          <a className="sidenav-item-link" href="/#/analysis">
                            <span className="nav-text">关系模型设计器</span>
                            
                          </a>
                        </li>
                        <li >
                          <a className="sidenav-item-link" href="/#/my_template">
                            <span className="nav-text">我的关系模板</span>
                            
                          </a>
                        </li>
                        

                        
                      </div>
                    </ul>
                  </li>
                  
                  <li  className="has-sub" >
                    <a className="sidenav-item-link" href="javascript:void(0)" data-toggle="collapse" data-target="#groups"
                      aria-expanded="false" aria-controls="groups">
                      <MdBubbleChart/>
                      <span className="nav-text">社群聚类发现</span> <b className="caret"></b>
                    </a>
                    <ul  className="collapse"  id="groups"
                      data-parent="#sidebar-menu">
                      <div className="sub-menu">
                        
                        
                        
                        <li >
                          <a className="sidenav-item-link" href="/#/cluster_analysis">
                            <span className="nav-text">聚类模型设计器</span>
                            
                          </a>
                        </li>
                        <li >
                          <a className="sidenav-item-link" href="/#/my_cluster_template">
                            <span className="nav-text">我的聚类模板</span>
                            
                          </a>
                        </li>
                        

                        
                      </div>
                    </ul>
                  </li>
                  <li  className="has-sub" >
                    <a className="sidenav-item-link" href="javascript:void(0)" data-toggle="collapse" data-target="#tyc"
                      aria-expanded="false" aria-controls="tyc">
                      <MdVisibility/>
                      <span className="nav-text">互联网数据-天眼查</span> <b className="caret"></b>
                    </a>
                    <ul  className="collapse"  id="tyc"
                      data-parent="#sidebar-menu">
                      <div className="sub-menu">
                        
                        
                        
                        <li >
                          <a className="sidenav-item-link" href="/#/tyc_batch_company">
                            <span className="nav-text">批量查公司</span>
                            
                          </a>
                        </li>
                        <li >
                          <a className="sidenav-item-link" href="/#/my_cluster_template">
                            <span className="nav-text">数据导出</span>
                            
                          </a>
                        </li>
                        

                        
                      </div>
                    </ul>
                  </li>
                  <li  className="has-sub" >
                    <a className="sidenav-item-link" href="javascript:void(0)" data-toggle="collapse" data-target="#bank"
                      aria-expanded="false" aria-controls="bank">
                      <MdAttachMoney/>
                      <span className="nav-text">银行</span> <b className="caret"></b>
                    </a>
                    <ul  className="collapse"  id="bank"
                      data-parent="#sidebar-menu">
                      <div className="sub-menu">
                        
                        
                        
                        <li >
                          <a className="sidenav-item-link" href="/#/bank_outer_detail_import">
                            <span className="nav-text">外调查询各家银行数据导入</span>
                            
                          </a>
                        </li>
                        
                        

                        
                      </div>
                    </ul>
                  </li>
                  

                  
                  
                  

                  

                  
                  <li  className="has-sub active expand" >
                    <a className="sidenav-item-link" href="javascript:void(0)" data-toggle="collapse" data-target="#documentation"
                      aria-expanded="false" aria-controls="documentation">
                      <MdLiveHelp/>
                      <span className="nav-text">帮助主题</span> <b className="caret"></b>
                    </a>
                    <ul  className="collapse show"  id="documentation"
                      data-parent="#sidebar-menu">
                      <div className="sub-menu">
                        
                        
                        
                        <li className="section-title">
                          使用帮助
                        </li>
                        
                        

                        
                        
                        
                        <li >
                          <a className="sidenav-item-link" href="/#/method">
                            <span className="nav-text">设计理念</span>
                            
                          </a>
                        </li>
                        
                        

                        
                        
                        
                        <li >
                          <a className="sidenav-item-link" href="/#/example">
                            <span className="nav-text">案例入门</span>
                            
                          </a>
                        </li>
                        
                        

                        
                        
                        
                        
                        <li className="section-title">
                          关于我们
                        </li>
                        <li >
                          <a className="sidenav-item-link" href="/#/about">
                            <span className="nav-text">关于我们</span>
                            
                          </a>
                        </li>
                        

                        

                        
                        
                        
                        
                        

                        
                      </div>
                    </ul>
                  </li>
                  

                  
                </ul>

              </div>
            </div>
            </IconContext.Provider>
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
