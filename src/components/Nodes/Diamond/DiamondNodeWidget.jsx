import React from 'react';
import { DiamondNodeModel } from './DiamondNodeModel';
import { PortWidget } from 'storm-react-diagrams';

export interface DiamonNodeWidgetProps {
	node: DiamondNodeModel,
	size?: number,
	name: string
}

export interface DiamonNodeWidgetState {}

export class DiamonNodeWidget extends React.Component<DiamonNodeWidgetProps, DiamonNodeWidgetState> {
	constructor(props: DiamonNodeWidgetProps) {
		super(props);
		this.state = {};
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
				'" fill="purple" stroke="#000000" stroke-width="3" stroke-miterlimit="10"/>' +
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
				<div style={{ position: 'absolute', zIndex: 10, left: -8, top: this.props.size / 2 - 8 }}>
					<PortWidget name="In" node={this.props.node} />
				</div>
				<div
					style={{
						position: 'absolute',
						zIndex: 10,
						left: this.props.size - 8,
						top: this.props.size / 2 - 8
					}}
				>
					<PortWidget name="Out" node={this.props.node} />
				</div>
			</div>
		);
	}
}


DiamonNodeWidget.defaultProps = {
	size: 150,
	node: null,
	name: "a Name"
};
export var DiamonNodeWidgetFactory = React.createFactory(DiamonNodeWidget);
