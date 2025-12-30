export default interface innerProjectProps {
  rec_id: string,
  slug?: string,
  title: string,
  status: string,
  intro?: string,
  text: string,
  lang: string,
  img: string
  gallery: { img: string }[],
  date: string,
  pdf: string, 
  pdf_title: string,
}