import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import back_server from '../../../func/back_server';
import axios from 'axios';
import * as Actions from '../redux/actions';
import io from 'socket.io-client';
import Modal from 'react-bootstrap/Modal'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import ListGroup from 'react-bootstrap/ListGroup'


const socket = io(back_server.ws_api_base_url());



class System extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      importing:false,
      import_back_cpu_use_percent:0,
      import_back_disk_total:0,
      import_back_disk_free:0,
      import_back_disk_use_percent:0,
      import_back_mem_total:0,
      import_back_mem_free:0,
      import_back_men_use_percent:0,
      import_back_platform:''


    };

  }

  percentToColor=(percent)=>{
    if (percent<33.3){
      return 'success'
    }
    if (percent<66.7){
      return 'warning'
    }
    return 'danger'
  }
  
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
    socket.on('system_report', data => {
      this.setState({'importing':true})
      this.setState({'import_back_platform':data.platform});
      this.setState({'import_back_cpu_use_percent':data.cpu_percent});
      this.setState({'import_back_disk_total':Math.round(data.disk_total/1024/1024/1024)})
      this.setState({'import_back_mem_total':Math.round(data.mem_total/1024/1024/1024)})
      this.setState({'import_back_disk_use_percent':Math.round((data.disk_total-data.disk_free)/data.disk_total*100)})
      this.setState({'import_back_men_use_percent':Math.round((data.mem_total-data.mem_free)/data.mem_total*100)})
      
      //console.log(data.cpu_percent)
      //this.setState({ 'import_back_system': '系统平台:'+data.platform+' cpu占用百分比:' + data.cpu_percent + '% 内存总量:' + data.mem_total / 1024 / 1024 + " 可用内存:" + data.mem_free / 1024 / 1024 + ' 磁盘空间:' + data.disk_total/1024/1024 + ' 磁盘可用:' + data.disk_free/1024/1024 })
    });




  }
  getLabelsTypesProperties = () => {

    //从数据库中获取已经存在的数据，如果数据为空，自动更新
    //node_labels
    this.props.onNodeLablesUpdateStart();

    axios.get(back_server.restful_api_base_url() + 'neo4j_catlog_nodelabels/')
      .then((response) => {



        let labels = [];
        for (let index in response.data) {
          labels.push(response.data[index].label)


          


        }
        this.props.onNodeLablesUpdateEnd(labels);



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

        let types = []
        for (let index in response.data) {
          types.push(response.data[index].edge_type)
        }
        this.props.onEdgeTypesUpdateEnd(types);






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

        let properties = []
        for (let index in response.data) {
          let item_db = response.data[index]
          let item = {}
          item['u_type'] = item_db.u_type;
          item['u_label_type'] = item_db.u_label_type;
          item['u_column_name'] = item_db.u_column_name;

          item['u_column_type'] = ((Array.of('编码', '显示名称', '起点', '终点')).indexOf(item_db.u_column_type) > -1) ? '文本属性' : item_db.u_column_type
          properties.push(item)

          



        }
        this.props.onPropertiesUpdateEnd(properties);
          //console.log(properties);




      })
      .catch(function (error) {
        console.log(error);
        //this.props.onNodeMessageChange("出错"+error,"danger");
      });








  }
  handleClose = () => {

  }

  render() {
    //console.log("测试2")
    //console.log(this.props.properties_data)


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
          {this.state.importing?<div>
<div>系统平台:{this.state.import_back_platform},内存:{this.state.import_back_mem_total}G,磁盘:{this.state.import_back_disk_total}G</div>
<div>cpu占用百分比:{this.state.import_back_cpu_use_percent}%
  <ProgressBar striped variant={this.percentToColor(this.state.import_back_cpu_use_percent)} now={this.state.import_back_cpu_use_percent} />
  内存占用百分比:{this.state.import_back_men_use_percent}%
  <ProgressBar striped variant={this.percentToColor(this.state.import_back_men_use_percent)} now={this.state.import_back_men_use_percent} />
  磁盘占用百分比:{this.state.import_back_disk_use_percent}%
  <ProgressBar striped variant={this.percentToColor(this.state.import_back_disk_use_percent)} now={this.state.import_back_disk_use_percent} />
  
</div></div>:''}
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
    rebuild_message: typeof (state.SystemReducer.rebuild_message) == 'undefined' ? [] : [...state.SystemReducer.rebuild_message],
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
