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


	handleClick(event){

		this.getData(url)
		event.preventDefault()
		let test
		test = event.target.tagName
		if (test === "svg") {
			console.log(test);
			test = "bla"
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
		else {
			console.log("no svg", event);
		}
	}
	render() {
		return (
			<div className="content" >
				<div
					className="diagram-layer"
					onClick={event => this.handleClick(event)}
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

export default Flow;
