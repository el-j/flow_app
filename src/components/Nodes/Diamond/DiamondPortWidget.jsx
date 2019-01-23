import * as React from "react";
import { DiamondNodeModel } from './DiamondNodeModel';

export interface PortProps {
	name: string;
	node: DiamondNodeModel;
}

export interface PortState{
	selected: boolean;
	locked: boolean;
	connected: boolean;
}

/**
 * @author Fabian Althaus
 */
export class DiamondPortWidget extends React.Component<PortProps, PortState> {

	constructor(props: PortProps){
		super(props);
		this.state = {
			selected: false,
			connected: false,
			locked: false
		};
	}

	render() {
		console.log("from protwidget",this.state,this.props.direction)
		return (
			<div
				onMouseEnter={() =>{
					this.setState({selected: true});
				}}

				onMouseLeave={() => {
					this.setState({selected: false});
				}}

				className={'port'+(this.state.selected?' selected':'')}
				data-name={this.props.name}
				data-nodeid={this.props.node.getID()}
			>
			<div className={'portswitch'+(this.props.connected? ' connected':'')+(this.props.direction==='Out'? ' out':' in')}></div>
			</div>
		);
	}
}
