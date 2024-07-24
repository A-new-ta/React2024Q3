export interface Planet {
	name: string;
	terrain: string;
	population: string;
	url: string;
	id: string;
}

export interface PlanetAPIResponse {
	count: number;
	next: string | null;
	previous: string | null;
	results: PlanetDetails[];
}

export interface PlanetDetails extends Planet {
	diameter: string;
	gravity: string;
	climate: string;
	orbital_period: string;
	rotation_period: string;
	surface_water: string;
}
