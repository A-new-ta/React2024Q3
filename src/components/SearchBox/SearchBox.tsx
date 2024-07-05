import React from 'react';
import './SearchBox.css';

interface Props {
	searchTerm: string;
	onSearch: (searchTerm: string) => void;
}

interface State {
	searchTerm: string;
}

class SearchBox extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { searchTerm: props.searchTerm };
	}
	handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ searchTerm: event.target.value });
	};
	handleSearch = () => {
		const trimmedTerm = this.state.searchTerm.trim();
		this.props.onSearch(trimmedTerm);
	};

	render() {
		return (
			<div className="search-component">
				<input
					className="search-input"
					type="text"
					placeholder="Search..."
					autoFocus
					value={this.state.searchTerm}
					onChange={this.handleInputChange}
				/>
				<button onClick={this.handleSearch} className="search-button">
					Search
				</button>
			</div>
		);
	}
}

export default SearchBox;
