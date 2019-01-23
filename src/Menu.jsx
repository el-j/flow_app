import React from 'react';
import { Link } from 'react-router-dom';

class Menu extends React.Component {
	render() {
		return (
			<div>
				<h1>Fritzing Flow Example App</h1>
				<p>
					The Repository can be found <a href="https://github.com/el-j/flow_app">here</a>.
				</p>
				<ul>

					<li>
						<Link to="Flow">Flow</Link> - Flow Example App
					</li>

				</ul>
			</div>
		);
	}
}

export default Menu;
