import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import back_server from '../../../func/back_server';
import axios from 'axios';
import Row from 'react-bootstrap/Row'
import Modal from 'react-bootstrap/Modal'
import EdgeWeight from './edge_weight'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Alert from 'react-bootstrap/Alert'




import { Cytoscapejs } from '../../cytoscapejs';




class ClusterAnalysis extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      weight_edges: [],

      show_edge_model: false,
      node_lables:'',
      min_weight:2,
      max_set_count:500,
      min_set_count:1,










    };

  }
//CALL apoc.periodic.iterate("MATCH (p1)-[:婚姻]-(p2) where id(p1) < id(p2) RETURN p1,p2","MERGE (p1)-[r:KNOWS]-(p2) ON CREATE SET r.weight = 1 ON MATCH SET r.weight = r.weight + 1", {batchSize:5000, parallel:false,iterateList:true})


  weightType1Command=(edge_type,weight)=>{
    let coms=[]
    coms.push('MATCH (p1)-[:'+edge_type+']-(p2) where id(p1) < id(p2) RETURN p1,p2')
    coms.push('MERGE (p1)-[r:KNOWS]-(p2) ON CREATE SET r.weight = '+weight+' ON MATCH SET r.weight = r.weight + '+weight)
    return coms
  }

  callApocPeriodicIterate=(list_commands)=>{
    let command='CALL apoc.periodic.iterate('
    let coms=[]
    for (let index in list_commands){
      coms.push('\"'+list_commands[index]+'\"')
    }
    coms.push('{batchSize:5000, parallel:false,iterateList:true}')
    command+=coms.join(",")

    command+=')'
    //console.log(command)
    return command
  }

  handleRunClick=()=>{
    let weight_edges=this.state.weight_edges
    let commands=[]
    commands.push({'_name':'清理关系数据','_command':'match ()-[r:KNOWS]-() delete r'})
    for (let index in weight_edges){
      let weight_edge=weight_edges[index]
      switch(weight_edge.weight_type){
        case 1:
          let command=this.callApocPeriodicIterate(this.weightType1Command(weight_edge.edge_name,weight_edge.weight_value))
          commands.push({'_name':'处理关系'+weight_edge.edge_name,'_command':command})
          break;
       case 2:
          
          break;
        case 3:
          
          break;
       default:
          
      }

    }
    
    //console.log(commands)
    this.child.modifydata(commands,this.after_command);

  }




  after_command=()=>{
    //console.log("end")
    //数据准备好，开始分析
    let sql="CALL algo.unionFind.stream('"+this.state.node_lables+"','MATCH (p1:"+this.state.node_lables+")-[f:KNOWS]-(p2:"+this.state.node_lables+") where f.weight>="+this.state.min_weight+" RETURN id(p1) as source, id(p2) as target,f.weight as weight', {}) YIELD nodeId,setId RETURN nodeId,algo.asNode(nodeId).显示名称 AS node_name, setId order by setId "
    this.child.getAlgoUnionFindData(sql);

  }

  onRef = (ref) => {
    this.child = ref
  }
  componentDidMount = () => {


    axios.get(back_server.restful_api_base_url() + 'neo4j_catlog_nodelabels/')
      .then((response) => {

        //console.log(response.data[0].label)
        this.setState({'node_lables':response.data[0].label})
       
        



      })
      .catch(function (error) {
        console.log(error);
        //this.props.onNodeMessageChange("出错"+error,"danger");
      });
    let weight_edges = [];
    //根据现有的关系生成初始的定义
    axios.get(back_server.restful_api_base_url() + 'neo4j_catlog_edgetypes/')
      .then((response) => {

        //console.log(response.data)

        //let types = []
        for (let index in response.data) {
          let item = response.data[index].edge_type
          //weight_type:1为固定权值2为分段设定权值（数字）3为枚举权值
          let new_weight_edge = { 'edge_name': item, 'weight_type': 1, 'weight_value': 1, 'weight_section_values': [], 'weight_enum_values': [] }
          weight_edges.push(new_weight_edge)
          

        }
        this.setState({ 'weight_edges': weight_edges })












        //this.setState({'types_items':type_items});


      })
      .catch(function (error) {
        console.log(error);
        //this.props.onNodeMessageChange("出错"+error,"danger");
      });


  }



  handleDefinitionWeight = () => {

  }

  handleDeleteWeight = () => {

  }
  handleNodeLablesChange=(event)=>{
    
    this.setState({'node_lables':event.target.value})
  }

  handleMinWeightChange=(event)=>{
    this.setState({'min_weight':event.target.value})
  }

  handleMaxSetCountChange=(event)=>{
    this.setState({'max_set_count':event.target.value})

  }
  handleMinSetCountChange=(event)=>{
    this.setState({'min_set_count':event.target.value})
  }

  render() {
    



    //let item_count = this.state.item_list.length;
    return (

      <div className="content-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', flex: '1 1 auto' }}>
        <div className="content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', flex: '1 1 auto' }}>
          <div className="row" style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', flex: '1 1 auto' }}>
            <div className="col-lg-12" style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', flex: '1 1 auto' }}>

              {this.props.full === true ? '' : (<div className="card card-default" style={{ flex: '1 1 auto' }}>
                <Alert variant="info">
                  <Alert.Heading>聚类模型设计器</Alert.Heading>
                  <p>
                    聚类模型用于分析社会关系的连通性,具有连通性的个体之间必定有关系，对于分析个体的群组性有重要意义。比如密切联系的关联企业，可能为同一控制的资金系；具有强关联的群体，必定有其它更深层次的关联。根据系统中的不同关系可以设定关联性的权值，以便作归一化的分析。
  </p>

                </Alert>



                <div className="card-body">


                  <div>定义关系权值</div>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>关系名称</th>
                        <th>关系数量</th>
                        <th>权值</th>
                        <th>管理</th>


                      </tr>
                    </thead>
                    <tbody>{
                      this.state.weight_edges.map((row, index) => {


                        return (<tr key={index}><td>{row.edge_name}</td><td>{row.weight_type===1?'固定值':(row.weight_type===2?'分段设定权值(数字属性)':'枚举值')}</td><td>{row.weight_type===1?row.weight_value:(row.weight_type===2?row.weight_section_values:row.weight_enum_values)}</td><td><Button variant="secondary" onClick={this.handleDefinitionWeight.bind(this, index)}>定义</Button></td></tr>


                        )
                      })
                    }
                    </tbody>

                  </Table>


                </div>
              </div>
              
              )}
              <Row>
                <Col>
              <Form.Group>
              <Form.Label>选择节点的标签</Form.Label>
              <Form.Control as="select" value={this.state.node_lables} onChange={this.handleNodeLablesChange}>{
                      typeof(this.props.node_lables_data)!=='undefined'?this.props.node_lables_data.map((row, index) => {


                        return (<option key={index}>{row}</option>


                        )
                      })
                    :''}
    </Form.Control>
              
            </Form.Group>
            </Col>
            <Col>
            <Form.Group >
              <Form.Label>设置最小纳入统计的权重</Form.Label>
              <Form.Control type="text" value ={this.state.min_weight} onChange={this.handleMinWeightChange}/>
            </Form.Group>
           
            </Col>
            <Col>
            <Form.Group >
              <Form.Label>组的最大成员数</Form.Label>
              <Form.Control type="text" value ={this.state.max_set_count} onChange={this.handleMaxSetCountChange}/>
            </Form.Group>
           
            </Col>
            <Col>
            <Form.Group >
              <Form.Label>组的最小成员数</Form.Label>
              <Form.Control type="text" value ={this.state.min_set_count} onChange={this.handleMinSetCountChange}/>
            </Form.Group>
           
            </Col>
            </Row>
              <div>
                <Button variant="primary" onClick={this.handleRunClick}>单击查看分析结果</Button><Button variant="primary" onClick={this.handleSaveClick}>保存查询模板</Button>
              </div>
              <Cytoscapejs min_set_count={this.state.min_set_count} max_set_count={this.state.max_set_count} style={{ display: 'flex', alignItems: 'stretch', flex: '1 1 auto' }} onRef={this.onRef} />



              <Modal show={this.state.show_edge_model} onHide={this.handleSaveClose}>
                <Modal.Header closeButton>
                  <Modal.Title>保存查询模板</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form.Group >
                    <Form.Label>保存名称</Form.Label>
                    <Form.Control type="text" value={this.state.save_title} onChange={this.handelTitleChange} />
                    <Form.Label>描述</Form.Label>
                    <Form.Control as="textarea" rows="3" value={this.state.save_desc} onChange={this.handelDescChange} />




                  </Form.Group>
                </Modal.Body>
                <Modal.Footer>

                  <Button variant="primary" onClick={this.handleSaveAndClose}>
                    保存并关闭
            </Button>
                </Modal.Footer>
              </Modal>




            </div>
          </div>
        </div>
      </div>





    );
  }


}
ClusterAnalysis.propTypes = {
  //onComUSCCChange:PropTypes.func.isRequired,
  //onComNameChange:PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    node_lables_data: state.SystemReducer.node_lables_data,
    properties_data: state.SystemReducer.properties_data,
    edge_types_data: state.SystemReducer.edge_types_data,
    full: state.CytoscapejsReducer.full
  };
}

const mapDispatchToProps = {
  //neo4jgraphChange: NeoGraphActions.neo4jCypherChangeAction,
  //onNodeMessageChange: HeadActions.headMessageChangeAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(ClusterAnalysis);
