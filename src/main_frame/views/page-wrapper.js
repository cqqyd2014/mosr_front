import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import Alert from 'react-bootstrap/Alert'



import { Cytoscapejs } from '../../componet/cytoscapejs';






class PageWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {


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
  */

  /*
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

    //this.initChange();
    this.child.refeshdata("match p=((n)-[]-())  return p limit 30")
    /*
    axios.get(back_server.restful_api_base_url()+'neo4jsampledata/')
    .then((response)=> {
      //let data=database.baseparameter(response);
      //console.log(response.data.elements)
      //console.log(this.getElements())
      this.setState({'sampleneo4jdata':response.data.elements});
  
    })
    .catch(function (error) {
      console.log(error);
    });
    */

  }

  onRef = (ref) => {
    this.child = ref
}

  render() {





    return (

      <div className="content-wrapper" style={{display:'flex',flexDirection:'column',alignItems:'stretch',flex:'1 1 auto'}}>
        <div className="content" style={{display:'flex',flexDirection:'column',alignItems:'stretch',flex:'1 1 auto'}}>
          <div className="row" style={{display:'flex',flexDirection:'column',alignItems:'stretch',flex:'1 1 auto'}}>
            <div className="col-lg-12" style={{display:'flex',flexDirection:'column',alignItems:'stretch',flex:'1 1 auto'}}>

              {this.props.full === true ? '' : (<div className="card card-default" style={{flex:'1 1 auto'}}>
                
                
                <Alert variant="info">
  <Alert.Heading>新一代智能化数据分析系统</Alert.Heading>
  <p>
  该系统采用全新的大数据分析技术，突破二维数据表的单一数据模式,采用节点和关系组织数据，实现数据可视化和未知社会关系的发现。对于审计发现对象之间的隐含联系具有重要意义。
  </p>
  <hr />
  <p className="mb-0">
  重庆市审计局金融处 2019年7月
  </p>
</Alert>
                  
                  
                
              </div>
              )}
              <Cytoscapejs style={{display:'flex',alignItems:'stretch',flex:'1 1 auto'}} onRef={this.onRef}/>





            </div>
          </div>
        </div>
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
    full: state.CytoscapejsReducer.full
  };
}

const mapDispatchToProps = {

  //neo4jgraphChange: NeoGraphActions.neo4jCypherChangeAction


};
export default connect(mapStateToProps, mapDispatchToProps)(PageWrapper);
