import { StaticImageData } from "next/image";

export default interface NewsProps {
  rec_id: string, 
  slug: string,
  menu_name: string,
  menu_id: string,
  title: string,
  intro: string,
  text: string,
  lang: string,
  img: string | undefined,
  thumb_img?: string,
  date: string,
}