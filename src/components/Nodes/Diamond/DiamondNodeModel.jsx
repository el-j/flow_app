import { NodeModel } from 'storm-react-diagrams';
import { DiamondPortModel } from './DiamondPortModel';

export class DiamondNodeModel extends NodeModel {
	name: string;
	color: string;
	ports:  {[s: string]:DiamondPortModel};

	constructor(name: string = 'Untitled',color: string = 'rgb(0,192,255)') {
		super('diamond');
		this.name = name;
		this.color = color;
		this.addPort(new DiamondPortModel('In',true,name));
		this.addPort(new DiamondPortModel('Out'));
	}
}
