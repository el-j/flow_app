import { NodeModel } from 'storm-react-diagrams';
import { DiamondPortModel } from './DiamondPortModel';

export class DiamondNodeModel extends NodeModel {
	name: string;
	color: string;
	data: array;
	mouse: object;
	test: string;
	type: string;
	connected: boolean;
	ports:  {[s: string]:DiamondPortModel};

	constructor(name: string = 'Untitled',color: string = 'rgb(0,192,255)',data: array = [], mouse: object = [], type: string = 'in', connected: boolean = false) {
		super('diamond');
		this.name = name;
		this.color = color;
		this.data = data;
		this.mouse = mouse;
		this.type = type;
		this.connected = connected
		this.addPort(new DiamondPortModel(name, type,type,connected));

	}
}
