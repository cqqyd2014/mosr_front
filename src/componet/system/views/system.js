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
import * as HeadActions from '../../head/redux/actions'
import { processDetail } from '../../../func/common';

class System extends Component {
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
    this.updateLablesTypes();

  }
  updateLablesTypes = () => {
    this.props.noNodeLablesUpdateStart();

    axios.get(back_server.restful_api_base_url() + 'neo4jJson/?neo4jgraph_cypher=match (n) return distinct labels(n)')
      .then((response) => {
        //this.props.onNodeMessageChange("成功获取数据","success");

        //console.log(response.data)
        let labels = []
        for (let index in response.data) {
          let item = response.data[index]
          for (var key in item) {
            //console.log(item[key]);
            for (let index2 in item[key]) {
              let item2 = item[key][index2]
              //console.log(item2);
              if (labels.indexOf(item2) == -1) {
                //console.log(labels)
                labels.push(item2);
              }
            }
          }
          //console.log(item[0]);

        }
        //console.log(labels)
        //this.setState({ 'labels_items': labels });

        //更新edge的type
        axios.get(back_server.restful_api_base_url() + 'neo4jJson/?neo4jgraph_cypher=match ()-[r]-() return distinct type(r)')
          .then((response) => {

            //console.log(response.data)
            let type_items = []
            for (let index in response.data) {
              let item = response.data[index]
              for (var key in item) {
                //console.log(item[key]);
                type_items.push(item[key]);
              }
              //console.log(item[0]);

            }
            //console.log(labels)
            //this.setState({'types_items':type_items});
            axios.get(back_server.restful_api_base_url() + 'neo4jJson/?neo4jgraph_cypher=match (n) return distinct keys(n)')
              .then((response) => {

                //console.log(response.data)
                let properties = []
                for (let index in response.data) {
                  let item = response.data[index]
                  for (var key in item) {
                    //console.log(item[key]);
                    for (let index2 in item[key]) {
                      let item2 = item[key][index2]
                      //console.log(item2);
                      if (properties.indexOf(item2) == -1) {
                        //console.log(labels)
                        properties.push(item2);
                      }
                    }
                  }
                  //console.log(item[0]);

                }

                //this.setState({'types_items':type_items});
                this.props.onNodeLablesUpdateEnd(labels, type_items, properties);

              })
              .catch(function (error) {
                console.log(error);
                //this.props.onNodeMessageChange("出错"+error,"danger");
              });


          })
          .catch(function (error) {
            console.log(error);
            //this.props.onNodeMessageChange("出错"+error,"danger");
          });




      })
      .catch(function (error) {
        console.log(error);
        //this.props.onNodeMessageChange("出错"+error,"danger");
      });

  }

  render() {


    return (''





    );
  }


}
System.propTypes = {
  //onComUSCCChange:PropTypes.func.isRequired,
  //onComNameChange:PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    //full: state.neo4jGraphReducer.full
  };
}

const mapDispatchToProps = {
  onNodeLablesUpdateEnd: Actions.nodeLablesUpdateEndAction,
  noNodeLablesUpdateStart: Actions.nodeLablesUpdateStartAction

};
export default connect(mapStateToProps, mapDispatchToProps)(System);
