import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormsData {
	name: string;
	age: number;
	email: string;
	password: string;
	confirmPassword: string;
	gender: string;
	confirm: boolean;
	picture: string;
	country: string;
}

interface FormState {
	data: FormsData[];
}

const initialState: FormState = {
	formsData: [],
};

const formSlice = createSlice({
	name: 'form',
	initialState,
	reducers: {
		submitForm: (state, action: PayloadAction<FormData>) => {
			state.data.push(action.payload);
		},
	},
});

export const { submitForm } = formSlice.actions;

export default formSlice.reducer;
