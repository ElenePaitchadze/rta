export default async function innerNews(rec_id) {
  const res = await fetch(`https://admin.rta.gov.ge/api/news.php?rec_id=${rec_id}`, { cache: 'no-cache' });
  return res.json();
}
