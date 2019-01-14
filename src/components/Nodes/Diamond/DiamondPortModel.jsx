import { PortModel } from 'storm-react-diagrams';
import Lodash from 'lodash';

export class DiamondPortModel extends PortModel {
	label: string;
	direction: string;

	constructor(name: string,direction: string = 'In',label: string = null,) {
		super(name,direction);
		console.log(direction, name);
		this.direction = direction;
		this.id = label || name ;
		this.label = label || name ;
	}

	serialize() {
		return Lodash.merge(super.serialize(), {
			label: this.label,
			id: this.id,
			direction: this.direction
		});
	}

	deSerialize(data: any) {
		super.deSerialize(data);
		this.id = data.id,			

		// this.in = data.in
		this.label = data.label
		this.direction = data.direction;
	}
}
