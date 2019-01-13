import { PortModel } from 'storm-react-diagrams';
import Lodash from 'lodash';

export class DiamondPortModel extends PortModel {
	position: string | 'In' | 'Out' ;

	constructor(pos: string = 'In') {
		super(pos);
		this.position = pos;
	}

	serialize() {
		return Lodash.merge(super.serialize(), {
			position: this.position
		});
	}

	deSerialize(data: any) {
		super.deSerialize(data);
		this.position = data.position;
	}
}
