'use client';
import styles from './dateRangeSelect.module.css';
import { useState, useEffect, useRef } from 'react';
import { DateRange } from 'react-date-range';
import format from 'date-fns/format';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useRouter } from 'next/navigation';
import { useDebounce } from 'use-debounce';
import { useTranslation } from 'react-i18next';

export default function DateRangeSelect() {
  const { t } = useTranslation();
  const router = useRouter();
  const [range, setRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: 'selection',
    },
  ]);
  const [open, setOpen] = useState(false);
  const refOne = useRef(null);
  const [debouncedRange] = useDebounce(range, 500); // Debounce the range state

  useEffect(() => {
    document.addEventListener('click', hideOnClickOutside, true);
    return () => {
      document.removeEventListener('click', hideOnClickOutside, true);
    };
  }, []);

  useEffect(() => {
    if (debouncedRange[0].startDate && debouncedRange[0].endDate) {
      const { startDate, endDate } = debouncedRange[0]; // Use the debounced range
      const startDateString = format(startDate, 'yyyy-MM-dd');
      const endDateString = format(endDate, 'yyyy-MM-dd');
      const query = `?startDate=${startDateString}&endDate=${endDateString}`;
      router.push(`news/${query}`, undefined, { shallow: true });
    }
  }, [debouncedRange, router]); // Update when debouncedRange changes

  const handleCalendar = () => {
    setOpen(!open);
  };

  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  const inputValue =
    range[0].startDate && range[0].endDate
      ? `${format(range[0].startDate, 'dd/MM/yyyy')}:${format(
          range[0].endDate,
          'dd/MM/yyyy'
        )}`
      : '';

  return (
    <div className={styles.calendarWrap}>
      <div className={styles.inputContainer}>
      <input
        type="text"
        value={inputValue}
        readOnly
        className={styles.inputBox}
        onClick={handleCalendar}
        placeholder={t('chooseDate')}
      />
      <svg xmlns="http://www.w3.org/2000/svg" width="13.068" height="14.186" viewBox="0 0 10.068 11.186">
        <path d="M26.8,17.119h4.474V16H32.39v1.119h.559a1.119,1.119,0,0,1,1.119,1.119v7.83a1.119,1.119,0,0,1-1.119,1.119h-7.83A1.119,1.119,0,0,1,24,26.068v-7.83a1.119,1.119,0,0,1,1.119-1.119h.559V16H26.8Zm-1.678,2.237v6.712h7.83V19.356Zm1.119,1.678h1.119v1.119H26.237Zm2.237,0h1.119v1.119H28.474Zm2.237,0H31.83v1.119H30.712Zm0,2.237H31.83V24.39H30.712Zm-2.237,0h1.119V24.39H28.474Zm-2.237,0h1.119V24.39H26.237Z" transform="translate(-24 -16)"></path>
      </svg>
      </div>
      <div ref={refOne}>
        {open && (
          <DateRange
            onChange={(item) => setRange([item.selection])}
            editableDataInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={1}
            direction="horizontal"
            className={styles.calendarElement}
          />
        )}
      </div>
    </div>
  );
}