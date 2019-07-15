import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';



import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import { MdAssignment } from "react-icons/md";

class PropertiesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        properties_value:'',//选择的属性名称,显示名称，含[]
        properties_column_name:'',//属性名称，不含[]
        properties_text_value: '',
        properties_operation: '等于',
        properties_column_type:'',
        properties_count_type:'count',
            

        };

    }
    displayToNameAndType=(value)=>{

        let _value = value
        let a = _value.indexOf("[")
        let _name = _value.substring(0, a)
        let _type = _value.substring(a + 1, (_value.length - 1))

        return {'properties_column_name':_name,'properties_column_type':_type}
    }

    handlePropertiesCountTypeChange=(event)=>{
        this.setState({'properties_count_type':event.target.value})

    }

    init=()=>{
        for (let index in this.props.properties_data) {
            let item = this.props.properties_data[index]
            if (item.u_type === this.props.u_type) {
                this.setState({'properties_value':item.u_column_name + '[' + item.u_column_type + ']'})
                //this.props.onPropertiesValueChange();
                this.setState({'properties_column_type':item.u_column_type})
                //this.props.onPropertiesColumnTypeChange(item.u_column_type)
                this.setState({'properties_column_name':item.u_column_name})
                this.setState({'properties_count_type':'count'})
                
                break;
            }
        }
    }


    componentDidMount = () => {

        this.props.onRef(this)

        this.init()





    }
    handlePropertiesValueChange = (event) => {

        this.setState({'properties_value':event.target.value})

        let name_and_type=this.displayToNameAndType(event.target.value)
        this.setState({'properties_column_type':name_and_type.properties_column_type})

        this.setState({'properties_column_name':name_and_type.properties_column_name})


        //this.props.onPropertiesValueChange(event.target.value)

        

    }
    handlePropertiesOperChange = (event) => {
        this.setState({'properties_operation':event.target.value})
        //this.props.onPropertiesOperChange(event.target.value)
        
    }
    handlePropertiesTextChange = (event) => {
        this.setState({'properties_text_value':event.target.value})
        //this.props.onPropertiesTextChange(event.target.value)
        
    }
    
    getComponetValue = () => {


        let _value = this.state.properties_value
        let value=this.displayToNameAndType(_value)



        //let item_properties = this.props.item.properties

        //item_properties.push({ 'name': _name, 'type': _type, 'operation': this.state.properties_operation, 'value': this.state.properties_text_value });

        //this.props.handelPropertiesBack(item_properties);
        return { 'name': value.properties_column_name, 'type': value.properties_column_type, 'operation': this.state.properties_operation, 'value': this.state.properties_text_value ,'properties_count_type':this.state.properties_count_type}


    }


    render() {





        return (
<div>

            <Row><Col>属性名称</Col><Col> <Form.Control as="select" value={this.state.properties_value} onChange={this.handlePropertiesValueChange}>
                {typeof (this.props.properties_data) !== 'undefined' ? this.props.properties_data.map((row, index) => {


                    return (row.u_type === this.props.u_type ? <option key={index}>{row.u_column_name}[{row.u_column_type}]</option> : ''


                    )
                }) : ''
                }

            </Form.Control></Col></Row>
            <Row><Col>操作</Col><Col>
            <Form.Control as="select" value={this.state.properties_oper} onChange={this.handlePropertiesOperChange}>

                <option >等于</option>
                <option >大于</option>
                <option >小于</option>
                {this.state.properties_column_type==='文本属性'&&!this.props.sum_flag?<option >包含</option>:''}
                
                {!this.props.sum_flag?<option >不等于</option>:''}

            </Form.Control>
            </Col></Row>

{this.props.sum_flag?

    <Row><Col>汇总</Col><Col><Form.Control as="select" value={this.state.properties_count_type} onChange={this.handlePropertiesCountTypeChange}>
                {this.state.properties_column_type!=='文本属性'?<option value="sum">求和</option>:''}
                <option value="count">计数</option>
                

            </Form.Control></Col></Row>:''

}
            
            



            <Row><Col>属性值</Col>
                <Col><Form.Control type="text" value={this.state.properties_text_value} onChange={this.handlePropertiesTextChange} /></Col>
            </Row>


            </div>   



    );
    }


}
PropertiesList.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(PropertiesList);
