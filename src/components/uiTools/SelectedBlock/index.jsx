import React from 'react';
import './SelectedBlock.css';

const SelectedBlock = (props) => {
	console.log(props)
	let totalInputCount = props.node.data.connected.filter((obj) => {
	return obj.type === 'in';
	}).length

	let totalOutputCount = props.node.data.connected.filter((obj) => {
	return obj.type === 'out';
	}).length
	let counterIn= totalInputCount
	let counterOut = totalOutputCount

		return (
				<div className='selectedFrame' style={{top: props.pos.y,left: props.pos.x}}>
					<div className='connectors'>
					<form action="/action_page.php" className="typeChooser">
					  <input list="type" name="type" />
					  <datalist id="type">
					    <option value="None" />
					    <option value="Hardware" />
					    <option value="Software" />
					  </datalist>
					</form>
					<form action="/action_page.php" className="kindChooser">
					  <input list="kind" name="kind" />
					  <datalist id="kind">
					    <option value="Arduino Uno" />
					    <option value="Arduino Leonardo" />
					    <option value="Arduino Mega" />
					    <option value="Raspberry Pi" />
					    <option value="BeagleBone" />
					  </datalist>
					</form>
					<div className='conIn'>
					<p>listen</p>
					{props.node.data.connected.map((el,key) => {
								if (el.type === 'in' ) {
									let oldCounter = counterIn
									counterIn = counterIn - 1
						return(
						<div key={el.name} className={'connector '+ (props.node.ports['in-'+ oldCounter].connected ? 'connected': '')}>

						</div>)} }
					)}
					</div>
					<div className='conOut'>
					<p>talk</p>
					{props.node.data.connected.map((el,key) => {
								if (el.type === 'out' ) {
									let oldCounter = counterOut
									counterOut = counterOut - 1
						return(
						<div key={el.name} className={'connector '+ (props.connected['out-'+  oldCounter].connected ? 'connected': '')}>

						</div>)}}
									)}
					</div>
					</div>
					<button className="selectedbutton">
						<div>
							<label className="label">
							Add NEW
							</label>
						</div>
					</button>
				</div>
		)}

export default SelectedBlock;
