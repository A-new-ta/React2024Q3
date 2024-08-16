import * as yup from 'yup';

export const validationSchemaUncontrolled = yup.object().shape({
	name: yup
		.string()
		.matches(/^[A-Z]/, 'Name should start with an uppercase letter')
		.required('Name is required'),
	age: yup
		.number()
		.transform((value, originalValue) => (originalValue === 0 ? null : value))
		.nullable()
		.required('Age is required')
		.positive('Age must be a positive number'),

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
		.test('fileSize', 'File size is too large', function (value) {
			if (!value) {
				return true;
			}
			const { size } = value;
			return size <= 5000000;
		})
		.test('fileFormat', 'Unsupported Format', function (value) {
			if (!value) {
				return true;
			}
			const { type } = value;
			return ['image/jpg', 'image/jpeg', 'image/png'].includes(type);
		}),
});
