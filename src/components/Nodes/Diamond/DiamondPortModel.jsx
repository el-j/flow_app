import { PortModel } from 'storm-react-diagrams';
import Lodash from 'lodash';

export class DiamondPortModel extends PortModel {
	in: boolean;
	label: string;
	direction: string;
	connected: boolean;

	constructor(isInput:boolean, name: string, direction: string = 'In',label: string = null, connected: boolean) {
		super(name,direction);
		console.log(direction, name);
		this.in = isInput
		this.id = label || name ;
		this.direction = direction;
		this.label = label || name ;
		this.connected = connected;
	}

	serialize() {
		return Lodash.merge(super.serialize(), {
			in: this.in,
			id: this.id,
			direction: this.direction,
			label: this.label,
			connected: this.connected
		});
	}

	deSerialize(data: any) {
		super.deSerialize(data);
		this.in = data.in;
		this.id = data.id;
		this.direction = data.direction;
		this.label = data.label;
		this.connected = data.connected;
	}
}
