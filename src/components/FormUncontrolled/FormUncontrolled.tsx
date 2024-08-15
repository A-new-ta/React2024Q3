import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitForm } from '../../store/formSlice.ts';
import { useNavigate } from 'react-router-dom';
import useFormUncontrolled from '../../helpers/useFormUncontrolled.ts';
import styles from './FormUncontrolled.module.css';
import { RootState } from '../../store/store.ts';

const FormUncontrolled = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const countries = useSelector((state: RootState) => state.country.countries);

	const {
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
	} = useFormUncontrolled();

	const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = getFormData();
		// formData.country = country;

		const validationErrors = await validateForm(formData);

		if (validationErrors) {
			setErrors(validationErrors);
			setIsSubmitting(false);
		} else {
			setIsSubmitting(true);
			if (pictureRef.current?.files?.[0]) {
				const reader = new FileReader();
				reader.onloadend = () => {
					formData.picture = reader.result as string;
					dispatch(submitForm(formData));
					navigate('/');
				};
				reader.readAsDataURL(pictureRef.current.files[0]);
			} else {
				dispatch(submitForm(formData));
				navigate('/');
			}
		}
	};

	return (
		<form onSubmit={handleSubmit} className={styles.formContainer}>
			<div className={styles.formGroup}>
				<label htmlFor="name" className={styles.label}>
					Name:
				</label>
				<input id="name" ref={nameRef} type="text" className={styles.input} />
				{errors.name && <p className={styles.errorMessage}>{errors.name}</p>}
			</div>

			<div className={styles.formGroup}>
				<label htmlFor="age" className={styles.label}>
					Age:
				</label>
				<input id="age" ref={ageRef} type="number" className={styles.input} />
				{errors.age && <p className={styles.errorMessage}>{errors.age}</p>}
			</div>

			<div className={styles.formGroup}>
				<label htmlFor="email" className={styles.label}>
					Email:
				</label>
				<input id="email" ref={emailRef} type="email" className={styles.input} />
				{errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
			</div>

			<div className={styles.formGroup}>
				<label htmlFor="password" className={styles.label}>
					Password:
				</label>
				<input id="password" ref={passwordRef} type="password" className={styles.input} />
				{errors.password && <p className={styles.errorMessage}>{errors.password}</p>}
			</div>

			<div className={styles.formGroup}>
				<label htmlFor="confirmPassword" className={styles.label}>
					Confirm Password:
				</label>
				<input
					id="confirmPassword"
					ref={confirmPasswordRef}
					type="password"
					className={styles.input}
				/>
				{errors.confirmPassword && <p className={styles.errorMessage}>{errors.confirmPassword}</p>}
			</div>

			<div className={styles.formGroup}>
				<label htmlFor="gender" className={styles.label}>
					Gender:
				</label>
				<select id="gender" ref={genderRef} className={styles.select}>
					<option value="">Select Gender</option>
					<option value="male">Male</option>
					<option value="female">Female</option>
				</select>
				{errors.gender && <p className={styles.errorMessage}>{errors.gender}</p>}
			</div>

			<div className={styles.formGroup}>
				<label htmlFor="acceptTerms" className={styles.label}>
					Accept Terms and Conditions:
				</label>
				<input id="acceptTerms" ref={acceptTermsRef} type="checkbox" className={styles.checkbox} />
				{errors.acceptTerms && <p className={styles.errorMessage}>{errors.acceptTerms}</p>}
			</div>

			<div className={styles.formGroup}>
				<label htmlFor="picture" className={styles.label}>
					Upload Picture:
				</label>
				<input
					id="picture"
					ref={pictureRef}
					type="file"
					accept="image/png, image/jpeg"
					className={styles.fileInput}
				/>
				{errors.picture && <p className={styles.errorMessage}>{errors.picture}</p>}
			</div>

			<div className={styles.formGroup}>
				<label htmlFor="country" className={styles.label}>
					Country:
				</label>
				<input
					type="text"
					id="country"
					list="country-list"
					ref={countryRef}
					className={styles.input}
				/>
				<datalist id="country-list">
					{countries.map((country) => (
						<option key={country}>{country}</option>
					))}
				</datalist>
				{/*<Autocomplete value={country} onChange={setCountry}/>*/}
				{errors.country && <p className={styles.errorMessage}>{errors.country}</p>}
			</div>

			<button type="submit" className={styles.button} disabled={isSubmitting}>
				Submit
			</button>
		</form>
	);
};

export default FormUncontrolled;
