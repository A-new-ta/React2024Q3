import { useRef } from 'react';
import { validationSchema } from './validationSchema.ts';
import { FormData } from '../types/types';

const useFormUncontrolled = () => {
	const nameRef = useRef<HTMLInputElement>(null);
	const ageRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const confirmPasswordRef = useRef<HTMLInputElement>(null);
	const genderRef = useRef<HTMLSelectElement>(null);
	const acceptTermsRef = useRef<HTMLInputElement>(null);
	const pictureRef = useRef<HTMLInputElement>(null);
	const countryRef = useRef<HTMLInputElement>(null);

	const getFormData = (): FormData => {
		return {
			name: nameRef.current?.value || '',
			age: ageRef.current?.valueAsNumber || 0,
			email: emailRef.current?.value || '',
			password: passwordRef.current?.value || '',
			confirmPassword: confirmPasswordRef.current?.value || '',
			gender: genderRef.current?.value || '',
			acceptTerms: acceptTermsRef.current?.checked || false,
			picture: '',
			country: countryRef.current?.value || '',
		};
	};

	const validateForm = async (data: FormData) => {
		try {
			await validationSchema.validate(data, { abortEarly: false });
			return null;
		} catch (validationErrors) {
			//fix never
			return validationErrors.inner.reduce((acc: never, error: never) => {
				acc[error.path] = error.message;
				return acc;
			}, {});
		}
	};

	return {
		nameRef,
		ageRef,
		emailRef,
		passwordRef,
		confirmPasswordRef,
		genderRef,
		acceptTermsRef,
		pictureRef,
		countryRef,
		getFormData,
		validateForm,
	};
};

export default useFormUncontrolled;
