import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import Table from 'react-bootstrap/Table'











class PropertiesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
       

    };

  }
 


  componentDidMount = () => {


  }



  render() {





    return (
<div>
        <div>属性：</div>


                                            <Table responsive>
                                              <thead>
                                                <tr>
                                                  <th>属性</th>
                                                  <th>类型</th>
                                                  <th>操作</th>
                                                  <th>值</th>



                                                </tr>
                                              </thead>
                                              <tbody>{
                                                this.props.item.properties.map((row, index) => {


                                                  return (<tr key={index}><td>{row.name}</td><td>{row.type}</td><td>{row.operation}</td><td>{row.value}</td></tr>


                                                  )
                                                })
                                              }
                                              </tbody>

                                            </Table>
                                            </div>



    );
  }


}
PropertiesTable.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(PropertiesTable);
