import React, { Component } from 'react';

import {Alert, Modal, Image, Button, ButtonToolbar, Form } from "react-bootstrap";
import back_server from '../../../func/back_server';
import axios from 'axios';
import { connect } from 'react-redux';
import * as Actions from '../redux/actions';
import * as HeadActions from '../../head/redux/actions'
import io from 'socket.io-client';
import $ from 'jquery';
import { MdLaunch, MdFileDownload, MdImage } from "react-icons/md";
import { IconContext } from "react-icons";
import { processDetail, exportExcel,uribase64encode} from '../../../func/common';
import coseBilkent from 'cytoscape-cose-bilkent';

import cytoscape from 'cytoscape';


cytoscape.use(coseBilkent);
//ReactCytoscape.use( coseBilkent );


const socket = io(back_server.ws_api_base_url());


class Cytoscapejs extends Component {
	constructor(props) {
		super(props);
		this.state = {
			neo4jdata: [],
			node_colors: [],
			message: '',
			download_show: false,
			info_message:'',


		};


	}

	handleFullChange = (event) => {
		//console.log(event.target.value);
		//this.props.onFullChange();
		this.props.onFullChange();





	}

	handleUnFullChange = (event) => {
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
	getStyle = () => {
		return [
			{
				selector: 'node[label = "Person"]',
				css: { 'background-color': '#6FB1FC', 'content': 'data(name)' }
			},
			{
				selector: 'node[label = "行政事业单位-Corp"]',
				css: { 'background-color': '#F5A45D', 'content': 'data(name)' }
			},
			{
				selector: 'edge',
				css: { 'curve-style': 'bezier', 'target-arrow-shape': 'triangle', content: 'data(label)' }
			}
		]

	}
	handleAdd = () => {

	}


	getAlgoUnionFindData=(sql)=>{
		console.log(sql)
		this.getAlgoData({'type':'algo.unionFind','sql':sql})
	}
	//发送算法任务
	getAlgoData=(data)=>{
		this.getDataUuid({'back_type':'neo4j_algo','par':data})
	}

	//向后台发送执行任务
	getDataUuid=(data)=>{
		console.log("发送emit"+data.back_type)
		socket.emit(data.back_type,data.par);



	}

	modifydata=(commands,after_command)=>{
		//processDetail("systest", '开始更新数据，请稍后')
		
		this.props.onNodeMessageChange("开始更新数据，请稍后", "warning");

		//



		  socket.on('neo4j_command', data => {
			//console.log(data)
			this.props.onNodeMessageChange(data, "warning");
			//processDetail("systest", data.message_info)
			//this.setState({'info_message':data})
	  
		  });
		  
		  socket.on('command_end', data => {
			console.log(data)
			if (after_command!=null){
				after_command()
			}
			
			
	  
		  });


		  socket.emit('neo4j_commands',commands);

	}

	refeshdata = (neo4jgraph_cypher) => {
		processDetail("systest", neo4jgraph_cypher)
		this.props.onNodeMessageChange("开始获取数据", "warning");
		console.log(neo4jgraph_cypher);

		let enbase_cypher=uribase64encode(neo4jgraph_cypher)


		axios.get(back_server.restful_api_base_url() + 'neo4jdata/?neo4jgraph_cypher=' + enbase_cypher)
			.then((response) => {
				this.props.onNodeMessageChange("成功获取数据", "success");
				//let data=database.baseparameter(response);
				//console.log(response.data.elements)

				///let edges = { "edges": response.data.elements.edges };
				//let nodes = { "nodes": response.data.elements.nodes };

				//console.log(response.data.elements);
				console.log(response.data.elements)
				this.setState({ 'neo4jdata': response.data.elements });
				//类node_class1
				let node_colors = [];

				for (var item in response.data.elements.colors) {

					let _css = { 'background-color': '#' + response.data.elements.colors[item], content: 'data(name)', 'text-valign': 'bottom center', 'font-size': '10px' };
					let node_color = { selector: 'node[label="' + item + '"]', css: _css };
					node_colors.push(node_color);

				}




				//加入边
				for (var item2 in response.data.elements.edge_colors) {
					//console.log(response.data.elements.edge_colors[item]);
					let _css = { 'target-arrow-color': '#' + response.data.elements.edge_colors[item2]
					, 'line-style': 'solid', 'font-size': '10px', 'width': 1, 'curve-style': 'bezier'
					, 'target-arrow-shape': 'triangle', 'line-color': '#' + response.data.elements.edge_colors[item2], content: 'data(label)' }
					let node_color = { selector: 'edge[label="' + item2 + '"]', css: _css }
					node_colors.push(node_color)


				}

				//console.log(node_colors);

				this.setState({ 'node_colors': node_colors });
				this.renderCytoscapeElement();

			})
			.catch(function (error) {
				console.log(error);
				//this.props.onNodeMessageChange("出错"+error,"danger");
			});

	}

	handleDowloadClose = () => {
		this.setState({ 'download_show': false });
	}

	handelImageClick = () => {
		this.setState({ 'download_show': true });
		var png64 = this.cy.png();
		this.setState({ 'download_image': png64 })

	}

	componentDidMount = () => {
		this.props.onRef(this);

		$('#cy').parent().css('flex', '1 1 auto');
		//$('#cy').parent().parent().css('background-color', 'gray');
		$('#cy').parent().css('display', 'flex');
		


	}

	handleDownloadChange = () => {
		let edgs = this.state.neo4jdata.edges;
		let nodes = this.state.neo4jdata.nodes;

		let datas = [];
		datas.push(['关系起点', '关系类型', '关系终点']);
		for (let edge of edgs) {
			let data = edge.data;
			let source = data.source;
			let source_name = '';
			let target = data.target;
			let target_name = '';
			let type = data.label;
			for (let node of nodes) {
				if (node.data.id === source) {
					source_name = node.data.name;
				}
				if (node.data.id === target) {
					target_name = node.data.name;
				}
			}
			let row = [source_name, type, target_name];
			datas.push(row);
		}
		exportExcel(datas, '导出数据.XLSX');
	}


	renderCytoscapeElement = () => {

		var defaultOptions = {
			// Called on `layoutready`
			ready: function () {
			},
			// Called on `layoutstop`
			stop: function () {
			},
			// Whether to include labels in node dimensions. Useful for avoiding label overlap
			nodeDimensionsIncludeLabels: false,
			// number of ticks per frame; higher is faster but more jerky
			refresh: 30,
			// Whether to fit the network view after when done
			fit: true,
			// Padding on fit
			padding: 10,
			// Whether to enable incremental mode
			randomize: true,
			// Node repulsion (non overlapping) multiplier
			nodeRepulsion: 4500,
			// Ideal (intra-graph) edge length
			idealEdgeLength: 50,
			// Divisor to compute edge forces
			edgeElasticity: 0.45,
			// Nesting factor (multiplier) to compute ideal edge length for inter-graph edges
			nestingFactor: 0.1,
			// Gravity force (constant)
			gravity: 0.25,
			// Maximum number of iterations to perform
			numIter: 2500,
			// Whether to tile disconnected nodes
			tile: true,
			// Type of layout animation. The option set is {'during', 'end', false}
			animate: 'end',
			// Amount of vertical space to put between degree zero nodes during tiling (can also be a function)
			tilingPaddingVertical: 10,
			// Amount of horizontal space to put between degree zero nodes during tiling (can also be a function)
			tilingPaddingHorizontal: 10,
			// Gravity range (constant) for compounds
			gravityRangeCompound: 1.5,
			// Gravity force (constant) for compounds
			gravityCompound: 1.0,
			// Gravity range (constant)
			gravityRange: 3.8,
			// Initial cooling factor for incremental layout
			initialEnergyOnIncremental: 0.5
		};

		this.cy = cytoscape(
			{
				container: document.getElementById('cy'),

				wheelSensitivity: 0.1,
				boxSelectionEnabled: false,
				autounselectify: true,

				style: this.state.node_colors/* cytoscape.stylesheet()
              .selector('node')
              .css({
                  'height': 40,
                  'width': 40,
                  'background-fit': 'cover',
                  'border-color': '#000',
                  'border-width': 3,
                  'border-opacity': 0.5,
                  'content': 'data(name)',
                  'text-valign': 'center',
              })
              .selector('edge')
              .css({
                  'width': 6,
                  'target-arrow-shape': 'triangle',
                  'line-color': '#ffaaaa',
                  'target-arrow-color': '#ffaaaa',
                  'curve-style': 'bezier'
              })*/
				,
				elements: {
					nodes: this.state.neo4jdata.nodes,
					edges: this.state.neo4jdata.edges,
				},

				layout: { name: 'cose-bilkent', defaultOptions }
			});
			
		let neo4j = this;
		this.cy.on("click", "node", function (evt) {
			var node = evt.target;
			//neo4j.setMessage(node._private.data);
			let message_string = JSON.stringify(node._private.data);
			neo4j.props.onNodeMessageChange(message_string, 'info');


		})
		this.cy.on("click", "edge", function (evt) {
			var node = evt.target;
			//neo4j.setMessage(node._private.data);
			let message_string = JSON.stringify(node._private.data);
			neo4j.props.onNodeMessageChange(message_string, 'info');


		})
	}

	render() {
		



		return (
			<div style={{ display: 'flex', flexDirection: 'column'}}>


				<IconContext.Provider value={{ color: "#6699CC", size: "2em" }}>

					<ButtonToolbar style={{ display: 'flex', flexDirection: 'row-reverse' }} >

						<MdLaunch onClick={this.handleFullChange} />
						<MdLaunch onClick={this.handleUnFullChange} style={{ transform: 'rotate(180deg)' }} />
						<MdImage onClick={this.handelImageClick} />
						<MdFileDownload onClick={this.handleDownloadChange} />
						{this.state.info_message.length>0?<Alert variant="info">{this.state.info_message}</Alert>:''}
						



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

					
						
					
					
				</IconContext.Provider>
				<div  id="cy" style={{display:'flex',alignItems:'stretch',height:'1000px',flex:'1 1 auto'}}/>
			</div>

		);
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
		
	};

}

const mapDispatchToProps = {
	onFullChange: Actions.fullChangeAction,
	onUnFullChange: Actions.unFullChangeAction,
	onNodeMessageChange: HeadActions.headMessageChangeAction,


};
export default connect(mapStateToProps, mapDispatchToProps)(Cytoscapejs);