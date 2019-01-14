import { NodeModel } from 'storm-react-diagrams';
import { DiamondPortModel } from './DiamondPortModel';

export class DiamondNodeModel extends NodeModel {
	name: string;
	color: string;
	data: array;
	test: string;
	ports:  {[s: string]:DiamondPortModel};

	constructor(name: string = 'Untitled',color: string = 'rgb(0,192,255)',data: array = []) {
		super('diamond');
		this.name = name;
		this.color = color;
		this.data = data;
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
