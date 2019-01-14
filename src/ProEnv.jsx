import React from 'react';
import Lodash from 'lodash';
import fetch from 'node-fetch';
import './addBar.css';

// const addNewBlock = ()  => {
// 	console.log('hello');
// }

const ProEnv = (props) => {

		return (
			<div className="addBarFrame">
				<input type="text" name="name" value={this.value} placeholder="Add new Block from fzz" />
				<button onClick={props.addNewBlock()}>
					<div>
						<label>
						Add NEW
						</label>
					</div>
				</button>
			</div>
		);
}

export default ProEnv;
