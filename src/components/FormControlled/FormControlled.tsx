import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { submitForm } from '../../store/formSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { validationSchema } from '../../helpers/validationSchema';
import { FormData } from '../../types/types';
import styles from './FormControlled.module.css';
import { RootState } from '../../store/store.ts';
import { convertToBase64 } from '../../helpers/convertToBase64.ts';
import PasswordStrengthIndicator from '../PasswordStrengthIndicator/PasswordStrengthIndicator.tsx';

const FormControlled = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const countries = useSelector((state: RootState) => state.country.countries);
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		watch,
	} = useForm<FormData>({
		resolver: yupResolver(validationSchema),
		mode: 'onChange',
	});

	const onSubmit = async (data: FormData) => {
		try {
			const uploadFile = data.picture[0];
			const convertedImage = await convertToBase64(uploadFile);
			dispatch(
				submitForm({
					...data,
					picture: convertedImage,
					isNew: true,
				})
			);
			navigate('/');
		} catch (error) {
			console.log(error);
		}
	};

	const passwordValue = watch('password', '');

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
			<div className={styles.formGroup}>
				<label htmlFor="name" className={styles.label}>
					Name:
				</label>
				<input id="name" {...register('name')} className={styles.input} />
				{errors.name && <p className={styles.errorMessage}>{errors.name.message}</p>}
			</div>

			<div className={styles.formGroup}>
				<label htmlFor="age" className={styles.label}>
					Age:
				</label>
				<input id="age" type="number" {...register('age')} className={styles.input} />
				{errors.age && <p className={styles.errorMessage}>{errors.age.message}</p>}
			</div>

			<div className={styles.formGroup}>
				<label htmlFor="email" className={styles.label}>
					Email:
				</label>
				<input id="email" type="email" {...register('email')} className={styles.input} />
				{errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}
			</div>

			<div className={styles.formGroup}>
				<label htmlFor="password" className={styles.label}>
					Password:
				</label>
				<input id="password" type="password" {...register('password')} className={styles.input} />
				{errors.password && <p className={styles.errorMessage}>{errors.password.message}</p>}
				<PasswordStrengthIndicator password={passwordValue} />
			</div>

			<div className={styles.formGroup}>
				<label htmlFor="confirmPassword" className={styles.label}>
					Confirm Password:
				</label>
				<input
					id="confirmPassword"
					type="password"
					{...register('confirmPassword')}
					className={styles.input}
				/>
				{errors.confirmPassword && (
					<p className={styles.errorMessage}>{errors.confirmPassword.message}</p>
				)}
			</div>

			<div className={styles.formGroup}>
				<label htmlFor="gender" className={styles.label}>
					Gender:
				</label>
				<select id="gender" {...register('gender')} className={styles.select}>
					<option value="">Select Gender</option>
					<option value="male">Male</option>
					<option value="female">Female</option>
				</select>
				{errors.gender && <p className={styles.errorMessage}>{errors.gender.message}</p>}
			</div>

			<div className={styles.formGroup}>
				<label htmlFor="acceptTerms" className={styles.label}>
					Accept Terms and Conditions:
				</label>
				<input
					id="acceptTerms"
					type="checkbox"
					{...register('acceptTerms')}
					className={styles.checkbox}
				/>
				{errors.acceptTerms && <p className={styles.errorMessage}>{errors.acceptTerms.message}</p>}
			</div>

			<div className={styles.formGroup}>
				<label htmlFor="picture" className={styles.label}>
					Upload Picture:
				</label>
				<input
					id="picture"
					type="file"
					accept=".jpeg,.jpg,.png"
					{...register('picture')}
					className={styles.fileInput}
				/>
				{errors.picture && <p className={styles.errorMessage}>{errors.picture.message}</p>}
			</div>

			<div className={styles.formGroup}>
				<label htmlFor="country" className={styles.label}>
					Country:
				</label>
				<input
					type="text"
					id="country"
					list="country-list"
					{...register('country')}
					className={styles.input}
				/>
				<datalist id="country-list">
					{countries.map((country) => (
						<option key={country}>{country}</option>
					))}
				</datalist>
				{errors.country && <p className={styles.errorMessage}>{errors.country.message}</p>}
			</div>

			<button type="submit" className={styles.button} disabled={!isValid}>
				Submit
			</button>
		</form>
	);
};

export default FormControlled;
