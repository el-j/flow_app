import React from 'react';
import Lodash from 'lodash';
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



class Flow extends React.Component {
	componentWillMount() {
		//1) setup the diagram engine
		this.engine = new DiagramEngine();
		this.engine.registerNodeFactory(new DefaultNodeFactory());
		this.engine.registerLinkFactory(new DefaultLinkFactory());
		this.engine.registerNodeFactory(new DiamondWidgetFactory());
	}

	handleClick(event){
		event.preventDefault()
		let test
		console.log("clicked",event.target.tagName);
		test = event.target.tagName
		// test.split(-1)
		// console.log(test);
		if (test === "svg") {
			console.log(test);
			
			test = "bla"
			var nodesCount = Lodash.keys(this.engine.getDiagramModel().getNodes()).length;
			var node = null;
			node = new DiamondNodeModel('Node ' + (nodesCount + 1), 'peru');
			node.addPort(new DiamondPortModel(true, 'in-1', 'In'));
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
