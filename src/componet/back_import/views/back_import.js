import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import back_server from '../../../func/back_server';
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

import Table from 'react-bootstrap/Table'
import io from 'socket.io-client';
import * as HeadActions from '../../head/redux/actions'



//const socket = io(back_server.ws_api_base_url());


class BackImport extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      import_data:[],
      import_data_show:false,
      xls_datas:[],
      manage_import_data:[],
      items_check_ok: false,
      import_message:'',
      import_type:''
      

    };

  }


  componentDidMount = () => {
   
    
    

    axios.get(back_server.restful_api_base_url() + 'import_data/')
      .then((response) => {
        //let data=database.baseparameter(response);
        this.setState({'import_data': response.data })
        let manage_import_data=[]
        for (let i in response.data){
          manage_import_data.push(false);
        }
        this.setState({'manage_import_data':manage_import_data});
        

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onRef = (ref) => {
    this.child = ref
}
handelReBuildDatabaseClick=()=>{

  //加入的关系和节点至少各有一个
  let node_flag=0
  let edge_flag=0
  for (let index in this.state.manage_import_data){
    
    if (this.state.manage_import_data[index]&&this.state.import_data[index].u_node_edge==='node'){
      node_flag++
    }
    if (this.state.manage_import_data[index]&&this.state.import_data[index].u_node_edge==='edge'){
      edge_flag++
    }
  }
  if (node_flag===0){
    this.setState({'import_message':'需要至少导入一个节点'})
    this.setState({'import_type':'danger'})
    return
  }
  if (edge_flag===0){
    this.setState({'import_message':'需要至少导入一个关系'})
    this.setState({'import_type':'danger'})
    return
  }
  this.setState({'import_message':'开始重建数据库'})
  this.setState({'import_type':'success'})
  const socket = io(back_server.ws_api_base_url());
  socket.emit('neo4j_rebuild',this.state.manage_import_data,this.state.import_data);

}
handelRemoveManageClick=(index,event)=>{
  let manage_import_data=this.state.manage_import_data
  
  manage_import_data[index]=false
  this.setState({'manage_import_data':manage_import_data});
}

handelAddManangeClick=(index,event)=>{
  let manage_import_data=this.state.manage_import_data
  
  manage_import_data[index]=true
  this.setState({'manage_import_data':manage_import_data});
}
handelDeleteImportClick=(index,event)=>{
  let import_data=this.state.import_data
  let item=import_data[index];
  fetch(back_server.restful_api_base_url() + 'import_data/'+item.u_uuid, {
    headers:{'content-type':'application/json',},
    method: 'PUT',
      body: JSON.stringify({'u_status':'已删除'})
    
  }).then(response => {
    
  });
  import_data.splice(index,1)
  
  this.setState({'import_data':import_data});
  let manage_import_data=this.state.manage_import_data
  manage_import_data.splice(index,1)
  this.setState({'manage_import_data':manage_import_data});


}
handelImportClick=()=>{
  this.setState({'import_show':true});

}
handleImportClose=()=>{

  this.setState({'import_show':false});
}



  render() {


    return (

      <div className="content-wrapper" style={{display:'flex',flexDirection:'column',alignItems:'stretch',flex:'1 1 auto'}}>
      <div className="content" style={{display:'flex',flexDirection:'column',alignItems:'stretch',flex:'1 1 auto'}}>
        <div className="row" style={{display:'flex',flexDirection:'column',alignItems:'stretch',flex:'1 1 auto'}}>
          <div className="col-lg-12" style={{display:'flex',flexDirection:'column',alignItems:'stretch',flex:'1 1 auto'}}>

            {this.props.full === true ? '' : (<div className="card card-default" style={{flex:'1 1 auto'}}>
              <div className="card-header  justify-content-between">
                <h2>导入数据重建分析数据库</h2>
              </div>
              <div className="card-body">
                <blockquote className="blockquote">
                  <p className="mb-0">在这里可以管理已经下载的数据，并选择数据生成分析数据库。生成数据库的过程，数据库会暂时停机</p>
                </blockquote>
                <Table responsive>
              <thead>
                <tr>
                  <th>节点或关系</th>
                  <th>节点的标签</th>
                  <th>关系的类型</th>
                  <th>数据条数</th>
                  <th>数据开始下载时间</th>
                  <th>数据完成下载时间</th>
                  <th>数据开始导入时间</th>
                  <th>数据完成导入时间</th>
                  <th>当前状态</th>
                  <th>管理</th>

                </tr>
              </thead>
              <tbody>
                {
                  this.state.import_data.map((row, index) => {
                    return (<tr key={index} >
                      <td>{row.u_node_edge==='node'?'节点':'关系'}</td>
                      <td>{row.u_label_items}</td>
                      <td>{row.u_edge_type}</td>
                      <td>{row.u_rowcount}</td>
                      <td>{row.u_start_download_datetime}</td>
                      <td>{row.u_end_download_datetime}</td>
                      <td>{row.u_start_import_datetime}</td>
                      <td>{row.u_end_import_datetime}</td>
                      <td>{row.u_status}</td>
                      <td>{this.state.manage_import_data[index]&&this.state.import_data[index].u_end_download_datetime!=='null'?<Button variant="secondary" onClick={this.handelRemoveManageClick.bind(this, index)}>移出重建列表</Button>
                      :''}
                      {!this.state.manage_import_data[index]&&this.state.import_data[index].u_end_download_datetime!=='null'?<Button variant="secondary" onClick={this.handelAddManangeClick.bind(this, index)}>加入重建列表</Button>:''}
                      
                      <Button variant="secondary" onClick={this.handelDeleteImportClick.bind(this, index)}>删除</Button>
                      </td>
                    </tr>
                    )
                  })
                }
              </tbody>
            </Table>
            <div><span>已选的数据</span><span>
            {
                  this.state.manage_import_data.map((row, index) => {
                    return (<span key={index}>{row?
                      (this.state.import_data[index].u_node_edge==='node'?'[节点：'+this.state.import_data[index].u_label_items+']':'[关系：'+this.state.import_data[index].u_edge_type)+']':''}</span>
                    )
                  })
                }
              
              </span></div>
            <Button variant="primary" onClick={this.handelReBuildDatabaseClick}>重建数据库</Button>
            

{this.state.import_message !== '' ? <Alert variant={this.state.import_type}>
{this.state.import_message}
</Alert> : ''}
            
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
BackImport.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(BackImport);
