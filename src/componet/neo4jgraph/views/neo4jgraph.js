import React, { Component } from 'react';
import { ReactCytoscape } from 'react-cytoscape';
import { Modal,Row, Col, Button, ButtonToolbar, FormGroup, FormControl } from "react-bootstrap";
import back_server from '../../../func/back_server';
import axios from 'axios';
import {connect} from 'react-redux';
import * as Actions from '../redux/actions';
import * as HeadActions from '../../head/redux/actions'
import './neo4jgraph.css';
import $ from 'jquery';
import { MdLaunch } from "react-icons/md";
import { IconContext } from "react-icons";
import {processDetail} from '../../../func/common';
import coseBilkent from 'cytoscape-cose-bilkent';
//ReactCytoscape.use( coseBilkent );

let neo4JGraphHandle='init';
let old_neo4jgraph_cypher='';
class Neo4JGraph extends Component {
	constructor(props) {
		super(props);
		this.state={
			neo4jdata:[],
			node_colors:[],
			message:''
			
			};
			
	
	  }
	  
	handleFullChange=(event)=>{
    //console.log(event.target.value);
		//this.props.onFullChange();
		this.props.onFullChange();
		
		


		
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



    

	render() {
		let options = {
			name: 'random',
		
			fit: true, // whether to fit to viewport
			padding: 30, // fit padding
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



</ButtonToolbar>
			{/*}
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