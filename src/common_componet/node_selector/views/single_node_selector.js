import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';



import {DefinitionProperties} from '../../definition_properties';


import {LabelsTypesSelector} from '../../labels_types_selector';





class NodeSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {


        };

    }



    componentDidMount = () => {


    }


    handelLabelsTypesBack = (select_labels_types) => {
        let clickItem = this.props.item

        clickItem.select_labels_types = select_labels_types;
        this.props.handelNodeDataBack(clickItem);

    }

    handelPropertiesBack = (item_properties) => {
        let clickItem = this.props.item

        clickItem.properties = item_properties;
        this.props.handelNodeDataBack(clickItem);

    }
   




    render() {





        return (

                                            <div>
                                                    
                                        <LabelsTypesSelector handelLabelsTypesBack={this.handelLabelsTypesBack} item={{ ...this.props.item }} types_data={this.props.node_lables_data} />
                                        <DefinitionProperties u_type='node' handelPropertiesBack={this.handelPropertiesBack} item={{ ...this.props.item }} properties_data={this.props.properties_data} />
                                                   


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
export default connect(mapStateToProps, mapDispatchToProps)(NodeSelector);


