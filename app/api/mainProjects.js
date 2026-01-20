export default async function mainProjects() {
  const res = await fetch('https://rta.gov.ge/api/projects.php', { cache: 'no-cache' });
  return res.json();
}
