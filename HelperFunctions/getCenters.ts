export default async function getCenters() {
  try {
    const res = await fetch(
      'https://etds.rta.gov.ge/index.php?route=api/education',
      { cache: 'no-store' }
    );

    if (!res.ok) {
      console.error('Failed to fetch hospitals:', res.status);
      return [];
    }

    const data = await res.json();

    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Hospital fetch error:', error);
    return [];
  }
}