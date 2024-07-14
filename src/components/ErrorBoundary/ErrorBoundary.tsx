import React, { ErrorInfo, ReactNode } from 'react';
import './ErrorBoundary.css';
interface Props {
	children: ReactNode;
}
interface State {
	error: Error | null;
	errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { error: null, errorInfo: null };
	}

	static getDerivedStateFromError(error: Error) {
		return { error: error };
	}
	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		this.setState({
			error: error,
			errorInfo: errorInfo,
		});
	}
	reloadPage() {
		window.location.reload();
	}
	render() {
		if (this.state.error) {
			return (
				<div>
					<h1>Something went wrong.</h1>
					<button onClick={this.reloadPage} className="reload-button">
						Reload page
					</button>
				</div>
			);
		}
		return this.props.children;
	}
}
export default ErrorBoundary;
