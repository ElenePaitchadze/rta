'use client';
import { FC } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './pagination.module.css';
import { useTranslation } from 'react-i18next';
import PaginationControlsProps from '@/Interfaces/PaginationControlProps';

const PaginationControls: FC<PaginationControlsProps> = ({
  length,
  hasNextPage,
  hasPrevPage,
  destination,
  perPage,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') ?? '1');
  const totalPages = Math.ceil(length / perPage);

  const goToPage = (pageNumber: number) => {
    const updatedSearchParams = new URLSearchParams(searchParams.toString());
    updatedSearchParams.set('page', pageNumber.toString());
    router.push(`${destination}/?${updatedSearchParams.toString()}`);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPages = Math.min(totalPages, 5); // Show at most 5 page numbers
  
    // Determine the range of page numbers to display
    let startPage = Math.max(1, page - 2);
    let endPage = startPage + maxPages - 1;
  
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = endPage - maxPages + 1;
    }
  
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`${styles.paginationBtn} ${i === page ? `${styles.active}` : ''}`}
          onClick={() => goToPage(i)}
        >
          {i}
        </button>
      );
    }
  
    return pageNumbers;
  };

  return (
    <div className={styles.pagination}>
      <button
        className={styles.paginationBtn}
        disabled={!hasPrevPage}
        onClick={() => goToPage(page - 1)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="25.385" height="25.385" viewBox="0 0 25.385 25.385">
          <g transform="translate(0 25.385) rotate(-90)">
            <g>
              <path d="M25.385,12.692A12.692,12.692,0,1,0,12.692,25.385,12.692,12.692,0,0,0,25.385,12.692Zm-11.9,5.553a.793.793,0,0,1-1.587,0V9.054l-3.4,3.406a.794.794,0,1,1-1.123-1.123l4.76-4.76a.793.793,0,0,1,1.123,0l4.76,4.76a.794.794,0,1,1-1.123,1.123l-3.4-3.406Z" />
            </g>
          </g>
        </svg>
      </button>
      {renderPageNumbers()}
      <button
        className={styles.paginationBtn}
        disabled={!hasNextPage}
        onClick={() => goToPage(page + 1)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="25.385" height="25.385" viewBox="0 0 25.385 25.385">
          <g transform="translate(0 25.385) rotate(-90)">
            <g>
              <path d="M25.385,12.692A12.692,12.692,0,1,1,12.692,0,12.692,12.692,0,0,1,25.385,12.692Zm-11.9-5.553a.793.793,0,1,0-1.587,0V16.33l-3.4-3.406a.794.794,0,1,0-1.123,1.123l4.76,4.76a.793.793,0,0,0,1.123,0l4.76-4.76a.794.794,0,1,0-1.123-1.123l-3.4,3.406Z" />
            </g>
          </g>
        </svg>
      </button>
    </div>
  );
};

export default PaginationControls;