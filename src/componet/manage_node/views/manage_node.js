import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import back_server from '../../../func/back_server';
import axios from 'axios';
import * as Actions from '../redux/actions';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import Alert from 'react-bootstrap/Alert'
import * as XLSX from 'xlsx';
import $ from 'jquery';
import InputGroup from 'react-bootstrap/InputGroup'
import { Cytoscapejs } from '../../cytoscapejs';

import * as HeadActions from '../../head/redux/actions'
import {processDetail} from '../../../func/common';

class ManageNode extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
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
  render() {


    return (

      <div className="content-wrapper" style={{display:'flex',flexDirection:'column',alignItems:'stretch',flex:'1 1 auto'}}>
      <div className="content" style={{display:'flex',flexDirection:'column',alignItems:'stretch',flex:'1 1 auto'}}>
        <div className="row" style={{display:'flex',flexDirection:'column',alignItems:'stretch',flex:'1 1 auto'}}>
          <div className="col-lg-12" style={{display:'flex',flexDirection:'column',alignItems:'stretch',flex:'1 1 auto'}}>

            {this.props.full == true ? '' : (<div className="card card-default" style={{flex:'1 1 auto'}}>
              <div className="card-header  justify-content-between">
                <h2>当前系统中现有数据预览 </h2>
              </div>
              <div className="card-body">
                <blockquote className="blockquote">
                  <p className="mb-0">预览数据最多为50个节点，更多节点需要消耗大量资源。如需进一步跟踪数据，请采用“社群知识发现”功能。点击标签，查看标签数据</p>
                </blockquote>
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                {
                          typeof(this.props.node_lables_data)=='undefined'?'':this.props.node_lables_data.map((row, index) => {

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
ManageNode.propTypes = {
  //onComUSCCChange:PropTypes.func.isRequired,
  //onComNameChange:PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    node_lables_data: state.SystemReducer.node_lables_data,
    full: state.CytoscapejsReducer.full
  };
}

const mapDispatchToProps = {
  //neo4jgraphChange: NeoGraphActions.neo4jCypherChangeAction,
  onNodeMessageChange:HeadActions.headMessageChangeAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageNode);
