import React from 'react';
import _ from 'lodash';
import fetch from 'node-fetch';
// import update from 'react-addons-update';
import IsEmpty from './IsEmpty'
import {
	DiagramWidget,
	DiagramEngine,
	DefaultNodeFactory,
	DefaultLinkFactory,
	// DiagramModel,
	// DefaultNodeModel,
	// DefaultPortModel,
	// LinkModel
} from 'storm-react-diagrams';

// import Snap from 'snapsvg-cjs';

// import TrayWidget from './components/TrayWidget';
// import TrayItemWidget from './components/TrayItemWidget';

import { DiamondNodeModel } from './components/Nodes/Diamond/DiamondNodeModel';
import { DiamondPortModel } from './components/Nodes/Diamond/DiamondPortModel';
import { DiamondWidgetFactory } from './components/Nodes/Diamond/DiamondWidgetFactory';

import AddBar from './components/uiTools/AddBar'
// import SelectedBlock from './components/uiTools/SelectedBlock'
import PinChooser from './components/uiTools/PinChooser'


import './srd.css';

const fzzServerAddress = 'http://127.0.0.1:3005/'

var http = require('http');

// const sketchBundle = new SketchBundle()
// let url = 'http://127.0.0.1:3005/fzz'
var toType = function(obj) {
	return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}




