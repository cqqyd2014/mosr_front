import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import { IconContext } from "react-icons";
import PropertiesTable from './properties_table';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { MdPeople, MdTimeline } from "react-icons/md";
import DefinitionNode from './definition_node';
import DefinitionEdge from './definition_edge';




class DefinitionModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edge_show: false,
      item_list: [
        { 'name': '节点1', 'type': 'node', 'select_labels_types': [], 'properties': [], 'bg': 'success', 'text': 'white','edgeRadioValue':'单一节点','ref_node':'' }
      ],
      node_show: false,
      click_item: 0,

    };

  }



  componentDidMount = () => {
    this.props.onRef(this);

  }
  handleEdgeClose = () => {
    this.setState({ 'edge_show': false });
  }


  handleNodeClose = () => {
    this.setState({ 'node_show': false });
  }
  onEdgeClick = (index, event) => {
    //let items = (this.state.item_list);
    //let item = items[index];
    this.setState({ 'edge_show': true });
    this.setState({ 'click_item': index });

  }
  onNodeClick = (index, event) => {
    //console.log(this.props.properties_data)
    //console.log(index);
    //console.log(this.state.label_items);
    //let items = (this.state.item_list);
    //let item = items[index];
    this.setState({ 'node_show': true });
    this.setState({ 'click_item': index });
    //console.log(item)
    //let neo4jgraph_cypher='match p=()-[r:'+item+']-() return p  limit 50'
    //this.child.refeshdata(neo4jgraph_cypher);

  }

  handelNodeDataBack = (item) => {
    let item_list = this.state.item_list;
    item_list[this.state.click_item]=item;

    this.setState({ 'item_list': item_list });

  }
  handelEdgeDataBack = (item) => {
    let item_list = this.state.item_list;
    item_list[this.state.click_item]=item;

    this.setState({ 'item_list': item_list });
  }


  addItem = () => {
    let item_list = this.state.item_list;
    if (this.state.item_list.length % 2 === 0) {
      //当前是关系，新增节点
      let new_node = { 'name': '节点' + parseInt((this.state.item_list.length + 2) / 2), 'type': 'node', 'select_labels_types': [], 'properties': [], 'bg': 'success', 'text': 'white' ,'edgeRadioValue':'单一节点','ref_node':''};
      item_list.push(new_node);
    }
    else {
      //当前是节点，新增关系
      let new_type = { 'name': '关系' + parseInt((this.state.item_list.length + 2) / 2), 'type': 'dege', 'select_labels_types': [], 'properties': [], 'bg': 'danger', 'text': 'white', '_min': 1, '_max': 1, 'edgeRadioValue': '单层关系' };
      item_list.push(new_type);

    }
    

    this.setState({ 'item_list': item_list });

  }
  handelNew = (event) => {
    this.addItem();
    this.addItem();

  }


  getCypherSQL = () => {
    //构建path  match p=()-[r]-() return p
    let _where_array = [];
    let cypher_string = '';
    for (let i = 0; i < this.state.item_list.length; i++) {
      let item = this.state.item_list[i];
      if (item.type === 'node') {
        cypher_string = cypher_string + '(' + item.name;
        //处理标签
        //console.log(item.select_labels);
        if (item.edgeRadioValue === '单一节点') {
          for (let i = 0; i < item.select_labels_types.length > 0; i++) {
            cypher_string = cypher_string + ":" + item.select_labels_types[i];
          }
          //{ name: 'Tom Hanks', born: 1956 }所有的等于条件在这里，其他条件在where里面
          let temp_propertes = ""
          for (let i = 0; i < item.properties.length > 0; i++) {
            switch (item.properties[i].operation) {
              case '等于':
                temp_propertes = temp_propertes + item.properties[i].name + (item.properties[i].type=='文本属性'?":\'":":") + item.properties[i].value + (item.properties[i].type=='文本属性'?"\'":"");
                break;
              case '大于':
                _where_array.push(item.name + "." + item.properties[i].name + (item.properties[i].type=='文本属性'?">\'":">") + item.properties[i].value + (item.properties[i].type=='文本属性'?"\'":""))
                break;
              case '小于':
                _where_array.push(item.name + "." + item.properties[i].name + (item.properties[i].type=='文本属性'?"<\'":"<") + item.properties[i].value + (item.properties[i].type=='文本属性'?"\'":""));
                break;
              case '包含':
                _where_array.push(item.name + "." + item.properties[i].name + " contains \'" + item.properties[i].value + "\'")
                break;
              case '不等于':
                _where_array.push(item.name + "." + item.properties[i].name + (item.properties[i].type=='文本属性'?" != \'":" != ") + item.properties[i].value + (item.properties[i].type=='文本属性'?"\'":""))
                break;
              default:
  
            }
  
  
          }
  
          cypher_string = cypher_string + "{" + temp_propertes + "})";

        }
        else{
          cypher_string = cypher_string + ")";
          _where_array.push(item.name +'='+item.ref_node)

        }

        

      }
      else {
        cypher_string = cypher_string + '-[' + item.name;
        //console.log(item.edgeRadioValue);
        if (item.edgeRadioValue === '单层关系') {

          for (let j = 0; j < item.select_labels_types.length; j++) {

            if (j === 0) {
              cypher_string = cypher_string + ":" + item.select_labels_types[0];
            }
            else {
              cypher_string = cypher_string + "|" + item.select_labels_types[j];
            }
          }
          let temp_propertes = ""
          for (let i = 0; i < item.properties.length > 0; i++) {
            switch (item.properties[i].operation) {
              case '等于':
                temp_propertes = temp_propertes + item.properties[i].name + (item.properties[i].type=='文本属性'?":\'":":") + item.properties[i].value + (item.properties[i].type=='文本属性'?"\'":"");
                break;
              case '大于':
                _where_array.push(item.name + "." + item.properties[i].name + (item.properties[i].type=='文本属性'?">\'":">") + item.properties[i].value + (item.properties[i].type=='文本属性'?"\'":""))
                break;
              case '小于':
                _where_array.push(item.name + "." + item.properties[i].name + (item.properties[i].type=='文本属性'?"<\'":"<") + item.properties[i].value + (item.properties[i].type=='文本属性'?"\'":""));
                break;
              case '包含':
                _where_array.push(item.name + "." + item.properties[i].name + " contains \'" + item.properties[i].value + "\'")
                break;
              case '不等于':
                _where_array.push(item.name + "." + item.properties[i].name + (item.properties[i].type=='文本属性'?" != \'":" != ") + item.properties[i].value + (item.properties[i].type=='文本属性'?"\'":""))
                break;
              default:

            }


          }
          cypher_string = cypher_string + "{" + temp_propertes + "}]-";
        }
        else {
          //*3..5
          cypher_string = cypher_string + "*" + item._min + ".." + item._max;
          cypher_string = cypher_string + "]-";
        }
        


      }
    }
    //处理所有where
    let _where = ''
    //console.log(_where_array);
    if (_where_array.length > 0) {
      _where = ' where ' + _where_array.join(" and ");
    }
    cypher_string = 'match p=' + cypher_string + _where + ' return p ';
    console.log(cypher_string);
    this.setState({ 'cyphter_sql': cypher_string });
    return cypher_string;
  }


  render() {





    return (
      <div>
        <div>{this.props.title}</div>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          <IconContext.Provider value={{ color: "gray", size: "4em" }}>
            {

              this.state.item_list.map((row, index) => {

                return (<Card key={index} style={{ width: '18rem' }} border={row.bg} >

                  <Card.Body >
                    <Card.Title >{row.name}{row.type === 'node' ? <MdPeople /> : <MdTimeline />}</Card.Title >
                    <div>
                      {row.type === 'node' ?
                        (



                          <div>

                            <div>类型：{this.state.item_list[index].edgeRadioValue}</div>
                            {this.state.item_list[index].edgeRadioValue === '单一节点' ?
                              <div>
                                <div>标签：</div>

                                <ListGroup style={{ padding: '0px', }}>{this.state.item_list[index].select_labels_types.map((row2, index2) => { return (<ListGroup.Item key={index2} style={{ padding: '0px', }}>{row2}</ListGroup.Item>) })}</ListGroup>

                                <PropertiesTable item={{ ...this.state.item_list[index] }} />
                              </div>
                              : (<div>关联节点: <IconContext.Provider value={{ color: "blue", size: "2em" }}><MdPeople /></IconContext.Provider>{this.state.item_list[index].ref_node}</div>)}




                          </div>



                        )
                        : (<div>
                          <div>关系类型：{this.state.item_list[index].edgeRadioValue}</div>
                          {this.state.item_list[index].edgeRadioValue === '单层关系' ?
                            <div>
                              <div>标签：</div>

                              <ListGroup style={{ padding: '0px', }}>{this.state.item_list[index].select_labels_types.map((row2, index2) => { return (<ListGroup.Item key={index2} style={{ padding: '0px', }}>{row2}</ListGroup.Item>) })}</ListGroup>
                              <PropertiesTable item={{ ...this.state.item_list[index] }} />
                            </div>
                            : '最小层次' + this.state.item_list[index]._min + '最大层次' + this.state.item_list[index]._max}




                        </div>
                        )
                      }

                    </div>

                    {row.type === 'node' ? <Button variant="secondary" onClick={this.onNodeClick.bind(this, index)}>定义节点</Button>
                      : <Button variant="secondary" onClick={this.onEdgeClick.bind(this, index)}>定义关系</Button>}

                  </Card.Body>
                </Card>


                )
              })
            }
          </IconContext.Provider>
        </div>
        <div style={{ display: 'flex' }}>
          <ButtonGroup  >

            <Button variant="success" onClick={this.handelNew}>新增节点或者关系</Button>
            <Button variant="success" onClick={this.handelDelete}>删除最后一个节点或者关系</Button>
          </ButtonGroup></div>
        <DefinitionNode handelNodeDataBack={this.handelNodeDataBack} handleNodeClose={this.handleNodeClose} properties_data={this.props.properties_data} node_lables_data={this.props.node_lables_data} node_show={this.state.node_show} item_list={this.state.item_list} item={{ ...this.state.item_list[this.state.click_item] }} />
        <DefinitionEdge handelEdgeDataBack={this.handelEdgeDataBack} handleEdgeClose={this.handleEdgeClose} properties_data={this.props.properties_data} edge_types_data={this.props.edge_types_data} edge_show={this.state.edge_show} item={{ ...this.state.item_list[this.state.click_item] }} />

      </div>


    );
  }


}
DefinitionModel.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(DefinitionModel);
