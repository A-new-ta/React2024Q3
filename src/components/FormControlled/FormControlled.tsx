import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { submitForm } from '../../store/formSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { validationSchema } from '../../helpers/validationSchema';
import { FormData } from '../../types/types';
import Autocomplete from '../Autocomplete/Autocomplete.tsx';
import styles from './FormControlled.module.css';

const FormControlled = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		setValue,
		control,
		formState: { errors },
	} = useForm<FormData>({
		resolver: yupResolver(validationSchema),
	});

	const onSubmit = (data: FormData) => {
		dispatch(submitForm(data));
		navigate('/');
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setValue('picture', reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

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
					accept="image/png, image/jpeg"
					onChange={handleFileChange}
					className={styles.fileInput}
				/>
				{errors.picture && <p className={styles.errorMessage}>{errors.picture.message}</p>}
			</div>

			<div className={styles.formGroup}>
				<label htmlFor="country" className={styles.label}>
					Country:
				</label>
				<Controller
					name="country"
					control={control}
					render={({ field }) => <Autocomplete value={field.value} onChange={field.onChange} />}
				/>
				{/*<input id="country" {...register('country')} className={styles.input} />*/}
				{errors.country && <p className={styles.errorMessage}>{errors.country.message}</p>}
			</div>

			<button type="submit" className={styles.button}>
				Submit
			</button>
		</form>
	);
};

export default FormControlled;
