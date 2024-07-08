export interface Planet {
	name: string;
	terrain: string;
	population: string;
}

export interface PlanetAPIResponse {
	results: Planet[];
}
