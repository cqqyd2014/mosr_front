import React, { Component } from 'react';
import { ReactCytoscape } from 'react-cytoscape';
import { Modal,Row, Col,Image, Button, ButtonToolbar, FormGroup, Form } from "react-bootstrap";
import back_server from '../../../func/back_server';
import axios from 'axios';
import {connect} from 'react-redux';
import * as Actions from '../redux/actions';
import * as HeadActions from '../../head/redux/actions'
import './neo4jgraph.css';
import $ from 'jquery';
import { MdLaunch,MdFileDownload,MdImage } from "react-icons/md";
import { IconContext } from "react-icons";
import {processDetail} from '../../../func/common';
import coseBilkent from 'cytoscape-cose-bilkent';
import XLSX from 'xlsx';
//ReactCytoscape.use( coseBilkent );

let neo4JGraphHandle='init';
let old_neo4jgraph_cypher='';
class Neo4JGraph extends Component {
	constructor(props) {
		super(props);
		this.state={
			neo4jdata:[],
			node_colors:[],
			message:'',
			download_show:false,

			
			};
			
	
	  }
	  
	handleFullChange=(event)=>{
    //console.log(event.target.value);
		//this.props.onFullChange();
		this.props.onFullChange();
		
		
		 

		
	}
	exportExcel=(data, fileName = '导出关系.xlsx')=>{
		const ws = XLSX.utils.aoa_to_sheet(data);
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
		/* generate XLSX file and send to client */
		XLSX.writeFile(wb,fileName)
	}
	handleUnFullChange=(event)=>{
    //console.log(event.target.value);
		//this.props.onFullChange();
		this.props.onUnFullChange();
		
		
	}
	/*
	getEm=()=>{
		return {
		nodes: [
			{data: {id: '172', name: 'Tom Cruise', label: '职员',labels:['em']}},
			{data: {id: '183', title: 'Top Gun', label: 'Movie'}}
		],
		edges: [{data: {source: '172', target: '183', relationship: 'Acted_In'}}]
	}
	}
*/
	getStyle=()=>{
		return  [
			{ selector: 'node[label = "Person"]', 
				css: {'background-color': '#6FB1FC', 'content': 'data(name)'}
			},
			{ selector: 'node[label = "行政事业单位-Corp"]', 
				css: {'background-color': '#F5A45D', 'content': 'data(name)'}
			},
			{ selector: 'edge', 
				css: { 'curve-style': 'bezier','target-arrow-shape': 'triangle', content: 'data(label)'}
			}        
		]

	}
	handleAdd=()=>{
		
	}

	refeshdata=(neo4jgraph_cypher)=>{
		console.log("refesh")
		processDetail("systest",neo4jgraph_cypher)
		this.props.onNodeMessageChange("开始获取数据","warning");

		axios.get(back_server.restful_api_base_url()+'neo4jdata/?neo4jgraph_cypher='+neo4jgraph_cypher)
      .then((response)=> {
				this.props.onNodeMessageChange("成功获取数据","success");
        //let data=database.baseparameter(response);
				//console.log(response.data.elements)
			
				let edges={"edges":response.data.elements.edges};
				let nodes={"nodes":response.data.elements.nodes};

				//console.log(this.getEm());
				
				this.setState({'neo4jdata':response.data.elements});
				//类node_class1
				let node_colors=[];

				for (var item in response.data.elements.colors){

					let _css={'background-color': '#'+response.data.elements.colors[item], content: 'data(name)'};
					let node_color={selector:'node[label="'+item+'"]',css:_css};
					node_colors.push(node_color);
				
				}

			
				
				//console.log(node_colors);
				//加入边

					let _css={'target-arrow-color': 'data(line-color)','line-style':'solid', 'width': 1,'curve-style': 'bezier','target-arrow-shape': 'triangle','line-color':'data(line-color)', content: 'data(label)'}
					let node_color={selector:'edge',css:_css}
					node_colors.push(node_color)
					console.log(node_colors);
					
					this.setState({'node_colors':node_colors});
    
      })
      .catch(function (error) {
				console.log(error);
				//this.props.onNodeMessageChange("出错"+error,"danger");
      });

	}

