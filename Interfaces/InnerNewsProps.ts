import NewsProps from "./NewsProps";

export default interface InnerNewsProps {
  rec_id: string,
  slug: string,
  title: string,
  intro: string, 
  text: string,
  lang: string,
  img: string,
  gallery: { img: string }[],
  date: string,
  video?: string,
  similar_news: NewsProps[],
}