class Flow extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      data: {},
			showConnectorChooser: false,
			addNew: false,
			notSvg: false,
			loadDataBase: false,
			addBarInput: 'Add a Name now',
			selected:false,
			mouse: { x: 0, y: 0 },
			err: {
				show: false,
				message: {}
			}
			, dataBase: {}
    };
		this.doit =this.doit.bind(this)

  }

	componentWillMount() {
		this.loadDataBase = this.loadDataBase(fzzServerAddress + 'database')
		this.engine = new DiagramEngine();
		this.engine.registerNodeFactory(new DefaultNodeFactory());
		this.engine.registerLinkFactory(new DefaultLinkFactory());
		this.engine.registerNodeFactory(new DiamondWidgetFactory());
	}

	loadDataBase(url){
		this.setState({loadDataBase:true})
		fetch(url).then(response =>
			response.json()
		).then(data => {
				// console.log("in then fetch of load DataBase",data,this.state.dataBase);
				data.err ? (
					// console.log(data.err),
					this.setState({err:{show:data.err.show, message:data.err.message}})
				) : ( (this.state.dataBase === data) ?
				(
					console.log("allready have this data"),
					this.setState({loadDataBase:false})
				):(
					this.setState({dataBase:data, err:{show:false, message:' '}})
			 )

		)}).catch((err) => {
			// console.log('the error',err, toType(err), new Error(err))
			this.setState({err:{show:true,message:err}})
		});

}
	getData(url){
		// console.log(url);
		fetch(url).then(response =>
			response.json()
		).then(data => {
				// console.log("in then fetch",data);
				data.err ? (
					console.log(data.err),
					this.setState({err:{show:data.err.show, message:data.err.message}})
				) : (
					this.setState({data:data, err:{show:false, message:' '}})
				)
		}
		).catch((err) => {

			// console.log('the error',JSON.stringify(err), toType(err), new Error(JSON.stringify(err)))
      this.setState({err:{show:true,message:JSON.stringify(err)}})
    });
	}
	// the update value function for the addBar
	updateInputValue(e){
		this.setState({addBarInput: e.target.value},() => {
			let serverFileAddress = fzzServerAddress + 'fzz/' + this.state.addBarInput + '.fzz'
			let getElement = _.find(this.state.dataBase, (el) => {return this.state.addBarInput === el.name})
			// console.log('getElement', getElement)
			if (!IsEmpty(getElement)){
				if (IsEmpty(getElement.data)){
						this.getData(serverFileAddress)
					}
					else{
					if (this.state.addBarInput === getElement.name){
						console.log('we allready have this in database')
						this.setState({data: getElement.data})
					}

				}
			}
	 		else {	// this.state.addBarInput = _.find(this.state.dataBase, (el) => {return e.target.value === el.name}) ?

				// console.log("test", this.state.addBarInput, this.state.dataBase, _.find(this.state.dataBase, (el) => {return this.state.addBarInput === el.name})),
				this.getData(serverFileAddress)
				// console.log(serverFileAddress)
			}
    });
	}

	doit(e){
		console.log('yes',e);
	}

	addNewBlock(e){
	
		console.log(this.state.data);

		var points = this.engine.getRelativeMousePoint(e);
		// var nodesCount = _.keys(this.engine.getDiagramModel().getNodes()).length;
		var allNodes = this.engine.getDiagramModel().getNodes()
		if (!IsEmpty(this.state.data)) {
			// console.log("THE DATA WE GOT",this.state.data);
			let addNode = ''
			!IsEmpty(allNodes) ? (
				addNode = _.filter(allNodes, (el)=>{return el})
			) : null
			let undefinedConnectors = _.filter(this.state.data.connected, (el) => (el.type === 'unknown' || el.type === ''))
			// console.log(undefinedConnectors)
				if (undefinedConnectors.length > 0) {
						this.setState({addNew: false, showConnectorChooser:true})
						// console.log("we have undefined connectors, need to setup connector chooser", this.state.addNew);
				}
				else {

				// console.log(this.state.data.connected);
				let node = null;
				let totalInputCount = this.state.data.connected.filter((obj) => {
	 			return obj.type === 'in';
				}).length

				let totalOutputCount = this.state.data.connected.filter((obj) => {
	 			return obj.type === 'out';
				}).length

				let counterIn= totalInputCount
				let counterOut = totalOutputCount

				node = new DiamondNodeModel(this.state.addBarInput, 'rgb(179,179,179)',this.state.data,this.state.selected,this.state.mouse);

				this.state.data.connected.map((el,key) => {
					if (el.type === 'in' ) {
						let oldCounter = counterIn
						counterIn = counterIn - 1
						node.addPort(new DiamondPortModel(true,'in-'+oldCounter, 'In','in-'+oldCounter,false));
						node.addListener({
							      linksUpdated:(entity, isAdded) => {
							        console.log(isAdded?'added':'removed', entity)
							      },
							      nodesUpdated: (entity, isAdded) => {
							        console.log(isAdded?'added':'removed', entity)
							      }
							    });
					}
					else if (el.type === 'out' ) {
						let oldCounter = counterOut
						counterOut = counterOut - 1
						node.addPort(new DiamondPortModel(false,'out-'+oldCounter, 'Out', 'out-'+oldCounter,false ));
						node.addListener({
							      linksUpdated:(entity, isAdded) => {
							        console.log(isAdded?'added':'removed', entity)
							      },
							      nodesUpdated: (entity, isAdded) => {
							        console.log(isAdded?'added':'removed', entity)
							      }
							    });
					}
					// else {
					// 	node.addPort(new DiamondPortModel('out-'+i, 'Out'));
					// }
				})

				node.x = points.x;
				node.y = points.y;
				this.engine.getDiagramModel().addNode(node);
				this.forceUpdate();
			}
		}
		else {
				this.setState({err: {show: true, message:'no data, please load file'}})
				var nodesCount = _.keys(this.engine.getDiagramModel().getNodes()).length;
				var node = null;
				node = new DiamondNodeModel(this.state.addBarInput, 'rgb(179,179,179)',this.state.data,this.state.selected,this.state.mouse);
				var points = this.engine.getRelativeMousePoint(e);
				node.addPort(new DiamondPortModel(true,'in-'+1, 'In','in-'+1,false));
				node.addPort(new DiamondPortModel(false,'out-'+1, 'Out', 'out-'+1,false ));

				node.x = points.x;
				node.y = points.y;
				this.engine.getDiagramModel().addNode(node);
				this.forceUpdate();
			}
		}

		getSelected = () =>{

			let selected = this.engine.getDiagramModel().getSelectedItems()
			let connected =this.engine.getDiagramModel().getLinks()
			if (!IsEmpty(connected)) {
				_.find(connected, el => {
					if (!IsEmpty(el.targetPort)) {
						el.targetPort.connected = true
						el.sourcePort.connected = true
						el.targetPort.locked = true
						el.sourcePort.locked = true
						console.log(el.sourcePort.direction,el.targetPort.direction, el.targetPort.connected,el.sourcePort.connected)
					}
				})

				console.log(connected);
				return {selected,connected}
			}
		}

	testSvg(e){
		let test
		test = e.target.tagName
		let isClass = e.target.className
		let classType = toType(isClass)
		let connected = this.getSelected()
		if (!IsEmpty(connected)) {
			if (!IsEmpty(connected.selected)) {
				this.setState({mouse:{ x: connected.selected[0].x, y: connected.selected[0].y }});
				connected.selected = {}
			}
			console.log(connected);
			connected = {}
		}
		if (classType === 'string') {
			console.log("targetName - switch case",test, 'classname', isClass, toType(isClass));
			if (isClass.includes('submitChangesButton')) {
				// console.log('handleFormSubmit now');
				this.setState({notSvg:false, addNew:false, selected:true})
				this.handleFormSubmit(e)
			}
			if (isClass.includes('chooser')) {
				this.setState({notSvg:false, addNew:false, selected:false})
			}
			if (isClass.includes('addBar')) {
				this.setState({notSvg:false, addNew:true, selected:false})
			}
			else {
				this.setState({notSvg:false, addNew:false, selected:true})
			}
		}
		else {

		switch (test) {
			case "svg":
				this.setState({mouse:{ x: e.pageX, y: e.pageY }});
				this.setState({notSvg:false, addNew:true , selected:false})
				console.log("case svg:",  test, '    notSvg:', this.state.notSvg, '    addNew:', this.state.addNew,' selected:', this.state.selected);
				break;

			case "INPUT":
				this.setState({notSvg:false, addNew:true,  selected:false})
				console.log("case INPUT:",  test, '    notSvg:', this.state.notSvg, '    addNew:', this.state.addNew,' selected:', this.state.selected);
				break;

			case "LABEL":
				this.setState({notSvg:false, addNew:true,  selected:false})
				console.log("case LABEL:",  test, '    notSvg:', this.state.notSvg, '    addNew:', this.state.addNew,' selected:', this.state.selected);
				break;

			default:
				if (isClass === 'storm-diagrams-canvas') {
					this.setState({notSvg:false, addNew:true, selected:false})
				}
				else {
					// this.setState({mouse:{ x: selected[0].x, y: selected[0].y }});
				this.setState({notSvg:false, addNew:false, selected:true})
			}

		}
				console.log("case default:",  test, '    notSvg:', this.state.notSvg, '    addNew:', this.state.addNew,' selected:', this.state.selected);
		}
	}

	handleFormSubmit = (e) => {
		e.preventDefault();
		// console.log(e);
		this.setState({showConnectorChooser: false})
		for (var i = 0; i < this.state.dataBase.length; i++) {
			if (this.state.dataBase[i].name === this.state.addBarInput) {
				// console.log(this.state.data);
				this.state.dataBase[i].data = this.state.data
			}
		}
		this.addNewBlock(e)
	}

	handleOptionChange = (e) => {
		// console.log(e.target.name);
		// console.log('before',this.state.data);
		for (var i = 0; i < this.state.data.connected.length; i++) {
			let that = this.state.data.connected[i]
			if	(that.connector === e.target.name){
			// this.state.data.connected[i]
			// this.setState({data: update(this.state.data.connected, {[i]:{type:{$set: e.target.value}}})})
			// console.log(that);
			that.type = e.target.value
			// console.log(that);

			this.setState({data: {...that, ...this.state.data}})
			// this.setState({data: {connected: [i].type: e.target.value})
				// this.setState({mouse:{ x: selected[0].x, y: selected[0].y }});
			}
		}
	};

	handleClick(e){
		e.preventDefault()
		// console.log(this.engine.getDiagramModel().getSelectedItems());
		this.testSvg(e)
	}
	render() {
		return (
			<div>
			{this.state.loadDataBase ? (
			<div className="content" onClick={e => this.handleClick(e)}>
			{this.state.err.show ?
			<div onClick={()=>{this.setState({err:{show:false,message:''}})}}>
			{this.state.err.message}
			</div>
			:null}
			{this.state.addNew && !this.state.notSvg ? <AddBar
				pos={this.state.mouse}
				addNewBlock={e => this.addNewBlock(e)}
				updateInputValue={e => this.updateInputValue(e)}
				dataBase={this.state.dataBase}
				/>
				: () => this.setState({addBarInput: ' '})}

				{this.state.showConnectorChooser ? <PinChooser className='PinChooser' handleOptionChange={e => this.handleOptionChange(e)} svg={this.state.data.breadSvg} connectors={this.state.data.connected}/>: null}

				<div
					className="diagram-layer"
					onDragOver={e => {
						this.handleClick(e)
					}}
					>
					<DiagramWidget diagramEngine={this.engine} />
				</div>
			</div>
		) : (<div>we load the database from backend... please wait</div>)
		}
	</div>
		);
	}
}

export default Flow;
