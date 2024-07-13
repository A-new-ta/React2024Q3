export interface Planet {
	name: string;
	terrain: string;
	population: string;
	url: string;
	count: number;
}

export interface PlanetAPIResponse {
	count: number;
	next: string | null;
	previous: string | null;
	results: Planet[];
}

export interface PlanetDetails extends Planet {
	diameter: string;
	gravity: string;
	climate: string;
	orbital_period: string;
	rotation_period: string;
	surface_water: string;
}
