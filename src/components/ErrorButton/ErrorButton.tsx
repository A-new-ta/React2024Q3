import React from 'react';

interface State {
	counter: number;
}

class ErrorButton extends React.Component<Record<string, never>, State> {
	constructor(props: Record<string, never>) {
		super(props);
		this.state = { counter: 0 };
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick() {
		this.setState(({ counter }) => ({
			counter: counter + 1,
		}));
	}

	render() {
		if (this.state.counter === 1) {
			throw new Error('Test Error');
		}
		return (
			<button onClick={this.handleClick} className="error-button">
				Throw Error
			</button>
		);
	}
}
export default ErrorButton;
