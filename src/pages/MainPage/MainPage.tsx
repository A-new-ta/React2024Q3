import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';
import styles from './MainPage.module.css';

const MainPage = () => {
	const formsData = useSelector((state: RootState) => state.form.formsData) || [];

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
							<div className={styles.tileTitle}>Submitted Data {index + 1}</div>
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
