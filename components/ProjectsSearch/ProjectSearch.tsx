'use client';
import { useTranslation } from 'react-i18next';
import styles from './projectSearch.module.css';
import magnifyingGlass from '@/img/searchIcon.png';
import selectIcon from '@/img/selectIcon.png';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDebounce } from 'use-debounce';

export default function ProjectSearch({ search, projectStatus }: { search?: string; projectStatus?: string }) {
  const { t } = useTranslation();
  const router = useRouter();
  const [text, setText] = useState(search || ''); // Initialize with an empty string if search is undefined
  const [status, setStatus] = useState(projectStatus);
  const [query] = useDebounce(text, 750);
  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    const url = new URL('/info/projects', window.location.origin);
    if (query) {
      url.searchParams.set('search', query);
    } else {
      url.searchParams.delete('search');
    }

    if (status) {
      url.searchParams.set('projectStatus', status);
    } else {
      url.searchParams.delete('projectStatus');
    }

    router.push(url.toString());
  }, [query, status, router]);

  return (
    <>
      <div className={styles.search}>
        <input
          type="text"
          name="ProjectName"
          id="projectSearch"
          placeholder={t('search')}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Image src={magnifyingGlass} alt="magnifying glass" />
      </div>
      <div className={styles.select}>
        <select
          name="projectStatus"
          id="projectStatus"
          className={styles.chooseProject}
          value={status || ''}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">{t('allProjects')}</option>
          <option value="ongoing">{t('ongoing')}</option>
          <option value="finished">{t('finished')}</option>
        </select>
        <Image src={selectIcon} alt="select icon" />
      </div>
    </>
  );
}