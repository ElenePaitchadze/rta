import Image from "next/image";
import Link from "next/link";
import Links from "@/Interfaces/Links";
import styles from './LinkPreview.module.css';

export default function PreviewLinks({icon, text, href, target}: Links) {
  return (
    <Link className={styles.previewLink} href={href} target={target}>
      <Image src={icon} alt="icon"></Image>
      <p className={styles.text}>{text}</p>
    </Link>
  );
}