import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import Alert from 'react-bootstrap/Alert'





import * as HeadActions from '../../head/redux/actions'


import { IconContext } from "react-icons";


class About extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      type_items: [],
      last_type: 'node',//为node或者edge
      item_list: [
        { 'name':'N1','type': 'node', 'select_labels': [] }
      ],
      limit_count: 50,
      node_show: false,
      click_item: 0,
      edge_show: false,
      save_show:false,
      cyphter_sql:'',
      save_title:'',
      save_desc:''






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


  componentDidMount = () => {
   

  }

  render() {


    return (

      <div className="content-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', flex: '1 1 auto' }}>
        <div className="content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', flex: '1 1 auto' }}>
          <div className="row" style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', flex: '1 1 auto' }}>
            <div className="col-lg-12" style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', flex: '1 1 auto' }}>

              {this.props.full === true ? '' : (<div className="card card-default" style={{ flex: '1 1 auto' }}>
                <div className="card-header  justify-content-between">
                  <h2>关于我们</h2>
                </div>
                <div className="card-body">
                <Alert variant="success">
  <Alert.Heading>重庆市审计局金融处</Alert.Heading>
  <p>
  随着人工智能时代的到来，新型金融机构及其创新业务的层出不穷，互联网新金融的兴起和大数据、云计算的影响，金融审计呈现新的趋势——业务穿透审计、资金流跟踪审计、重大金融风险预警审计……对金融审计人提出了更高的要求。2018年初，根据“风险防控跟踪审计”的需要，我们思考如何实现海量数据的智能化设计——数据可视化、建模智能化。希望实现“以业务为导向，以智能化为方向，以大数据为依托”的一套全新的分析系统。历时一年，考察了各种大数据技术，最终确定了以图数据库为核心的方案，力图实现社会关系网络的智能化知识发现。
  </p>
  <hr />
  <p className="mb-0">
  感谢全处同志为本项目所作的贡献。感谢周红东、徐晓静两届金融处领导对本项目的指引。感谢局各级领导对金融处的关心和厚爱。感谢我的妻子和孩子一直以来的支持。如有任何疑问，请与重庆市审计局金融处王利联系，邮箱3133669@qq.com。
  </p>
</Alert>
                 
                  
                  
                    <IconContext.Provider value={{ color: "gray", size: "2em" }}>
                     
                    </IconContext.Provider>
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
About.propTypes = {
  //onComUSCCChange:PropTypes.func.isRequired,
  //onComNameChange:PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    node_lables_data: state.SystemReducer.node_lables_data,
    edge_types_data: state.SystemReducer.edge_types_data,
    full: state.neo4jGraphReducer.full
  };
}

const mapDispatchToProps = {

  onNodeMessageChange: HeadActions.headMessageChangeAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(About);
