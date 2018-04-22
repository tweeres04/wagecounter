import React, { Component } from 'react';

import _toNumber from 'lodash/fp/toNumber';
import { get, set, clear } from './idb-keyval.mjs';

import 'bulma/css/bulma.css';

import Setup from './components/Setup';
import Counter from './components/Counter';

class App extends Component {
	state = {
		view: 'loading',
		wage: 20,
		totalHours: 8,
		hoursWorked: 0,
		startTime: new Date()
	};
	componentDidMount() {
		this.loadState();
	}
	loadState = async () => {
		const state = await get('state');
		this.setState(prevState =>
			Object.assign(prevState, { view: 'setup' }, state)
		);
	};
	render() {
		const { view, wage, totalHours, hoursWorked, startTime } = this.state;
		return (
			<div className="App">
				{view == 'setup' ? (
					<Setup
						wage={wage}
						totalHours={totalHours}
						hoursWorked={hoursWorked}
						handleChange={this.handleChange}
						start={this.start}
						resume={this.resume}
					/>
				) : view == 'counter' ? (
					<Counter
						wage={wage}
						totalHours={totalHours}
						hoursWorked={hoursWorked}
						startTime={startTime}
						clear={this.clear}
					/>
				) : null}
				<div className="footer">
					<div className="container has-text-centered">
						<div>&copy; 2018 Tweeres Software</div>
						<div>
							Icon by{' '}
							<a
								href="https://www.flaticon.com/authors/smashicons"
								title="Smashicons"
							>
								Smashicons
							</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
	handleChange = ({ target: { name, value } }) => {
		this.setState({ [name]: value == '' ? value : _toNumber(value) });
	};
	start = () => {
		this.setState(prevState => {
			const newState = Object.assign(prevState, {
				startTime: new Date(),
				view: 'counter'
			});
			set('state', newState);
			return newState;
		});
	};
	clear = () => {
		this.setState(prevState => {
			const newState = Object.assign(prevState, { view: 'setup' });
			set('state', newState);
			return newState;
		});
	};
	resume = () => {
		this.setState(prevState => {
			const newState = Object.assign(prevState, { view: 'counter' });
			set('state', newState);
			return newState;
		});
	};
}

export default App;
