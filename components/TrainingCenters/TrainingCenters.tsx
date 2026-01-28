'use client';

import { useState } from 'react';
import styles from './training.module.css';

export default function TrainingCenters({ centers }: { centers: any[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className={styles.centerList}>
      {centers.map(center => {
        const isOpen = openId === center.center_id;

        return (
          <div key={center.education_id} className={styles.centerItem}>
            <button
              className={`${styles.centerName} ${isOpen ? styles.active : ''}`}
              onClick={() =>
                setOpenId(isOpen ? null : center.center_id)
              }>
              {center.name}
            </button>
            {isOpen && (
              <div className={styles.centerDetails}>
                <p><b>მისამართი:</b> {center.address}</p>
                <p><b>საიდენტიფიკაციო კოდი:</b> {center.sid}</p>
                <p><b>პროგრამის დასახელება:</b> {center.course}</p>
                <p><b>ძალაშია:</b> {center.date_valid}</p>
                <p><b>საკონტაქტო:</b> {center.contact_info}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
