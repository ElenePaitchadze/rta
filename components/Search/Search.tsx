'use client';
import styles from './search.module.css';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormEvent } from "react";

export default function Search() {
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchValue.trim() !== '') {
      router.push(`/search?query=${searchValue}`);
    }
  };

  const handleImageClick = () => {
    if (searchValue.trim() !== '') {
      router.push(`/search?query=${searchValue}`);
    }
  };
  return (
    <form 
      onSubmit={handleSearch} 
      className={styles.form}>
      <input 
        type="text" 
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className={styles.input} />
      <svg onClick={handleImageClick} xmlns="http://www.w3.org/2000/svg" width="21.097" height="21.096" viewBox="0 0 21.097 21.096">
        <g transform="translate(-1122.903 -14)">
          <path d="M23.223,23.222a1.319,1.319,0,0,1,1.866,0L30.165,28.3A1.319,1.319,0,0,1,28.3,30.164l-5.076-5.076a1.319,1.319,0,0,1,0-1.866Z" transform="translate(1113.448 4.547)" />
          <path d="M8.57,15.822A7.252,7.252,0,1,0,1.319,8.57,7.252,7.252,0,0,0,8.57,15.822Zm8.57-7.252A8.57,8.57,0,1,1,8.57,0a8.57,8.57,0,0,1,8.57,8.57Z" transform="translate(1122.903 14)" />
        </g>
      </svg>
    </form>
  )
}