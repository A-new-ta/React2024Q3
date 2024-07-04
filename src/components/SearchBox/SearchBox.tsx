import React from 'react';
import './SearchBox.css';

interface Props {
	onSearch: (searchTerm: string) => void;
}

interface State {
	searchTerm: string;
}

class SearchBox extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		const savedSearchTerm = localStorage.getItem('searchTerm') || '';
		this.state = { searchTerm: savedSearchTerm };
	}
	handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ searchTerm: event.target.value });
	};
	handleSearch = () => {
		const { searchTerm } = this.state;
		const trimmedTerm = searchTerm.trim();
		localStorage.setItem('searchTerm', trimmedTerm);
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
