'use client';

import { useState } from 'react';
import styles from './hospitals.module.css';

export default function HospitalAccordion({ hospitals }: { hospitals: any[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className={styles.hospitalList}>
      {hospitals.map(hospital => {
        const isOpen = openId === hospital.hospital_id;

        return (
          <div key={hospital.hospital_id} className={styles.hospitalItem}>
            <button
              className={`${styles.hospitalName} ${isOpen ? styles.active : ''}`}
              onClick={() =>
                setOpenId(isOpen ? null : hospital.hospital_id)
              }>
              {hospital.name}
            </button>
            {isOpen && (
              <div className={styles.hospitalDetails}>
                <p><strong>მისამართი:</strong> {hospital.address}</p>
                <p><strong>კონტაქტი:</strong> {hospital.contact}</p>

                <p><strong>ექიმები:</strong></p>
                <ul>
                  {hospital.doctors.map((doc: any) => (
                    <li key={doc.doctor_id}>
                      {doc.name} — {doc.phone}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
