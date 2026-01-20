export default async function banner() {
  const res = await fetch('https://rta.gov.ge/api/banner_carusel.php', { cache: 'no-cache' });
  return res.json();
}