	handleDowloadClose=()=>{
		this.setState({'download_show':false});
	}

	handelImageClick=()=>{
		this.setState({'download_show':true});
		var png64 = this.cy.png();
		this.setState({'download_image':png64})

	}

    componentDidMount=()=>{
			//console.log($('#cy').css('background-color','red'));
		//console.log($('#cy').parent().css('background-color','green'));
		$('#cy').parent().css('flex','1 1 auto');
		//console.log($('#cy').parent().parent().css('background-color','black'));
		$('#cy').parent().parent().css('display','flex');
			this.props.onRef(this);

			
			
      {/*

		axios.get(back_server.restful_api_base_url()+'NodeColors/')
		.then((response)=> {

		  //let data=database.baseparameter(response);
		  //console.log(response.data)
		  //console.log(this.getElements())
		  
		
		 { selector: 'node[label = "Person"]', 
                  css: {'background-color': '#6FB1FC', 'content': 'data(name)'}
                },
		
			let node_colors=[];

			response.data.map((_color,index)=>{
				
				let _css={'background-color': '#'+_color.n_color, content: 'data(label)'}
				let node_color={selector:'node[labels="'+_color.n_lable+'"]',css:_css}
				node_colors.push(node_color)
						});
			
			
			//console.log(node_colors);
			//加入边

				let _css={ 'curve-style': 'bezier','target-arrow-shape': 'triangle', content: 'data(label)'}
				let node_color={selector:'edge',css:_css}
				node_colors.push(node_color)
				console.log(node_colors);
		  	this.setState({'node_colors':node_colors});
	  
		})
		.catch(function (error) {
		  console.log(error);
		});
	*/}
	  }

		handleDownloadChange=()=>{
			let edgs=this.state.neo4jdata.edges;
			let nodes=this.state.neo4jdata.nodes;

			let datas=[];
			datas.push(['关系起点','关系类型','关系终点']);
			for(let edge of edgs){
				let data=edge.data;
				let source=data.source;
				let source_name='';
				let target=data.target;
				let target_name='';
				let type=data.label;
				for (let node of nodes){
					if (node.data.id==source){
						source_name=node.data.name;
					}
					if (node.data.id==target){
						target_name=node.data.name;
					}
				}
				let row=[source_name,type,target_name];
				datas.push(row);
			}
			this.exportExcel(datas);
		}

    

