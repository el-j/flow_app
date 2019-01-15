import { NodeModel } from 'storm-react-diagrams';
import { DiamondPortModel } from './DiamondPortModel';

export class DiamondNodeModel extends NodeModel {
	name: string;
	color: string;
	data: array;
	mouse: object;
	test: string;
	ports:  {[s: string]:DiamondPortModel};

	constructor(name: string = 'Untitled',color: string = 'rgb(0,192,255)',data: array = [], mouse: object = []) {
		super('diamond');
		this.name = name;
		this.color = color;
		this.data = data;
		this.mouse = mouse;
		console.log("log from Node Model",this.data.length)
		for (var i = 0; i < this.data.length; i++) {
			if (i % 2 === 0) {
				console.log(i, i % 2);
				this.addPort(new DiamondPortModel('in-'+i, 'In', this.data[i].elementConnectorSource));
			}
			else {
				this.addPort(new DiamondPortModel('out-'+i, 'Out', this.data[i].elementConnectorSource));
			}
		}

	}
}
