import React from 'react';
// import Lodash from 'lodash';
// import fetch from 'node-fetch';
import './addBar.css';

// const addNewBlock = ()  => {
// 	console.log('hello');
// }


const AddBar = (props) => {
	// console.log(props);
		return (
			<div className="addBarFrame" style={{top: props.pos.y,left: props.pos.x}}>
			  <input className="addBarInput" list='database_list' type="text" name='addBarInput' placeholder="Add new Block from fzz" value={props.inputValue} onChange={evt => props.updateInputValue(evt)}/>
				<datalist id='database_list'>
				{props.dataBase.map(el => <option value={el.name} /> )}
				</datalist>
									<button onClick={event => props.addNewBlock(event)}>
					<div>
						<label>
						Add NEW
						</label>
					</div>
				</button>
			</div>
		);
}

export default AddBar;
