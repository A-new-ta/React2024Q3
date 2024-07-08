import React from 'react';
import './ResultsBox.css';
import { getPlanets } from '../../services/api.ts';

interface Props {
	searchTerm: string;
}

interface State {
	results: { name: string; description: string; population: string }[];
	loading: boolean;
}

class ResultsBox extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			results: [],
			loading: false,
		};
	}

	async componentDidMount() {
		await this.fetchResults();
	}

	async componentDidUpdate(prevProps: Props) {
		if (prevProps.searchTerm !== this.props.searchTerm) {
			await this.fetchResults();
		}
	}

	fetchResults = async () => {
		this.setState((prevState) => ({
			...prevState,
			loading: true,
		}));
		try {
			const data = await getPlanets(this.props.searchTerm.trim());
			const results = data.results.map((planet) => ({
				name: planet.name,
				description: planet.terrain,
				population: planet.population,
			}));
			this.setState({ results, loading: false });
		} catch (error) {
			console.error('Error fetching data:', error);
			this.setState((prevState) => ({
				...prevState,
				loading: false,
			}));
		}
	};

	render() {
		const { results, loading } = this.state;
		if (loading) {
			return <div className="loading">Loading...</div>;
		}

		return (
			<div className="results-component">
				{results.map((result, index) => (
					<div key={index} className="card">
						<h3>{result.name}</h3>
						<p>{result.description}</p>
						<p>{result.population}</p>
					</div>
				))}
			</div>
		);
	}
}

export default ResultsBox;
