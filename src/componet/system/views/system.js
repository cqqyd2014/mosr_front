import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import back_server from '../../../func/back_server';
import axios from 'axios';
import * as Actions from '../redux/actions';
import io from 'socket.io-client';
import Modal from 'react-bootstrap/Modal'

import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import ListGroup from 'react-bootstrap/ListGroup'


const socket = io(back_server.ws_api_base_url());



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

  saveNeo4jCatalog = (nc_type, data) => {
    var config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }
    for (let index in data) {
      axios.post(back_server.restful_api_base_url() + 'neo4j_catlog/', { nc_type: nc_type, nc_value: data[index] }, config
      )
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }


  }


  getNeo4jEdgeTypes = () => {
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
        this.saveNeo4jCatalog('edge_types', type_items);
        this.props.onEdgeTypesUpdateEnd(type_items);



      })
      .catch(function (error) {
        console.log(error);
        //this.props.onNodeMessageChange("出错"+error,"danger");
      });

  }

  getNeo4jNodeLabels = () => {
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
        this.saveNeo4jCatalog('node_labels', labels);
        this.props.onNodeLablesUpdateEnd(labels);





      })
      .catch(function (error) {
        console.log(error);
        //this.props.onNodeMessageChange("出错"+error,"danger");
      });

  }

  getNeo4jProperties = () => {

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
        this.saveNeo4jCatalog('properties', properties);
        this.props.onPropertiesUpdateEnd(properties);
        //this.setState({'types_items':type_items});
        //this.props.onNodeLablesUpdateEnd(labels, type_items, properties);

      })
      .catch(function (error) {
        console.log(error);
        //this.props.onNodeMessageChange("出错"+error,"danger");
      });

  }




  componentDidMount = () => {
    this.getLabelsTypesProperties();
    socket.on('connect', () => {
      console.log("已连接ws!")
    });
    socket.on('neo4j_rebuild_start', data => {
      console.log(data);
      this.props.onRebuildDataStartAction(data);
    });
    socket.on('neo4j_rebuild_process', data => {
      console.log(data)
      this.props.onRebuildDataProcessAction(this.props.rebuild_message, data)

    });
    socket.on('neo4j_rebuild_end', data => {
      console.log(data)
      this.props.onRebuildDataEndAction(this.props.rebuild_message, data)
      //重建系统中的labels，types和properties
      this.getLabelsTypesProperties()
      
    });
    socket.on('disconnect', function () {
      console.log("disconnect")
    });


  }
  getLabelsTypesProperties = () => {

    //从数据库中获取已经存在的数据，如果数据为空，自动更新
    //node_labels
    this.props.onNodeLablesUpdateStart();

    axios.get(back_server.restful_api_base_url() + 'neo4j_catlog_nodelabels/')
      .then((response) => {


        if (response.data.length === 0) {
          //需要从neo4j中更新

          this.getNeo4jNodeLabels();
        }
        else {
          let labels =[];
          for (let index in response.data){
            labels.push(response.data[index].label)
          }

          this.props.onNodeLablesUpdateEnd(labels);


        }



      })
      .catch(function (error) {
        console.log(error);
        //this.props.onNodeMessageChange("出错"+error,"danger");
      });

    //edge_types

    this.props.onEdgeTypesUpdateStart();

    axios.get(back_server.restful_api_base_url() + 'neo4j_catlog_edgetypes/')
      .then((response) => {

        //console.log(response.data)
        if (response.data.length === 0) {
          //需要从neo4j中更新
          this.getNeo4jEdgeTypes();
        }
        else {
          let types = []
          for (let index in response.data){
            types.push(response.data[index].edge_type)
          }
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

    axios.get(back_server.restful_api_base_url() + 'neo4j_catlog_properties/')
      .then((response) => {

        //console.log(response.data)
        if (response.data.length === 0) {
          //需要从neo4j中更新
          this.getNeo4jProperties();
        }
        else {
          let properties = []
          for (let index in response.data){
            let item_db=response.data[index]
            let item={}
            item['u_type']=item_db.u_type;
            item['u_label_type']=item_db.u_label_type;
            item['u_column_name']=item_db.u_column_name;
            
            item['u_column_type']=((Array.of('编码','显示名称','起点','终点')).indexOf(item_db.u_column_type)>-1)?'文本属性':item_db.u_column_type
            properties.push(item)
          }
          this.props.onPropertiesUpdateEnd(properties);
          //console.log(properties);



        }




      })
      .catch(function (error) {
        console.log(error);
        //this.props.onNodeMessageChange("出错"+error,"danger");
      });








  }
  handleClose = () => {

  }

  render() {


    return (<div>

      <Modal show={this.props.rebuilding} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>数据库重建中，等待系统返回</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Spinner animation="grow" variant="primary" />
            <Spinner animation="grow" variant="secondary" />
            <Spinner animation="grow" variant="success" />
            <Spinner animation="grow" variant="danger" />
            <Spinner animation="grow" variant="warning" />
            <Spinner animation="grow" variant="info" />
            <Spinner animation="grow" variant="light" />
            <Spinner animation="grow" variant="dark" />
          </div>

          <ListGroup>

            {
              this.props.rebuilding ? this.props.rebuild_message.map((row, index) => {
                return (<ListGroup.Item key={index}>{row}</ListGroup.Item>)
                //console.log(row)



              }) : ''
            }

          </ListGroup>



        </Modal.Body>
        <Modal.Footer>

          <Button variant="primary" onClick={this.handleClose}>
            重建结束之后该窗口自动关闭
    </Button>
        </Modal.Footer>
      </Modal>


    </div>

    );
  }


}
System.propTypes = {
  //onComUSCCChange:PropTypes.func.isRequired,
  //onComNameChange:PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {

  return {
    rebuilding: state.SystemReducer.rebuilding,
    rebuild_message: typeof(state.SystemReducer.rebuild_message)=='undefined'?[]:[...state.SystemReducer.rebuild_message],
  };
}

const mapDispatchToProps = {
  onNodeLablesUpdateEnd: Actions.nodeLablesUpdateEndAction,
  onNodeLablesUpdateStart: Actions.nodeLablesUpdateStartAction,
  onEdgeTypesUpdateEnd: Actions.edgeTypesUpdateEndAction,
  onEdgeTypesUpdateStart: Actions.edgeTypesUpdateStartAction,
  onPropertiesUpdateEnd: Actions.propertiesUpdateEndAction,
  onPropertiesUpdateStart: Actions.propertiesUpdateStartAction,
  onRebuildDataStartAction: Actions.rebuildDataStartAction,
  onRebuildDataEndAction: Actions.rebuildDataEndAction,
  onRebuildDataProcessAction: Actions.rebuildDataProcessAction

};
export default connect(mapStateToProps, mapDispatchToProps)(System);
