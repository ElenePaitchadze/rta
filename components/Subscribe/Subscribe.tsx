import styles from './subscribe.module.css';

export default async function Subscribe({locale}: {locale: string}) {
  return (
    <div className={styles.subscribe}>
      <div className={styles.subscribeContent}>
        <p>{locale === 'ge' ? 'გამოიწერე სიახლეები' : 'SUBSCRIBE TO NEWS'}</p>
        <p>{locale === 'ge' ? 'მიიღე ყველა სიახლე სარკინიგზო ტრანსპორტის სააგენტოსგან':
                              'Get all the news from the Railway Transport Agency'}</p>
        <form action="">
          <input type="email" name="email" placeholder={locale === 'ge' ? 'ელ.ფოსტა' : 'Email'} />
          <button className={styles.subscribeBtn}>
            <span>{locale === 'ge' ? 'გაგზავნა' : 'SEND'}</span> 
            <svg xmlns="http://www.w3.org/2000/svg" width="14.011" height="12.01" viewBox="0 0 14.011 12.01">
              <path d="M0,12.01V7.35L10.008,6,0,4.66V0L14.011,6Z" fill="#fff"/>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}