import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';


import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Cytoscapejs } from '../../cytoscapejs';



import * as HeadActions from '../../head/redux/actions'


class ManageEdge extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      type_items: [],
      
      

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
    
    
  }
  onLableClick=(index,event)=>{
    //console.log("click")
    //console.log(index);
    //console.log(this.state.label_items);
    let items=(this.props.edge_types_data);
    let item=items[index];
    //console.log(item)
    let neo4jgraph_cypher='match p=()-[r:'+item+']-() return p  limit 50'
    this.child.refeshdata(neo4jgraph_cypher);
    
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
              <div className="card-header  justify-content-between">
                <h2>当前系统中现有关系预览 </h2>
              </div>
              <div className="card-body">
                <blockquote className="blockquote">
                  <p className="mb-0">预览数据最多为50个关系，更多关系需要消耗大量资源。如需进一步跟踪数据，请采用“社群知识发现”功能。点击标签，查看标签数据</p>
                </blockquote>
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                {
                          typeof(this.props.edge_types_data)=='undefined'?'':this.props.edge_types_data.map((row, index) => {

                            return (<Card key={index} style={{ width: '18rem' }}>

                              <Card.Body>
                                <Card.Title>{row}</Card.Title>

                                <Button variant="primary" onClick={this.onLableClick.bind(this, index)}>查看标签元素</Button>
                              </Card.Body>
                            </Card>


                            )
                          })
                        }
                </div>
              </div>
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
ManageEdge.propTypes = {
  //onComUSCCChange:PropTypes.func.isRequired,
  //onComNameChange:PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    edge_types_data: state.SystemReducer.edge_types_data,
    full: state.CytoscapejsReducer.full
  };
}

const mapDispatchToProps = {

  onNodeMessageChange:HeadActions.headMessageChangeAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageEdge);
