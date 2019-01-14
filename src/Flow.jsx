import React from 'react';
import Lodash from 'lodash';
import fetch from 'node-fetch';

import {
	DiagramWidget,
	DiagramEngine,
	DefaultNodeFactory,
	DefaultLinkFactory,
	DiagramModel,
	DefaultNodeModel,
	DefaultPortModel,
	LinkModel
} from 'storm-react-diagrams';

import TrayWidget from './components/TrayWidget';
import TrayItemWidget from './components/TrayItemWidget';

import { DiamondNodeModel } from './components/Nodes/Diamond/DiamondNodeModel';
import { DiamondPortModel } from './components/Nodes/Diamond/DiamondPortModel';
import { DiamondWidgetFactory } from './components/Nodes/Diamond/DiamondWidgetFactory';

import ProEnv from './ProEnv'

import './srd.css';

var http = require('http');

// const sketchBundle = new SketchBundle()
let url = 'http://127.0.0.1:3005/fzz'
var toType = function(obj) {
	return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}


class Flow extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      data: {},
			addNew: false,
			notSvg: false,
			addBarInput: 'Add a Name now',
			mouse: { x: 0, y: 0 }
    };
  }

	componentWillMount() {

		this.getData(url)
		this.engine = new DiagramEngine();
		this.engine.registerNodeFactory(new DefaultNodeFactory());
		this.engine.registerLinkFactory(new DefaultLinkFactory());
		this.engine.registerNodeFactory(new DiamondWidgetFactory());

	}
	_onMouseMove(e) {
		// console.log(e.pageX,e.pageY);

	}
	getData(url){
	fetch(url).then(response =>
		response.json()
	).then(data => {
		this.setState({data:JSON.parse(data)})}
		)
	}
	updateInputValue(e){
		console.log(e.target.value);
		this.setState({addBarInput: e.target.value})
	}
	addNewBlock(e){
					console.log("yes we add new block now");
					// e.preventDefault()
					var nodesCount = Lodash.keys(this.engine.getDiagramModel().getNodes()).length;
					var node = null;
					console.log(this.state.data);
					node = new DiamondNodeModel(this.state.addBarInput, 'rgb(255,0,255)',this.state.data);
					for (var i = 0; i < this.state.data.length; i++) {
						if (i % 2 === 0) {
							node.addPort(new DiamondPortModel('in-'+i, 'In'));
						}
						else {
							node.addPort(new DiamondPortModel('out-'+i, 'Out'));
						}
					}
					var points = this.engine.getRelativeMousePoint(e);
					node.x = points.x;
					node.y = points.y;
					this.engine.getDiagramModel().addNode(node);
					this.forceUpdate();
	}

	testSvg(e){
		let test
		test = e.target.tagName
		let isClass = e.target.className
		console.log(e);
		switch (test) {
			case "svg":
				this.setState({mouse:{ x: e.pageX, y: e.pageY }});
				this.setState({notSvg:false, addNew:true})
				console.log("case svg:",  test, '    notSvg:', this.state.notSvg, '    addNew:', this.state.addNew);
				break;

			case "INPUT":
				this.setState({notSvg:false, addNew:true})
				console.log("case INPUT:",  test, '    notSvg:', this.state.notSvg, '    addNew:', this.state.addNew);
				break;

			case "LABEL":
				this.setState({notSvg:true, addNew:true})
				console.log("case LABEL:",  test, '    notSvg:', this.state.notSvg, '    addNew:', this.state.addNew);
				break;

			default:
				if (isClass === 'storm-diagrams-canvas') {
					this.setState({notSvg:false, addNew:true})
				}
				else {
				this.setState({notSvg:false, addNew:false})
				}
				console.log("case default:",  test, '    notSvg:', this.state.notSvg, '    addNew:', this.state.addNew);
		}

	}
	// console.log("we have aclick");
	handleClick(e){
		e.preventDefault()
		this.testSvg(e)
	}
	render() {
		return (
			<div className="content" onClick={e => this.handleClick(e)}>
			{this.state.addNew && !this.state.notSvg ? <ProEnv
				pos={this.state.mouse}
				addNewBlock={e => this.addNewBlock(e)}
				updateInputValue={e => this.updateInputValue(e)}
				/>
				: null}
				<div
					className="diagram-layer"
					onDragOver={e => {
						e.preDefault();
					}}
				>
					<DiagramWidget diagramEngine={this.engine} />
				</div>
			</div>
		);
	}
}

export default Flow;
