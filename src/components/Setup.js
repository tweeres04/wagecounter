import React from 'react';

export default function Setup({
	wage,
	totalHours,
	hoursWorked,
	handleChange,
	start,
	resume
}) {
	return (
		<section className="setup section">
			<div className="container">
				<div className="columns">
					<div className="column">
						<div className="field">
							<label>Your Hourly Wage</label>
							<div className="control">
								<input
									className="input"
									type="number"
									value={wage}
									name="wage"
									onChange={handleChange}
								/>
							</div>
						</div>
						<div className="field">
							<label>Hours to work</label>
							<div className="control">
								<input
									className="input"
									type="number"
									value={totalHours}
									name="totalHours"
									onChange={handleChange}
								/>
							</div>
						</div>
						<div className="field">
							<label>Hours worked so far</label>
							<div className="control">
								<input
									className="input"
									type="number"
									value={hoursWorked}
									name="hoursWorked"
									onChange={handleChange}
								/>
							</div>
						</div>
						<button
							className="button is-primary is-large is-fullwidth"
							onClick={start}
						>
							Start
						</button>
					</div>
				</div>
				<div className="columns">
					<div className="column">
						<button
							className="button is-text is-large is-fullwidth"
							onClick={resume}
						>
							Resume
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}
