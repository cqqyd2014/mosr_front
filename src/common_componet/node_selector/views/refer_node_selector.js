import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';




import Form from 'react-bootstrap/Form'














class ReferNodeSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {


        };

    }



    componentDidMount = () => {


    }

    handelRefNodeChange=(event)=>{
        let target = event.target
        let ref_node = target.value;

        let clickItem = this.props.item
       
        clickItem.ref_node = ref_node;
        this.props.handelNodeDataBack(clickItem);

    }




    render() {





        return (

                                            <div>
                                                    
                                                    <Form.Group >
    <Form.Label>选择指向的节点</Form.Label>
    <Form.Control as="select" value={this.props.item.ref_node} onChange={this.handelRefNodeChange}>
    {
                      typeof (this.props.item.name) != 'undefined'?(this.props.item_list.map((row, index) => {


                        return (row.type==='node'&&row.name!==this.props.item.name?<option key={index}>{row.name}</option>:''


                        )
                      })):''
                    }


    
    </Form.Control>
  </Form.Group>
                                                   


                                        </div>


                                     




        );
    }


}
const mapStateToProps = (state) => {
    return {
      full: state.CytoscapejsReducer.full
    };
  }
  
  const mapDispatchToProps = {
  
    //neo4jgraphChange: NeoGraphActions.neo4jCypherChangeAction
  
  
  };
export default connect(mapStateToProps, mapDispatchToProps)(ReferNodeSelector);


