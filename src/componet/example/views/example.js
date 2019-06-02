import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';


import Form from 'react-bootstrap/Form'

import Card from 'react-bootstrap/Card'

import imga01 from './images/a01.png'
import imga02 from './images/a02.png'
import imga03 from './images/a03.png'
import imga04 from './images/a04.png'
import imga05 from './images/a05.png'
import imga06 from './images/a06.png'
import imga07 from './images/a07.png'

import imga09 from './images/a09.png'
import imga10 from './images/a10.png'
import imga11 from './images/a11.png'


class Example extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      current_log: '当前无运行',
      flag_show_process_detail: false,
      process_detail_data: [],
      openXlsFlag: false,
      xls_datas: [],
      xls_heads: [],
      check_message: '',
      check_type: 'success',
      edge_type: '',
      column_items: [],
      items_check_ok: false,
      label_items: [],
      new_label_value: '',
      

    };

  }
  /*
  handelSubmit=(event)=>{
    event.preventDefault();
 
  }
  handleComUSCCChange=(event)=>{
    //console.log(event.target.value);
    this.props.onComUSCCChange(event.target.value);
  }
  handleComNameChange=(event)=>{
    this.props.onComNameChange(event.target.value);
  }
  handleTextChange=(event)=>{
    let o=event.target;
    let target_value={[o.name]:o.value}
    //let target_value={[o.name]:'f'}
    let old=this.state.form_value;
    let new_value=Object.assign({},old,target_value)
    console.log(new_value);
    this.setState({form_value:new_value});
  }
  getTextState=(id)=>{
    let form_value=this.state.form_value;
    let value=form_value[id];
    return value;
 
  }
  handleInvestAmountChange=(event)=>{
    let amount=event.target.value;
    this.setState({
      invest_amount:amount,
      invest_amount_big:math.rmbToBig(amount),
      invest_amount_thousand:math.moneyToThousand(amount)
    });
    
  }
  */


  componentDidMount = () => {
    //console.log(system_info.restful_api_base_url());
    /* axios_ajax.get(system_info.restful_api_base_url(),'api/baseparameter/money_type',{},this,(a,b)=>{
      console.log(a);
      console.log(b);
    }); 
    axios.get(system_info.restful_api_base_url()+'api/baseparameter/money_type')
  .then((response)=> {
    let data=database.baseparameter(response);
    //console.log(data);
    this.setState({invest_money_types:data});
 
  })
  .catch(function (error) {
    console.log(error);
  });
*/
  }

  render() {


    return (

      <div className="content-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', flex: '1 1 auto' }}>
        <div className="content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', flex: '1 1 auto' }}>
          <div className="row" style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', flex: '1 1 auto' }}>
            <div className="col-lg-12" style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', flex: '1 1 auto' }}>
              <Form onSubmit={this.onSubmit} id="node_form">

                <Card >
                  <Card.Header as="h5">分析模型设计器</Card.Header>
                  <Card.Body>
                    <Card.Title>1、设置查询数量</Card.Title>
                    <Card.Text>
                     查询的数量不易过多，当结果过多时，可以适当增加查询条件限制结果数量。
    </Card.Text>

                    <div>
                    <img src={imga01} alt="" />
                    </div>
                    <Card.Title>2、增加关系和节点</Card.Title>
                    <Card.Text>
                     查询应该以节点开始，并以节点结束，中间存在关系。节点通过标签来指定，可以制定多个标签。节点和关系是成对添加。
    </Card.Text>

                    <div>
                    <img src={imga04} alt="" />
                    
                    </div>

                    
                  
                    <Card.Title>3、查询方式</Card.Title>
                    <Card.Text>
                     关系分为两类，一类是“单层关系”，对于单层关系，可以指定关系的类型，一类是多层关系，多层关系不能指定类型，但是可以指定关系层数。
    </Card.Text>

                    <div>
                    <img src={imga02} alt="" /> </div>
                    <div><img src={imga03} alt="" />
                    </div>
                    <Card.Title>4、定义属性</Card.Title>
                    <Card.Text>
                     对于节点和关系通过定义属性进行限制。
    </Card.Text>

                    <div>
                    <img src={imga05} alt="" /> </div>
                    <div><img src={imga06} alt="" /> </div>
                    <div><img src={imga07} alt="" /> </div>
                    <Card.Title>5、查看结果</Card.Title>
                    <Card.Text>
                     通过添加按钮，增加查询。
    </Card.Text>

                    
                    
                    <div><img src={imga09} alt="" /> </div>
                    <Card.Title>6、进一步分析</Card.Title>
                    <Card.Text>
                     数据可视化页面提供了导出电子表格、导出图片、缩小、全屏，四个控制按钮，方便进一步查看数据。同时，节点可以移动，点击节点和关系，会有详情提示。
    </Card.Text>

                    
                    
                    <div><img src={imga10} alt="" /> </div>
                    <div><img src={imga11} alt="" /> </div>
                    
                    

                    
                  </Card.Body>
                </Card>



              </Form>
            </div>
          </div>
        </div>
      </div>





    );
  }


}
Example.propTypes = {
  //onComUSCCChange:PropTypes.func.isRequired,
  //onComNameChange:PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    message: state.HeadReducer.message,
    alter_type: state.HeadReducer.alter_type
  };
}

const mapDispatchToProps = {
  /* 
    onComUSCCChange:Actions.comUSCCChangeAction,
    onComNameChange:Actions.comNameChangeAction 
   */
};
export default connect(mapStateToProps, mapDispatchToProps)(Example);
