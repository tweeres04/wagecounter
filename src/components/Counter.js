import React, { Component } from 'react';

import _round from 'lodash/round';

import differenceInSeconds from 'date-fns/difference_in_seconds';
import dateFormat from 'date-fns/format';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import subtractHours from 'date-fns/sub_hours';

function Statistic({ label, value }) {
	return (
		<div className="column is-narrow">
			<div>
				<div className="heading">{label}</div>
				<div className="title is-4">{value}</div>
			</div>
		</div>
	);
}

export default class Counter extends Component {
	state = {
		timeElapsed: null
	};
	componentDidMount() {
		this.intervalHandle = setInterval(this.setTimeElapsed, 1000);
		this.setTimeElapsed();
	}
	setTimeElapsed = () => {
		const { startTime } = this.props;
		this.setState({
			timeElapsed: differenceInSeconds(new Date(), startTime)
		});
	};
	render() {
		const { timeElapsed } = this.state;
		const { wage, totalHours, hoursWorked, clear } = this.props;
		let { startTime } = this.props;

		startTime = subtractHours(startTime, hoursWorked);

		const maxEarned = wage * totalHours;
		const totalWorked = hoursWorked + timeElapsed / 3600;
		const totalEarned =
			totalWorked > totalHours
				? maxEarned
				: _round(totalWorked * wage, 2);
		const hoursToGo =
			totalWorked > totalHours ? 0 : _round(totalHours - totalWorked, 2);

		return (
			<section className="hero is-primary is-bold is-fullheight counter">
				<div className="hero-head">
					<button
						className="button is-large is-primary is-inverted is-outlined is-pulled-right"
						onClick={clear}
					>
						<i className="icon">
							<i className="material-icons">close</i>
						</i>
					</button>
				</div>
				<div className="hero-body has-text-centered">
					<div className="container">
						<h1 className="title">
							You've made ${totalEarned.toFixed(2)} of ${maxEarned.toFixed(
								2
							)}
						</h1>
						<div className="columns is-multiline is-mobile is-centered">
							<Statistic label="Wage" value={`$${wage}/hr`} />
							<Statistic label="Total Hours" value={totalHours} />
							<Statistic label="Hours to Go" value={hoursToGo} />
							<Statistic
								label="Start Time"
								value={dateFormat(startTime, 'h:mm a')}
							/>
							<Statistic
								label="Elapsed Time"
								value={distanceInWordsToNow(startTime)}
							/>
						</div>
					</div>
				</div>
			</section>
		);
	}
	componentWillUnmount() {
		clearInterval(this.intervalHandle);
	}
}
