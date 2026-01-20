'use client';
import { useTranslation } from "react-i18next";
import styles from './contact.module.css';
import Image from "next/image";
import send from '@/img/sendCheck.png';
import email from '@/img/email.svg';
import phone from '@/img/phone.svg';
import { FormEvent } from "react";
import { useState, useRef } from "react";
import DataProtectionOfficer from "../DataProtection/DataProtectionOfficer";

export default function Contact() {
  const { t } = useTranslation();
  const emailMsg = t('emailMsg');
  const submitMsg = t('submitMsg');
  const failMsg = t('failMsg');
  const errorMsg = t('errorMsg')
  const [emailError, setEmailError] = useState<string | null>(null);
  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);

  const nameRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEmailError(null);
    setSubmissionStatus(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email')?.toString() || '';

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      setEmailError(emailMsg.toUpperCase());
      return;
    }

    try {
      const response = await fetch('https://rta.gov.ge/api/contact.php', {
        method: 'POST',
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
        body: formData,
      });

      if (response.ok) {
        console.log(submitMsg);
        setSubmissionStatus(submitMsg.toUpperCase());
        if (nameRef.current) nameRef.current.value = '';
        if (titleRef.current) titleRef.current.value = '';
        if (emailRef.current) emailRef.current.value = '';
        if (messageRef.current) messageRef.current.value = '';
      } else {
        console.error(failMsg);
        setSubmissionStatus(failMsg.toUpperCase());
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmissionStatus(errorMsg.toUpperCase());
    }
  };

  return (
    <section className={styles.contactContainer}>
      <div className={styles.contactContent}>
        <p className={styles.heading}>{t('contact')}</p>
        <div className={styles.contact}>
          <div className={styles.emails}>
            {/* <div className={styles.email}>            
              <Image src={email} alt='email icon' priority={true} />
              <a href="mailto:info@rta.gov.ge">info@rta.gov.ge</a>
            </div> */}
            <div className={styles.email}>            
              <Image src={email} alt='email icon' priority={true} />
              <a href="mailto:agency@rta.gov.ge">agency@rta.gov.ge</a>
            </div>
          </div>
          <div className={styles.address}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16.604" height="24.147" viewBox="0 0 16.604 24.147">
                <path d="M95.418,4.135A8.194,8.194,0,0,0,88.455,0c-.124,0-.248,0-.372,0a8.194,8.194,0,0,0-6.963,4.133,8.406,8.406,0,0,0-.11,8.306L87,23.4l.008.015a1.455,1.455,0,0,0,2.525,0l.008-.015,5.988-10.96a8.407,8.407,0,0,0-.11-8.306ZM88.27,10.941a3.4,3.4,0,1,1,3.4-3.4A3.4,3.4,0,0,1,88.27,10.941Z" transform="translate(-79.968 0)" />
              </svg>
              <span>{t('address2')}</span>
              <span>{t('street2')}</span>
              <span>{t('formerStreet')}</span>
            </div>
          <div className={styles.phone}>
            <Image src={phone} alt='phone icon' priority={true} />
            <a href="tel:032 2 47 02 10">032 2 47 02 10</a>
          </div>
          <div className={styles.socialMedia}>
            <p>{t('follow')}:</p>
            <div className={styles.mediaLinks}>
              <a href="https://www.facebook.com/profile.php?id=61556824572445" target='_blank'>
                <svg xmlns="http://www.w3.org/2000/svg" width="6.715" height="13.743" viewBox="0 0 6.715 13.743">
                  <path d="M1.714,13.743V7.295H0V4.973H1.714V2.989C1.714,1.431,2.727,0,5.06,0A14.239,14.239,0,0,1,6.7.09L6.648,2.258s-.712-.007-1.49-.007c-.841,0-.976.386-.976,1.026v1.7H6.715L6.6,7.295H4.182v6.449H1.714" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/rail-transport-agency-of-georgia/" target='_blank'>
                <svg xmlns="http://www.w3.org/2000/svg" width="13.055" height="12.477" viewBox="0 0 13.055 12.477">
                  <path d="M2.966,4.523v8.423H.161V4.523h2.8Zm.178-2.6a1.346,1.346,0,0,1-.429,1.037,1.6,1.6,0,0,1-1.151.417H1.547A1.534,1.534,0,0,1,.425,2.959,1.392,1.392,0,0,1,0,1.922,1.369,1.369,0,0,1,.438.881,1.6,1.6,0,0,1,1.581.469a1.554,1.554,0,0,1,1.13.412,1.418,1.418,0,0,1,.434,1.041Zm9.91,6.2v4.828h-2.8v-4.5a2.458,2.458,0,0,0-.344-1.4,1.21,1.21,0,0,0-1.075-.506,1.376,1.376,0,0,0-.9.293,1.808,1.808,0,0,0-.54.727,2.053,2.053,0,0,0-.094.688v4.7h-2.8q.017-3.391.017-5.5T4.522,4.931l-.008-.408h2.8V5.747H7.293a3.721,3.721,0,0,1,.349-.476,3.608,3.608,0,0,1,.48-.442,2.212,2.212,0,0,1,.739-.37,3.346,3.346,0,0,1,.973-.131,3.018,3.018,0,0,1,2.337.965,4.049,4.049,0,0,1,.884,2.826Z" transform="translate(0 -0.469)" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        {/* <div className={styles.officersInfo}>
          <DataProtectionOfficer />
        </div> */}
        <div className={styles.contactForm}>
          <p>{t('sendMsg')}</p>
          <form  onSubmit={handleSubmit}>
            <div className={styles.formGroup1}>
              <div className={styles.formGroup}>
                <label id='name'>{t('name')}</label>
                <input type="text" name="name" placeholder={t('specifyName')} ref={nameRef} />
              </div>
              <div className={styles.formGroup}>
                <label id="title">{t('title')}</label>
                <input type="text" name="title" placeholder={t('specifyTitle')} ref={titleRef} />
              </div>
              <div className={styles.formGroup}>
                <label id="email">{t('email')}</label>
                <input type="email" name="email" placeholder={t('specifyEmail')} ref={emailRef} />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label id="message">{t('message')}</label>
              <textarea name="message" placeholder={t('writeMessage')} ref={messageRef} />
            </div>
            {emailError && <p className={styles.error}>{emailError}</p>}
            {submissionStatus && <p className={styles.status}>{submissionStatus}</p>}
            <button className={styles.submitForm}>
              <span>{t('sendForm')}</span>
              <Image src={send} alt='send icon' priority={true} />
            </button>
          </form>
        </div>
        {/* <div className={styles.contact}>
          <div className={styles.addresses}> 
            <div className={styles.address}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16.604" height="24.147" viewBox="0 0 16.604 24.147">
                <path d="M95.418,4.135A8.194,8.194,0,0,0,88.455,0c-.124,0-.248,0-.372,0a8.194,8.194,0,0,0-6.963,4.133,8.406,8.406,0,0,0-.11,8.306L87,23.4l.008.015a1.455,1.455,0,0,0,2.525,0l.008-.015,5.988-10.96a8.407,8.407,0,0,0-.11-8.306ZM88.27,10.941a3.4,3.4,0,1,1,3.4-3.4A3.4,3.4,0,0,1,88.27,10.941Z" transform="translate(-79.968 0)" />
              </svg>
              <span>{t('address1')}</span>
              <span>{t('street1')}</span>
            </div>
            <div className={styles.address}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16.604" height="24.147" viewBox="0 0 16.604 24.147">
                <path d="M95.418,4.135A8.194,8.194,0,0,0,88.455,0c-.124,0-.248,0-.372,0a8.194,8.194,0,0,0-6.963,4.133,8.406,8.406,0,0,0-.11,8.306L87,23.4l.008.015a1.455,1.455,0,0,0,2.525,0l.008-.015,5.988-10.96a8.407,8.407,0,0,0-.11-8.306ZM88.27,10.941a3.4,3.4,0,1,1,3.4-3.4A3.4,3.4,0,0,1,88.27,10.941Z" transform="translate(-79.968 0)" />
              </svg>
              <span>{t('address2')}</span>
              <span>{t('street2')}</span>
            </div>
          </div>
        </div>
        */}
        {/* <div className={styles.map}>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d372.25051766149267!2d44.73505679169614!3d41.720429482649315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x404473dc26e90715%3A0xfdce6bff30b97ea2!2z4YOh4YOQ4YOg4YOZ4YOY4YOc4YOY4YOS4YOW4YOdIOGDouGDoOGDkOGDnOGDoeGDnuGDneGDoOGDouGDmOGDoSDhg6Hhg5Dhg5Dhg5Lhg5Thg5zhg6Lhg50!5e0!3m2!1sen!2sge!4v1715844744760!5m2!1sen!2sge" width="100%" height="226" loading="lazy"></iframe>
        </div> */}
      </div>
    </section>
  );
}