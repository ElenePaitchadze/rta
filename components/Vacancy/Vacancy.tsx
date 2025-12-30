'use client';
import { useState } from 'react';
import styles from './vacancy.module.css';

export default function Vacancy({ title, description }: { title: string, description: string }) {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);

  const toggleDescriptionVisibility = () => {
    setIsDescriptionVisible(!isDescriptionVisible);
  };

  return (
    <div>
      <div className={styles.vacancy}>
        <div className={!isDescriptionVisible ? styles.vacancyTitle : `${styles.vacancyTitle} ${styles.vacancyTitle1}`}>
          <p>{title}</p>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20.599"
          height="20.599"
          viewBox="0 0 20.599 20.599"
          onClick={toggleDescriptionVisibility}
          className={isDescriptionVisible ? styles.rotateIcon : ''}
        >
          <g>
            <path d="M20.6,10.3A10.3,10.3,0,1,1,10.3,0,10.3,10.3,0,0,1,20.6,10.3ZM10.943,5.793a.644.644,0,1,0-1.287,0v7.458L6.893,10.487a.645.645,0,1,0-.911.911l3.862,3.862a.644.644,0,0,0,.911,0L14.617,11.4a.645.645,0,1,0-.912-.912l-2.763,2.764Z" />
          </g>
        </svg>
      </div>
      <div
          className={`${styles.vacancyDescription} ${isDescriptionVisible ? styles.visible : ''}`}
          dangerouslySetInnerHTML={{
            __html: description
          }}
        />
    </div>
  );
}