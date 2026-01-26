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
                <p><b>მისამართი:</b> {hospital.address}</p>
                <p><b>კონტაქტი:</b> {hospital.contact_info}</p>

                <p><b>ექიმები:</b></p>
                <ul>
                  {hospital.doctors.map((doc: any) => (
                    <li key={doc.doctor_id}>
                      {doc.name} — <a href={`tel: ${doc.phone}`}>{doc.phone}</a>
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
