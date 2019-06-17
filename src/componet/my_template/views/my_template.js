import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import back_server from '../../../func/back_server';
import axios from 'axios';

import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import Table from 'react-bootstrap/Table'

import * as XLSX from 'xlsx';


import { Cytoscapejs } from '../../cytoscapejs';
import * as HeadActions from '../../head/redux/actions'
import {exportExcel} from '../../../func/common';

class MyTempalte extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      my_templates:[],
      import_show:false,
      xls_datas:[],

      

    };

  }


  componentDidMount = () => {
    //console.log("did mount");
    
    

    axios.get(back_server.restful_api_base_url() + 'my_templates/?qt_type=edge')
      .then((response) => {
        //let data=database.baseparameter(response);
        //console.log(response.data);
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
  //cypher_sql = cypher_sql.substr(1, cypher_sql.length-2); 
  
  this.child.refeshdata(cypher_sql);
}

handelDeleteClick=(index,event)=>{
  let my_templates=this.state.my_templates
  let item=my_templates[index];
  fetch(back_server.restful_api_base_url() + 'my_templates/'+item.qt_uuid, {
    method: 'DELETE',
    
  }).then(response => {
    
  });




  
  my_templates.splice(index,1)
  
  this.setState({'my_templates':my_templates});
}
handelExportClick=(index,event)=>{
  let my_templates=this.state.my_templates
  let item=my_templates[index];
  let data=[[item.qt_uuid,item.qt_datetime,item.qt_object,item.qt_cypher,item.qt_title,item.qt_desc]];
  exportExcel(data,'导出模板.XLSX');

}
handelImportClick=()=>{
  this.setState({'import_show':true});

}
handleImportClose=()=>{

  this.setState({'import_show':false});
}
onSubmit = () => {
  const data = new FormData();
  data.append('file', this.fileInput.current.files[0]);  //相当于 input:file 中的name属性
  data.append('column_items', JSON.stringify(this.state.column_items));
  data.append('edge_type', this.state.edge_type);
  fetch(back_server.restful_api_base_url() + 'edges_upload/', {
    method: 'POST',
    body: data
  }).then(response => {
    console.log(response)
    this.setState({ 'check_message': '数据导入成功' });
    this.setState({ 'check_type': 'success' });
  })
}
onImportExcel = file => {
  // 获取上传的文件对象
  const { files } = file.target;
  // 通过FileReader对象读取文件
  const fileReader = new FileReader();
  fileReader.onload = event => {
    try {
      const { result } = event.target;
      // 以二进制流方式读取得到整份excel表格对象
      const workbook = XLSX.read(result, { type: 'binary' });
      let data = []; // 存储获取到的数据
      // 遍历每张工作表进行读取（这里默认只读取第一张表）
      
      for (const sheet in workbook.Sheets) {
        if (workbook.Sheets.hasOwnProperty(sheet)) {
          // 利用 sheet_to_json 方法将 excel 转成 json 数据
          //let sheet_data=workbook.Sheets[sheet];

          data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet], { range: 'A1:F1' }));
          // break; // 如果只取第一张表，就取消注释这行
          console.log(data);
        }
      }
     
        
        this.setState({ 'xls_datas': data });

      

      //console.log(length(data));
    } catch (e) {
      // 这里可以抛出文件类型错误不正确的相关提示
      console.log('文件类型不正确');
      return;
    }
  };
  // 以二进制方式打开文件
  fileReader.readAsBinaryString(files[0]);
}

  render() {


    return (

      <div className="content-wrapper" style={{display:'flex',flexDirection:'column',alignItems:'stretch',flex:'1 1 auto'}}>
      <div className="content" style={{display:'flex',flexDirection:'column',alignItems:'stretch',flex:'1 1 auto'}}>
        <div className="row" style={{display:'flex',flexDirection:'column',alignItems:'stretch',flex:'1 1 auto'}}>
          <div className="col-lg-12" style={{display:'flex',flexDirection:'column',alignItems:'stretch',flex:'1 1 auto'}}>

            {this.props.full === true ? '' : (<div className="card card-default" style={{flex:'1 1 auto'}}>
              <div className="card-header  justify-content-between">
                <h2>我的查询模板</h2>
              </div>
              <div className="card-body">
                <blockquote className="blockquote">
                  <p className="mb-0">保存的查询模板</p>
                </blockquote>
                <Table responsive>
              <thead>
                <tr>
                  <th>保存时间</th>
                  <th>查询名称</th>
                  <th>查询描述</th>
                  <th>操作</th>

                </tr>
              </thead>
              <tbody>
                {
                  this.state.my_templates.map((row, index) => {
                    return (<tr key={index}>
                      <td>{row.qt_datetime}</td>
                      <td>{row.qt_title}</td>
                      <td>{row.qt_desc}</td>
                      <td><Button variant="secondary" onClick={this.handelQueryClick.bind(this, index)}>运行查询</Button>
                      <Button variant="secondary" onClick={this.handelDeleteClick.bind(this, index)}>删除</Button>
                      <Button variant="secondary" onClick={this.handelExportClick.bind(this, index)}>导出</Button></td>
                    </tr>
                    )
                  })
                }
              </tbody>
            </Table>
            <Button variant="primary" onClick={this.handelImportClick}>导入模板</Button>
            <Modal show={this.state.import_show} onHide={this.handleImportClose}>
                <Modal.Header closeButton>
                  <Modal.Title>导入模板</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form.Group >
                    <Form.Label>选择m模板文件</Form.Label>
                    <input name='xls_file' type='file' accept='.xlsx, .xls' onChange={this.onImportExcel} ref={this.fileInput} />
                  </Form.Group>
                  
                  <Table responsive>
                      <thead>
                        <tr>
                         <td>UUID</td><td>时间</td><td>系统对象</td><td>cypher</td><td>名称</td><td>描述</td>

                        </tr>
                      </thead>
                      <tbody>
                        {
                          this.state.xls_datas.map((row, r_index) => {
                            return (<tr key={r_index}>
                              {
                                this.state.xls_heads.map((head, h_index) => {
                                  return (
                                    <td key={h_index}>{row[h_index]}</td>

                                  )
                                })
                              }

                            </tr>
                            )
                          })
                        }
                      </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>

                  <Button variant="primary" onClick={this.handleNodeClose}>
                    关闭
            </Button>
                </Modal.Footer>
              </Modal>
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
MyTempalte.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(MyTempalte);