	render() {
		let options = {
			name: 'random',
		
			fit: true, // whether to fit to viewport
			padding: 10, // fit padding
			boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
			animate: true, // whether to transition the node positions
			animationDuration: 500, // duration of animation in ms if enabled
			animationEasing: undefined, // easing of animation if enabled
			animateFilter: function ( node, i ){ return true; }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
			ready: undefined, // callback on layoutready
			stop: undefined, // callback on layoutstop
			transform: function (node, position ){ return position; } // transform a given node position. Useful for changing flow direction in discrete layouts 
		};

		return (
			<div style={{display:'flex',flexDirection:'column'}}>
				
				
				<IconContext.Provider  value={{ color: "#6699CC", size: "2em" }}>
			
				<ButtonToolbar style={{display:'flex',flexDirection:'row-reverse'}} >

				
					<MdLaunch onClick={this.handleFullChange}/>
					<MdLaunch onClick={this.handleUnFullChange} style={{transform:'rotate(180deg)'}}/>
					<MdImage onClick={this.handelImageClick}/>
					<MdFileDownload onClick={this.handleDownloadChange}/>



</ButtonToolbar>
<Modal show={this.state.download_show} onHide={this.handleDowloadClose}>
                <Modal.Header closeButton>
                  <Modal.Title>图片下载</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form.Group >
                    <Form.Label>单击右键保存图片到本地</Form.Label>
                    
										<Image src={this.state.download_image} fluid />
										
										

                  </Form.Group>
                </Modal.Body>
                <Modal.Footer>

                  <Button variant="primary" onClick={this.handleDowloadClose}>
                    关闭
            </Button>
                </Modal.Footer>



              </Modal>
			{/*}

			var png64 = cy.png();

// put the png data in an img tag
document.querySelector('#png-eg').setAttribute('src', png64);


						<ReactCytoscape containerID="cy"
							elements={this.getElements}
							cyRef={(cy) => { this.cyRef(cy) }}
							style={this.cyStyle()}
							cytoscapeOptions={{ wheelSensitivity: 0.1 }}
							layout={{ name: 'cose' }} />


							//添加交互事件
//点：
cy.on("mouseover", "node", function (a) {
    $('#cy').css('cursor', 'move');
    let c = a.target;
    c.addClass("nodeHover");
    cy.collection("edge").removeClass("edgeActive");
    c.neighborhood("edge").addClass("edgeActive");//鼠标经过某节点，与此节点有关的变高亮显示
    //c.neighborhood("edge")表示：跟当前节点有关系的边
})
cy.on("mouseout", "node", function (a) {})
cy.on("click", "node", function (a) {})
cy.on("vmousedown", "node", function (a) { //监听鼠标左键按下})
cy.on("tapend", "node", function (a) { //监听鼠标左键释放})
//线：
//同理线的事件将‘node’换成‘edge’就行了
	
		<ReactCytoscape containerID="cy"
							elements={this.getElements()}
							cyRef={(cy) => { this.cyRef(cy) }}
							cytoscapeOptions={{ wheelSensitivity: 0.1 }}
							layout={{ name: 'dagre' ,animate:true}} />
	*/}

<ReactCytoscape containerID="cy" 
							elements={this.state.neo4jdata}
							cyRef={(cy) => { this.cyRef(cy,this) }}
							style={this.state.node_colors}
							cytoscapeOptions={{ wheelSensitivity: 0.1 }}
							layout={options}
							 />
							 <div>{this.state.message}</div>
							 </IconContext.Provider>
			</div>
					
		);
	}
	

	cyRef(cy,neo4j) {
		this.cy = cy;
		/*
		cy.on('tap', 'node', function (evt) {
			var node = evt.target;
			console.log('tapped ' + node.id()+node.name());
		});
		*/
		cy.on("click", "node", function (evt) {
			var node = evt.target;
			//neo4j.setMessage(node._private.data);
			let message_string=JSON.stringify(node._private.data);
			neo4j.props.onNodeMessageChange(message_string,'info');
			

		})
		cy.on("click", "edge", function (evt) {
			var node = evt.target;
			//neo4j.setMessage(node._private.data);
			let message_string=JSON.stringify(node._private.data);
			neo4j.props.onNodeMessageChange(message_string,'info');
			

		})
	}


}

const mapStateToProps = (state) => {

	/*
	if(neo4JGraphHandle!= 'init'){
		//是否更新数据
		if (old_neo4jgraph_cypher!=state.neo4jGraphReducer.neo4jgraph_cypher&&typeof(state.neo4jGraphReducer.neo4jgraph_cypher)!='undefined'){
			console.log("start get neo4j"+state.neo4jGraphReducer.neo4jgraph_cypher)
			console.log("old_neo4jgraph_cypher"+old_neo4jgraph_cypher)
			neo4JGraphHandle.refeshdata(state.neo4jGraphReducer.neo4jgraph_cypher);
			old_neo4jgraph_cypher=state.neo4jGraphReducer.neo4jgraph_cypher
			console.log("old_跟新")
		}
		
	}
	*/
		return {
			neo4jgraph_cypher: state.neo4jGraphReducer.neo4jgraph_cypher
		};
	
  }
  
  const mapDispatchToProps = {
	
	  onFullChange:Actions.fullChangeAction,
		onUnFullChange:Actions.unFullChangeAction,
		onNodeMessageChange:HeadActions.headMessageChangeAction,
	 
  };
  export default connect(mapStateToProps, mapDispatchToProps)(Neo4JGraph);