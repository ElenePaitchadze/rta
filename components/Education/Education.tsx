'use client';

import { useState } from 'react';
import styles from './education.module.css';

export default function EducationAccordeion({ education }: { education: any[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className={styles.hospitalList}>
      {education.map(edu => {
        const isOpen = openId === edu.education_id;

        return (
          <div key={edu.education_id} className={styles.hospitalItem}>
            <button
              className={`${styles.hospitalName} ${isOpen ? styles.active : ''}`}
              onClick={() =>
                setOpenId(isOpen ? null : edu.education_id)
              }>
              {edu.name}
            </button>
            {isOpen && (
              <div className={styles.hospitalDetails}>
                <p><b>მისამართი:</b> {edu.address}</p>
                <p><b>საკონტაქტო:</b> {edu.contact_info}</p>
                <p><b>SID:</b> {edu.sid}</p>
                <p><b>კურსი:</b> {edu.course}</p>
                <p><b>თარიღი:</b> {edu.date_valid}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
