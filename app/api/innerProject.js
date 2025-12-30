export default async function innerProject(rec_id) {
  const res = await fetch(`https://admin.rta.gov.ge/api/projects.php?rec_id=${rec_id}`, { cache: 'no-cache' });
  return res.json();
}
