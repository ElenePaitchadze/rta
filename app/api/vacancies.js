export default async function vacancies() {
  const res = await fetch(`https://rta.gov.ge/api/vacancies.php`, { cache: 'no-cache' });
  return res.json();
}