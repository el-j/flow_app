import React from 'react';
import { DiamondNodeModel } from './DiamondNodeModel';
import { DiamondPortWidget } from './DiamondPortWidget';
import IsEmpty from '../../../IsEmpty'
import SelectedBlock from '../../uiTools/SelectedBlock'

export interface DiamonNodeWidgetProps {
	node: DiamondNodeModel,
	size?: number,
	name: string,
	color: string,
	selected: boolean,
	connected: boolean,
	data: array,
	mouse: object,
	type: string
}

export interface DiamonNodeWidgetState {}

export class DiamonNodeWidget extends React.Component<DiamonNodeWidgetProps, DiamonNodeWidgetState> {
	constructor(props: DiamonNodeWidgetProps) {
		super(props);
		this.state = {
		};
	}

	makeConnectors(){
		let connectorSize = (this.props.size/ this.props.node.data.connected.length)
		// console.log("makeConnectors",IsEmpty(this.props.node.data.connected),this.props.node.data.connected);
		if (!IsEmpty(this.props.node.data.connected)) {
			// console.log(this.props.node.data.connected);

			let totalInputCount = this.props.node.data.connected.filter((obj) => {
 			return obj.type === 'in';
			}).length
			let inputConnectorSize = (this.props.size/ totalInputCount)

			let totalOutputCount = this.props.node.data.connected.filter((obj) => {
 			return obj.type === 'out';
			}).length
			let counterIn= totalInputCount
			let counterOut = totalOutputCount

			let outputConnectorSize = (this.props.size/ totalOutputCount)
			return(
			this.props.node.data.connected.map((el,key) => {
					if (el.type === 'in' ) {
						let oldCounter = counterIn
						counterIn = counterIn - 1
						// console.log('the incounter is',oldCounter);
						console.log(this.props.node.ports['in-'+ oldCounter].connected,el,key,counterIn);
						return(
					<div className='port'
							key = {key}
							style={{
							position: 'absolute',
							height: inputConnectorSize,
							 zIndex: 10,
							 left: 0,
							 top: (counterIn*inputConnectorSize)}}
							>
						<DiamondPortWidget in='true' name={'in-'+ oldCounter } direction="In" node={this.props.node} connected={this.props.node.ports['in-'+ oldCounter].connected}/>
						</div>)
					}
					if (el.type === 'out' ) {
						// console.log(this.props.node);

						let oldCounter = counterOut
						counterOut = counterOut-1
						return(
							<div
							className='port'
							key = {key}
							style={{
								height: outputConnectorSize,
								position: 'absolute',
								zIndex: 10,
								left: this.props.size-32,
								top:  (counterOut*outputConnectorSize)
							}}
							>
							<DiamondPortWidget in='false' name={'out-'+ oldCounter } direction="Out" node={this.props.node} connected={this.props.node.ports['out-'+ oldCounter].connected}/>
							</div>
						)
					}
				}))
		}
		else {
			return(
				<div>
					<div
					className='port'
						style={{
							height: connectorSize,
							position: 'absolute',
							zIndex: 10,
							left: this.props.size - 8,
							top:  this.props.size/2
						}}
					>
						<DiamondPortWidget name={'out-n' } direction="Out" node={this.props.node} connected={false} />
					</div>
					<div
						style={{
						position: 'absolute',
						height: connectorSize,
						 zIndex: 10,
						 left: -8,
						 top: this.props.size/2
					 }}
						>
						<DiamondPortWidget name={'in-n'  } direction="In" node={this.props.node} connected={this.props.connected}/>
					</div>
			</div>
			)
		}
	}


	render() {
		return (
			<div
				className="diamond-node"
				style={{ position: 'relative', width: this.props.size, height: this.props.size }}
			>

					<div className="flowBlock" style={{
						background:this.props.node.color,
						// borderTop:`solid 2px ${this.props.node.color}`
					}}>
						<p>{this.props.node.name}</p>
						</div>
				{this.props.node.selected ? (
					//console.log(this.state.data),
					<SelectedBlock
					pos={this.props.node.mouse}
					connected = {this.props.node.ports}
					node={this.props.node}
					/>)
					: null}

				{this.makeConnectors()}

			</div>
		);
	}
}

// <svg width="150" height="150" dangerouslySetInnerHTML={this.createMarkup()} />
// {console.log(this.props.node.ports)}

DiamonNodeWidget.defaultProps = {
	size: 128,
	selected:false,
	connected: false,
	data: [],
	node: null,
	mouse: {},
	type: '',
	// name: "a Name"
};
export var DiamonNodeWidgetFactory = React.createFactory(DiamonNodeWidget);
