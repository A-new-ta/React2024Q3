export interface Planet {
	name: string;
	terrain: string;
	population: string;
}

export interface PlanetAPIResponse {
	count: number;
	next: string | null;
	previous: string | null;
	results: Planet[];
}
