import styles from './adapt.module.css';
import { useEffect, useState } from 'react';

export default function AdaptComponent({ params: { locale }}: { params: { locale: string }}) {
  // for translation
  const [selectedContrast, setSelectedContrast] = useState('contrast1');
  const initialFontSizeMultiplier = 1;
  const [increaseCounter, setIncreaseCounter] = useState(0);
  const [decreaseCounter, setDecreaseCounter] = useState(0);
  const maxClicks = 3; // Maximum allowed clicks for "minus" or "plus" buttons

  function updateColors(contrast: string) {
    let backgroundColor, textColor, textColorOne;
  
    switch (contrast) {
      case 'contrast1':
        backgroundColor = '#ffffff';
        textColor = '#000000';
        textColorOne = '#ffffff';
        break;
      case 'contrast2':
        backgroundColor = '#000000';
        textColor = '#ffffff';
        textColorOne = '#000000';
        break;
      case 'contrast3':
        backgroundColor = '#000000';
        textColor = '#0EACA7';
        textColorOne = '#0EACA7';
        break
      case 'contrast4':
        backgroundColor = '#0EACA7';
        textColor = '#000000';
        textColorOne = '#0EACA7';
        break
      default:
        backgroundColor = '#ffffff';
        textColor = '#000000';
        textColorOne = '#ffffff';
    }
  
    document.documentElement.style.setProperty('--background-color', backgroundColor);
    document.documentElement.style.setProperty('--text-color', textColor);
    document.documentElement.style.setProperty('--text-color-1', textColorOne);
  }

  useEffect(() => {
    updateColors(selectedContrast);
  }, [selectedContrast]);


  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1);

  useEffect(() => {
    updateFontSizes(fontSizeMultiplier);
  }, [fontSizeMultiplier]);

  const updateFontSizes = (multiplier: number) => {
    const root = document.documentElement;
    root.style.setProperty('--font-size-multiplier', multiplier.toString());
  };

  const handleIncrease = () => {
    if (increaseCounter < maxClicks) {
      setFontSizeMultiplier(fontSizeMultiplier + 0.1);
      setIncreaseCounter(increaseCounter + 1);
    }
  };

  const handleDecrease = () => {
    if (decreaseCounter < maxClicks) {
      setFontSizeMultiplier(fontSizeMultiplier - 0.1);
      setDecreaseCounter(decreaseCounter + 1);
    }
  };

  const handleRestart = () => {
    setFontSizeMultiplier(initialFontSizeMultiplier);
    setIncreaseCounter(0);
    setDecreaseCounter(0);
  };

  return (
    <>
      <div className={styles.contrastContainer}>
        <p className={styles.contrastHeading}>{locale === 'ge' ? 'კონტრასტი' : 'CONTRAST'}</p>
        <div className={styles.contrasts}>
          <div 
            className={`${styles.contrast1} ${styles.contrast}`}
            onClick={() => setSelectedContrast('contrast1')}>
            <div></div>
          </div>
          <div 
            className={`${styles.contrast2} ${styles.contrast}`}
            onClick={() => setSelectedContrast('contrast2')}>
            <div></div>
          </div>
          <div 
            className={`${styles.contrast3} ${styles.contrast}`}
            onClick={() => setSelectedContrast('contrast3')}>
            <div></div>
          </div>
          <div 
            className={`${styles.contrast4} ${styles.contrast}`}
            onClick={() => setSelectedContrast('contrast4')}>
            <div></div>
          </div>
        </div>
      </div>
      <div className={styles.fonts}>
        <div>
          <p className={styles.fontHeading}>{locale === 'ge' ? 'ფონტი' : 'FONT'}</p>
          <p className={styles.restart} onClick={handleRestart}>{locale === 'ge' ? 'საწყისი' : 'RESTART'}</p>
        </div>
        <div className={styles.fontButtons}>
          <div className={styles.minus}>
            <p>{locale === 'ge' ? 'მინუსი' : 'MINUS'}</p>
            <div onClick={handleDecrease}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 13">
                <path d="M17.16,10.66a6.5,6.5,0,1,0,6.5,6.5A6.5,6.5,0,0,0,17.16,10.66ZM19.6,17.769H14.722a.609.609,0,0,1,0-1.219H19.6a.609.609,0,0,1,0,1.219Z" transform="translate(-10.66 -10.66)" fill="#0eaca7"/>
              </svg>
            </div>
          </div>
          <div className={styles.plus}>
            <p>{locale === 'ge' ? 'პლიუსი' : 'PLUS'}</p>
            <div onClick={handleIncrease}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
                <g>
                  <path d="M12,6A6,6,0,1,1,6,0a6,6,0,0,1,6,6ZM6.375,3.375a.375.375,0,1,0-.75,0v2.25H3.375a.375.375,0,1,0,0,.75h2.25v2.25a.375.375,0,1,0,.75,0V6.375h2.25a.375.375,0,1,0,0-.75H6.375Z" fill="#0eaca7"/>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}