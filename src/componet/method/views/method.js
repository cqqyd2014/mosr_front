import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import back_server from '../../../func/back_server';
import axios from 'axios';


import Alert from 'react-bootstrap/Alert'


import * as HeadActions from '../../head/redux/actions'


class MyTempalte extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      my_templates:[],
      

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
    //console.log("did mount");
    
    

    axios.get(back_server.restful_api_base_url() + 'my_templates/')
      .then((response) => {
        //let data=database.baseparameter(response);
        console.log(response.data);
        this.setState({ 'my_templates': response.data })
        

      })
      .catch(function (error) {
        console.log(error);
      });
  }
  onLableClick=(index,event)=>{

    //console.log(index);
    //console.log(this.state.label_items);
    let items=(this.props.node_lables_data);
    let item=items[index];
    //console.log(item)
    let neo4jgraph_cypher='match (n:'+item+') return n limit 50'
    this.child.refeshdata(neo4jgraph_cypher);
    
  }
  onRef = (ref) => {
    this.child = ref
}
handelQueryClick=(index,event)=>{
  let cypher_sql=this.state.my_templates[index].qt_cypher
  cypher_sql = cypher_sql.substr(1, cypher_sql.length-2); 
  console.log(cypher_sql);
  this.child.refeshdata(cypher_sql);
}
  render() {


    return (

      <div className="content-wrapper" style={{display:'flex',flexDirection:'column',alignItems:'stretch',flex:'1 1 auto'}}>
      <div className="content" style={{display:'flex',flexDirection:'column',alignItems:'stretch',flex:'1 1 auto'}}>
        <div className="row" style={{display:'flex',flexDirection:'column',alignItems:'stretch',flex:'1 1 auto'}}>
          <div className="col-lg-12" style={{display:'flex',flexDirection:'column',alignItems:'stretch',flex:'1 1 auto'}}>

            <div className="card card-default" style={{flex:'1 1 auto'}}>
              <div className="card-header  justify-content-between">
                <h2>设计理念</h2>
              </div>
              <div className="card-body">
              <Alert variant="danger">
  <Alert.Heading>研发社群知识发现系统的背景</Alert.Heading>
  <p>
  审计工作与计算机的融合已经进入一个新的智能化时代。同时审计工作也从关注吃饭的“经费”转变到更多的关注被审计单位的业务，关注权力运行，关注重大项目投资，关注腐败等领域。而在这样的时代要求下，我们的应用存在一下问题。
  </p>
  <hr />
  <p className="mb-0">
  1、审计工作中案件线索的突破很多情况下需要关注被审计单位业务背后隐藏的利益联系，特别是社会关系中存在的复杂联系很多时候是重要线索。
  </p>
  <p className="mb-0">
  2、人人学SQL语句对审计人员提出太多的要求，审计应该更多的关注业务。对于计算机技术，应该从智能化，可视化方向发展，提高数据分析效率。特别是数据建模，应该类似LEGO积木一样的简单易学。
  </p>
  <p className="mb-0">
  3、原有SQL数据库操作已经不能满足多维度，复杂环境下的数据分析。
  </p>
</Alert>
            
<Alert variant="info">
  <Alert.Heading>社群知识发现系统的解决的问题</Alert.Heading>
  <p>
  我们从审计人员的思维方式出发，研发系统，力求实现智能、可视和快速建模。
  </p>
  <hr />
  <p className="mb-0">
  1、搭建积木式的建模，实现审计思维与计算机模型的快速转换。
  </p>
  <p className="mb-0">
  2、智能化探索未知的社群关系，突破审计人员的未知。
  </p>
  <p className="mb-0">
  3、数据结果的可视化，易用。
  </p>
</Alert>

                
                
                
              </div>
            </div>
           





          </div>
        </div>
      </div>
    </div>





    );
  }


}
MyTempalte.propTypes = {
  //onComUSCCChange:PropTypes.func.isRequired,
  //onComNameChange:PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    node_lables_data: state.SystemReducer.node_lables_data,
    full: state.neo4jGraphReducer.full
  };
}

const mapDispatchToProps = {

  onNodeMessageChange:HeadActions.headMessageChangeAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(MyTempalte);
