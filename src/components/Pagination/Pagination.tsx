import React from 'react';
import './Pagination.css';
interface PaginationProps {
	currentPage: number;
	onPageChange: (page: number) => void;
	totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
	const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
	const handleClick = (page: number) => {
		onPageChange(page);
	};
	return (
		<div className="pagination">
			{pages.map((page) => (
				<button
					key={page}
					className={page === currentPage ? 'active' : ''}
					onClick={() => handleClick(page)}
				>
					{page}
				</button>
			))}
		</div>
	);
};

export default Pagination;
