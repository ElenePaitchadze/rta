import styles from './testing.module.css';

export default function TestingComponent({ params: { locale }}: { params: { locale: string }}) {
  return (
    <div className={styles.testing}>
      {locale === 'ge' ? 'ვებგვერდი მუშაობს სატესტო რეჟიმში' : 'The website is working in test mode'}
    </div>
  );
}