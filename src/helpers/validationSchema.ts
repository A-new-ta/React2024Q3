import * as yup from 'yup';

export const validationSchema = yup.object().shape({
	name: yup
		.string()
		.required('Name is required')
		.matches(/^[A-Z]/, 'Name should start with an uppercase letter'),
	age: yup
		.number()
		.transform((value, originalValue) => (originalValue.trim() === '' ? null : value))
		.nullable()
		.positive('Age must be a positive number')
		.required('Age is required'),
	email: yup.string().email('Invalid email format').required('Email is required'),
	password: yup
		.string()
		.min(10, 'Password must be at least 10 characters long')
		.matches(/[0-9]/, 'Password must contain at least one digit')
		.matches(/[a-z]/, 'Password must contain at least one lowercase letter')
		.matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
		.matches(/[!@#%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
		.required('Password is required'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password')], 'Passwords do not match')
		.required('Please confirm your password'),
	gender: yup.string().required('Gender is required'),
	acceptTerms: yup
		.boolean()
		.oneOf([true], 'You must accept the Terms and Conditions')
		.required('Accepting Terms and Conditions is required'),
	country: yup.string().required('Country is required'),
	picture: yup
		.mixed()
		.test('fileSize', 'File size is too large', (value) => {
			if (!value || value.length === 0) {
				return true;
			}
			return value[0]?.size <= 5000000;
		})
		.test('fileFormat', 'Unsupported Format', (value) => {
			if (!value || value.length === 0) {
				return true;
			}
			return ['image/jpg', 'image/jpeg', 'image/png'].includes(value[0]?.type);
		}),
});
