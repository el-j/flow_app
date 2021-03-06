import React from 'react';
// import Lodash from 'lodash';
import './BlockPreference.css';
// const SelectedBlock = (props) => {


const BlockPreference = (props) => {

	console.log(props);
    return(
			<div className='chooser-bg'>

				<div className='chooser-frame'>
					<div className='chooser'>
						<table className='chooser-list'>
						<thead>
							<tr><th>Name</th><th>In</th><th>Out</th><th>Unknown</th></tr>
							</thead>
							<tbody>
								{props.connectors.map((el,key)=> (
									(el.type === 'in' || el.type === 'out' || el.type === 'unknown' || el.type === '') ? (
									<tr key={key} className='chooser-listelement'>
											<td className='chooser-label'><span>{el.name}</span></td>
											<td><span className='checkmark'></span><input className='chooser-radio' type='radio' name={el.connector} value='in' onChange={props.handleOptionChange} checked={el.type === 'in'}/></td>
											<td><span className='checkmark'></span><input className='chooser-radio' type='radio' name={el.connector} value='out' onChange={props.handleOptionChange} checked={el.type === 'out'}/></td>
											<td><span className='checkmark'></span><input className='chooser-radio' type='radio' name={el.connector} value='unknown' onChange={props.handleOptionChange} checked={el.type === 'hide'}/></td>
											<td><span className='checkmark'></span><input className='chooser-radio' type='radio' name={el.connector} value='unknown' onChange={props.handleOptionChange} checked={el.type === 'unknown'}/></td>
									</tr>
									):(null)
								))}
								</tbody>
						</table>
						<button className='submitChangesButton' type='submit' onClick={props.handleFormSubmit}>
						Save
						</button>
					</div>
					<div>
					<div className='chooser-svg'  dangerouslySetInnerHTML={{__html: props.svg}} />
					</div>
				</div>
			</div>
)}



export default BlockPreference;
