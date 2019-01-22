import React from 'react';
import { DiamondNodeModel } from './DiamondNodeModel';
import { PortWidget } from 'storm-react-diagrams';
import IsEmpty from '../../../IsEmpty'
import SelectedBlock from '../../uiTools/SelectedBlock'

export interface DiamonNodeWidgetProps {
	node: DiamondNodeModel,
	size?: number,
	name: string,
	color: string,
	selected: boolean,
	data: array,
	mouse: object,
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
			console.log(this.props.node.data.connected);
			return(
			this.props.node.data.connected.map((el,key) => {
					if (el.type === 'in' ) {
						// console.log(key, key % 2);
						return(
					<div
							key = {key}
							style={{
							position: 'absolute',
							height: connectorSize,
							 zIndex: 10,
							 left: -8,
							 top: connectorSize + (key*connectorSize) - connectorSize}}
							>
						<PortWidget name={'in-'+ key } direction="In" node={this.props.node} />
						</div>)
					}
					if (el.type === 'out' ) {
						return(
							<div
							key = {key}
							style={{
								height: connectorSize,
								position: 'absolute',
								zIndex: 10,
								left: this.props.size - 8,
								top:  (key*connectorSize) - connectorSize
							}}
							>
							<PortWidget name={'out-'+ key } direction="Out" node={this.props.node} />
							</div>
						)
					}

				}))
		}
		else {
			// console.log("we have else");
			return(
				<div>
					<div
						style={{
							height: connectorSize,
							position: 'absolute',
							zIndex: 10,
							left: this.props.size - 8,
							top:  this.props.size/2
						}}
					>
						<PortWidget name={'out-n' } direction="Out" node={this.props.node} />
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
						<PortWidget name={'in-n'  } direction="In" node={this.props.node} />
					</div>
			</div>
			)
		}
	}

	createMarkup() {
		return {
			__html:
				'<g id="Layer_1"></g><g id="Layer_2"><polygon points="0,' +
				0 +
				' ' +
				0 +
				','+
				this.props.size +
				' ' +
				this.props.size +
				',' +
				this.props.size +
				' ' +
				this.props.size +
				',' +
				0 +
				'" fill="'+this.props.node.color +'" stroke="none" stroke-width="3" stroke-miterlimit="10"/>' +
				'<text x=' +
				(this.props.size / 2 - 33) +
				' y=' +
				(this.props.size / 2 + 5) +
				'>'+this.props.node.name +'</text></g>'
		};
	}
	render() {
		return (
			<div
				className="diamond-node"
				style={{ position: 'relative', width: this.props.size, height: this.props.size }}
			>
				<svg width="150" height="150" dangerouslySetInnerHTML={this.createMarkup()} />
				{this.props.node.selected ? (console.log(this.state.data),<SelectedBlock
					pos={this.props.node.mouse}
					connectors={this.props.node.data.connected}
					/>)
					: null}

				{this.makeConnectors()}

			</div>
		);
	}
}

// {console.log(this.props.node.ports)}

DiamonNodeWidget.defaultProps = {
	size: 128,
	selected:false,
	data: [],
	node: null,
	mouse: {}
	// name: "a Name"
};
export var DiamonNodeWidgetFactory = React.createFactory(DiamonNodeWidget);
