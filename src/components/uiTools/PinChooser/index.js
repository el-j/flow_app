import React from 'react';
// import Lodash from 'lodash';
import './PinChooser.css';
// const SelectedBlock = (props) => {


const PinChooser = (props) => {

	console.log(props);
    return(
			<div className='chooser-bg'>

				<div className='chooser-frame'>
					<div className='chooser'>
						<ul className='chooser-list'>
							<div>Name	In 	Out 	Unknown</div>
							<form >
								{props.connectors.map((el,key)=> (
									(el.type === 'in' || el.type === 'out' || el.type === 'unknown') ? (
									<li key={key} className='chooser-listelement'>
										<label className='chooser-label'>{el.name} </label>
										<p>
											<input className='chooser-radio' type='radio' name={el.connector} value="in" onChange={props.handleOptionChange} checked={el.type === "in"}/>
											<input className='chooser-radio' type='radio' name={el.connector} value="out" onChange={props.handleOptionChange} checked={el.type === "out"}/>
											<input className='chooser-radio' type='radio' name={el.connector} value="unknown" onChange={props.handleOptionChange} checked={el.type === "unknown"}/>
										</p>
									</li>
									):(null)
								))}
								<button className="submitChangesButton" type="submit" onClick={props.handleFormSubmit}>
						      Save
						    </button>
							</form>
						</ul>
					</div>
					<div>
					<div className="chooser-svg"  dangerouslySetInnerHTML={{__html: props.svg}} />
					</div>
				</div>
			</div>
)}



export default PinChooser;
