import * as yup from 'yup';

export const validationSchema = yup.object().shape({
	name: yup
		.string()
		.required('Name is required')
		.matches(/^[A-Z]/, 'Name should start with an uppercase letter'),
	age: yup.number().positive('Age must be a positive number').required('Age is required'),
	email: yup.string().email('Invalid email format').required('Email is required'),
	password: yup
		.string()
		.matches(
			/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/,
			'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
		)
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
		.required('Please upload a valid picture')
		.test('fileSize', 'File Size is too large', (value) => {
			return value && value[0].size <= 2000000;
		})
		.test('fileFormat', 'Unsupported Format', (value) => {
			return value && ['image/jpeg', 'image/png'].includes(value[0].type);
		}),
});
