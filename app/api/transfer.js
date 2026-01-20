export default async function transfer() {
  try {
    const res = await fetch(`https://rta.gov.ge/api/transfer.php`, {
      cache: 'no-cache'
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching transfer PDFs:', error);
    return null;
  }
}
  