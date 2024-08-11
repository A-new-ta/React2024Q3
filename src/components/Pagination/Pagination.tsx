'use client';

import React from 'react';
import styles from './Pagination.module.css';
import { useTheme } from '../../context/ThemeContext.tsx';
interface PaginationProps {
	currentPage: number;
	onPageChange: (page: number) => void;
	totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
	const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
	const { theme } = useTheme();
	const handleClick = (page: number) => {
		onPageChange(page);
	};
	return (
		<div
			className={`${styles.pagination} ${theme === 'dark' ? styles.themeDark : styles.themeLight}`}
		>
			{pages.map((page) => (
				<button
					key={page}
					className={`${styles.button} ${page === currentPage ? styles.active : ''}`}
					onClick={() => handleClick(page)}
				>
					{page}
				</button>
			))}
		</div>
	);
};

export default Pagination;
