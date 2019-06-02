import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import back_server from '../../../func/back_server';
import axios from 'axios';
import * as Actions from '../redux/actions';



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

  saveNeo4jCatalog=(nc_type,data)=>{
    var config = { headers: {  
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'}
  }
  for (let index in data) {
    axios.post( back_server.restful_api_base_url()+'neo4j_catlog/',{ nc_type : nc_type , nc_value : data[index] }, config
    )
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
  }
  

  }


  getNeo4jEdgeTypes=()=>{
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
            this.saveNeo4jCatalog('edge_types',type_items);
            this.props.onEdgeTypesUpdateEnd(type_items);
            


          })
          .catch(function (error) {
            console.log(error);
            //this.props.onNodeMessageChange("出错"+error,"danger");
          });

  }

  getNeo4jNodeLabels=()=>{
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
              if (labels.indexOf(item2) === -1) {
                //console.log(labels)
                labels.push(item2);
              }
            }
          }
          //console.log(item[0]);

        }
        //console.log(labels)
        //this.setState({ 'labels_items': labels });
        this.saveNeo4jCatalog('node_labels',labels);
        this.props.onNodeLablesUpdateEnd(labels);

        



      })
      .catch(function (error) {
        console.log(error);
        //this.props.onNodeMessageChange("出错"+error,"danger");
      });

  }

  getNeo4jProperties=()=>{

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
                      if (properties.indexOf(item2) === -1) {
                        //console.log(labels)
                        properties.push(item2);
                      }
                    }
                  }
                  //console.log(item[0]);

                }
                this.saveNeo4jCatalog('properties',properties);
                this.props.onPropertiesUpdateEnd(properties);
                //this.setState({'types_items':type_items});
                //this.props.onNodeLablesUpdateEnd(labels, type_items, properties);

              })
              .catch(function (error) {
                console.log(error);
                //this.props.onNodeMessageChange("出错"+error,"danger");
              });

  }

  rowsToArray=(rows)=>{
    let arr=[];
    for (let index in rows) {
      arr.push(rows[index].nc_value)
    }
    return arr;
  }


  componentDidMount = () => {
    this.getLabelsTypesProperties();

  }
  getLabelsTypesProperties = () => {

    //从数据库中获取已经存在的数据，如果数据为空，自动更新
    //node_labels
    this.props.onNodeLablesUpdateStart();

    axios.get(back_server.restful_api_base_url() + 'neo4j_catlog/?nc_type=node_labels')
    .then((response) => {


      if (response.data.length===0){
        //需要从neo4j中更新
        
        this.getNeo4jNodeLabels();
      }
      else{
        let labels=this.rowsToArray(response.data);
        
          this.props.onNodeLablesUpdateEnd(labels);


      }


     
    })
    .catch(function (error) {
      console.log(error);
      //this.props.onNodeMessageChange("出错"+error,"danger");
    });

    //edge_types

    this.props.onEdgeTypesUpdateStart();

    axios.get(back_server.restful_api_base_url() + 'neo4j_catlog/?nc_type=edge_types')
    .then((response) => {

      //console.log(response.data)
      if (response.data.length===0){
        //需要从neo4j中更新
        this.getNeo4jEdgeTypes();
      }
      else{
          let types=this.rowsToArray(response.data);
          this.props.onEdgeTypesUpdateEnd(types);



      }


      //this.setState({'types_items':type_items});
      

    })
    .catch(function (error) {
      console.log(error);
      //this.props.onNodeMessageChange("出错"+error,"danger");
    });

    //properties

    this.props.onPropertiesUpdateStart();

    axios.get(back_server.restful_api_base_url() + 'neo4j_catlog/?nc_type=properties')
    .then((response) => {

      //console.log(response.data)
      if (response.data.length===0){
        //需要从neo4j中更新
        this.getNeo4jProperties();
      }
      else{
          let properties=this.rowsToArray(response.data);
          this.props.onPropertiesUpdateEnd(properties);



      }


    

    })
    .catch(function (error) {
      console.log(error);
      //this.props.onNodeMessageChange("出错"+error,"danger");
    });








  }

  render() {


    return (
''

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
  onNodeLablesUpdateStart: Actions.nodeLablesUpdateStartAction,
  onEdgeTypesUpdateEnd: Actions.edgeTypesUpdateEndAction,
  onEdgeTypesUpdateStart: Actions.edgeTypesUpdateStartAction,
  onPropertiesUpdateEnd: Actions.propertiesUpdateEndAction,
  onPropertiesUpdateStart: Actions.propertiesUpdateStartAction,

};
export default connect(mapStateToProps, mapDispatchToProps)(System);
