import React from 'react';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';
import SearchBox from './components/SearchBox/SearchBox.tsx';
import ResultsBox from './components/ResultsBox/ResultsBox.tsx';
import ErrorButton from './components/ErrorButton/ErrorButton.tsx';

interface State {
	searchTerm: string;
}

class App extends React.Component<Record<string, never>, State> {
	constructor(props: Record<string, never>) {
		super(props);
		const savedSearchTerm = localStorage.getItem('searchTerm' || '');
		this.state = { searchTerm: savedSearchTerm };
	}

	handleSearch = (searchTerm: string) => {
		this.setState({ searchTerm });
	};

	render() {
		return (
			<ErrorBoundary>
				<div className="app">
					<div className="top-section">
						<SearchBox onSearch={this.handleSearch} />
						<ErrorButton />
					</div>
					<div className="bottom-section">
						<ResultsBox searchTerm={this.state.searchTerm} />
					</div>
				</div>
			</ErrorBoundary>
		);
	}
}
export default App;
