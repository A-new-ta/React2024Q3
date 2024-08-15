import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';
import styles from './MainPage.module.css';
import { clearNewFlag } from '../../store/formSlice.ts';

const MainPage = () => {
	const dispatch = useDispatch();
	const formsData = useSelector((state: RootState) => state.form.formsData) || [];

	useEffect(() => {
		const timer = setTimeout(() => {
			dispatch(clearNewFlag());
		}, 5000);
		return () => clearTimeout(timer);
	}, [dispatch]);

	return (
		<div className={styles.mainContainer}>
			<h1>Main Page</h1>
			<div className={styles.navLinks}>
				<NavLink to="/uncontrolled-form" className={styles.navLink}>
					Uncontrolled Form
				</NavLink>
				<NavLink to="/controlled-form" className={styles.navLink}>
					Controlled Form
				</NavLink>
			</div>

			{formsData.length === 0 ? (
				<p>No data has been submitted yet</p>
			) : (
				<div className={styles.tilesContainer}>
					{formsData.map((data, index) => (
						<div key={index} className={`${styles.tile} ${data.isNew ? styles.newData : ''}`}>
							{data.picture && (
								<div className={styles.pictureContainer}>
									<img src={data.picture} alt="Submitted" className={styles.picture} />
								</div>
							)}
							<p>
								<strong>Name:</strong> {data.name}
							</p>
							<p>
								<strong>Age:</strong> {data.age}
							</p>
							<p>
								<strong>Email:</strong> {data.email}
							</p>
							<p>
								<strong>Gender:</strong> {data.gender}
							</p>
							<p>
								<strong>Country:</strong> {data.country}
							</p>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default MainPage;
