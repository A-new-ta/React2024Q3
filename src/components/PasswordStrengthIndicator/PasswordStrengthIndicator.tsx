import React, { useEffect, useState } from 'react';
import styles from './PasswordStrengthIndicator.module.css';

interface PasswordStrengthIndicatorProps {
	password: string;
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ password }) => {
	const [passwordStrength, setPasswordStrength] = useState<number>(0);
	const calculatePasswordStrength = (password: string) => {
		let strength = 0;
		if (password.length >= 10) strength += 1;
		if (/[A-Z]/.test(password)) strength += 1;
		if (/[a-z]/.test(password)) strength += 1;
		if (/[0-9]/.test(password)) strength += 1;
		if (/[!@#%^&*(),.?":{}|<>]/.test(password)) strength += 1;
		return strength;
	};

	useEffect(() => {
		setPasswordStrength(calculatePasswordStrength(password));
	}, [password]);

	return (
		<div className={styles.passwordStrengthIndicator}>
			<div>Password strength:</div>
			<div
				className={`${styles.strengthBar} ${passwordStrength >= 1 ? styles.strengthBarFull : ''}`}
			></div>
			<div
				className={`${styles.strengthBar} ${passwordStrength >= 2 ? styles.strengthBarFull : ''}`}
			></div>
			<div
				className={`${styles.strengthBar} ${passwordStrength >= 3 ? styles.strengthBarFull : ''}`}
			></div>
			<div
				className={`${styles.strengthBar} ${passwordStrength >= 4 ? styles.strengthBarFull : ''}`}
			></div>
			<div
				className={`${styles.strengthBar} ${passwordStrength >= 5 ? styles.strengthBarFull : ''}`}
			></div>
		</div>
	);
};

export default PasswordStrengthIndicator;
