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
			notSvg: false
    };
  }

	componentWillMount() {

		this.getData(url)
		this.engine = new DiagramEngine();
		this.engine.registerNodeFactory(new DefaultNodeFactory());
		this.engine.registerLinkFactory(new DefaultLinkFactory());
		this.engine.registerNodeFactory(new DiamondWidgetFactory());

	}

	getData(url){
	fetch(url).then(response =>
		response.json()
	).then(data => {
		this.setState({data:JSON.parse(data)})}
		)
	}

	addNewBlock(event){
					console.log("yes we add new block now");
					// event.preventDefault()
					var nodesCount = Lodash.keys(this.engine.getDiagramModel().getNodes()).length;
					var node = null;
					console.log(this.state.data);
					node = new DiamondNodeModel('Node ' + (nodesCount + 1), 'rgb(255,0,255)',this.state.data);
					for (var i = 0; i < this.state.data.length; i++) {
						if (i % 2 === 0) {
							node.addPort(new DiamondPortModel('in-'+i, 'In'));
						}
						else {
							node.addPort(new DiamondPortModel('out-'+i, 'Out'));
						}
					}
					var points = this.engine.getRelativeMousePoint(event);
					node.x = points.x;
					node.y = points.y;
					this.engine.getDiagramModel().addNode(node);
					this.forceUpdate();
	}

	testSvg(event){
		let test
		test = event.target.tagName
		switch (test) {
			case "svg":
				this.setState({notSvg:false, addNew:true})
				// console.log("case svg:",  test, '    notSvg:', this.state.notSvg, '    addNew:', this.state.addNew);
				break;

			case "INPUT":
				this.setState({notSvg:false, addNew:true})
				// console.log("case INPUT:",  test, '    notSvg:', this.state.notSvg, '    addNew:', this.state.addNew);
				break;

			case "LABEL":
				this.setState({notSvg:true, addNew:true})
				// console.log("case LABEL:",  test, '    notSvg:', this.state.notSvg, '    addNew:', this.state.addNew);
				break;

			default:
				this.setState({notSvg:false, addNew:false})
				// console.log("case default:",  test, '    notSvg:', this.state.notSvg, '    addNew:', this.state.addNew);
		}

	}
	handleClick(event){
		event.preventDefault()
		this.testSvg(event)
	}
	render() {
		return (
			<div className="content" onClick={event => this.handleClick(event)}>
			{this.state.addNew && !this.state.notSvg ? <ProEnv addNewBlock={event => this.addNewBlock(event)}/> : null}
				<div
					className="diagram-layer"
					onDragOver={event => {
						event.preventDefault();
					}}
				>
					<DiagramWidget diagramEngine={this.engine} />
				</div>
			</div>
		);
	}
}
// {console.log(ProEnv, this.state.addNew)}

export default Flow;
