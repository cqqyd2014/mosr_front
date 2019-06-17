import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';



import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import InputGroup from 'react-bootstrap/InputGroup'




import back_server from '../../../func/back_server';
import axios from 'axios';



import { MdApps ,MdPeople} from "react-icons/md";



import Alert from 'react-bootstrap/Alert'






class ImportNode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      
      new_label_value:'',
      
      



    };

  }

  onItemsCheck = () => {
   
    //至少一个标签label_items
    if (this.props.label_items.length === 0) {
      this.setState({ 'check_message': '必须定义至少一个标签数据' });
      this.setState({ 'check_type': 'danger' });
      this.setState({ 'items_check_ok': false });
      this.props.onCheck(false);
      return;
    }
    //有且只能有一个编码列
    let items = this.props.column_items;
    let key_flag = 0;
    for (let key in items) {
      let item = items[key];
      if (item[2] === '编码') {
        key_flag++;
      }

    }
    if (key_flag !== 1) {
      this.setState({ 'check_message': '必须定义一个编码列' });
      this.setState({ 'check_type': 'danger' });
      this.setState({ 'items_check_ok': false });
      this.props.onCheck(false);
      return;
    }
    //有且只能有一个显示名称

    let display_flag = 0;
    for (let key in items) {
      let item = items[key];
      if (item[2] === '显示名称') {
        display_flag++;
      }

    }
    if (display_flag !== 1) {
      this.setState({ 'check_message': '必须定义一个显示名称列' });
      this.setState({ 'check_type': 'danger' });
      this.setState({ 'items_check_ok': false });
      this.props.onCheck(false);
      return;
    }
    this.setState({ 'check_message': '校验通过，可以开始导入数据' });
    this.setState({ 'check_type': 'success' });
    this.setState({ 'items_check_ok': true });
    this.props.onCheck(true);
    

  }

  componentDidMount = () => {
   



  }



  onDeleteLable = (index, event) => {
    let label_items = this.props.label_items;
    label_items.splice(index, 1)
    //console.log(label_items)
    this.props.onLabelChange(label_items)

  }

  handleNewLabelChange = (event) => {
    let target = event.target

    this.setState({ 'new_label_value': target.value })
  }
  handelNewLabelAdd = (event) => {
    if (this.state.new_label_value === '') {
      return;
    }
    let label_items = this.props.label_items;
    label_items.push(this.state.new_label_value);
    this.setState({ 'new_label_value': '' })
    this.props.onLabelChange(label_items)
    //this.setState({ 'label_items': label_items })
  }
  onItemsChange = (index, event) => {

    let target = event.target;

    let column_items = this.props.column_items;
    let item = column_items[index];
    item = [item[0],item[1], target.value];
    column_items[index] = item;
    //this.setState({ 'tabel_cols': column_items });
    this.props.onItemsChange(column_items)

  }

  render() {





    return (


      <Card bg="light" style={{ flex: '1 1 auto' }}>
        <Card.Header><MdPeople />导入节点</Card.Header>
        <Card.Body>
          <Card.Title>节点数据需要指定至少一个标签，定义唯一编码和显示名称</Card.Title>

          <Row>
            <Col>
            <Form.Label>定义标签</Form.Label>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>

                        {
                          this.props.label_items.map((row, index) => {

                            return (<Card key={index} style={{ width: '18rem' }}>

                              <Card.Body>
                                <Card.Title>{row}</Card.Title>

                                <Button variant="primary" onClick={this.onDeleteLable.bind(this, index)}>删除标签</Button>
                              </Card.Body>
                            </Card>


                            )
                          })
                        }



                      </div>

                      <InputGroup ><Form.Control type="text" placeholder="输入新标签" value={this.state.new_label_value} onChange={this.handleNewLabelChange} /> <InputGroup.Append>
                        <Button variant="outline-secondary" onClick={this.handelNewLabelAdd}>新标签</Button>
                      </InputGroup.Append></InputGroup>
            
            
            
            </Col>
            

          </Row>
          <Row>
            <Col>
            <Form.Label>定义属性</Form.Label>
                    <Table responsive>

                      <thead>
                        <tr>
                          <td>属性</td>
                          <td>定义</td>
                        </tr>
                      </thead>
                      <tbody>

                      {
                          typeof(this.props.column_items)!='undefined'?this.props.column_items.map((row, index) => {

                            return (<tr key={index}>
                              <td >{row[0]}</td>
                              <td>
                                <Form.Control as="select" value={row[2]}  onChange={this.onItemsChange.bind(this, index)}>
                                  <option>编码</option>
                                  <option>显示名称</option>
                                  {row[1]==='string'?<option>文本属性</option>:''}
                                  {row[1]==='float'?<option>浮点数属性</option>:''}
                                  {row[1]==='long'?<option>整数属性</option>:''}
                                  <option>不导入</option>

                                </Form.Control></td>
                            </tr>


                            )
                          }):''
                        }

                      </tbody>
                    </Table>

            </Col>

          </Row>


{this.state.check_message !== '' ? <Alert variant={this.state.check_type}>
{this.state.check_message}
</Alert> : ''}

<Button variant="primary" onClick={this.onItemsCheck}>校验</Button>
        </Card.Body>
      </Card>






    );
  }


}
ImportNode.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(ImportNode);
