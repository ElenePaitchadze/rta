export default async function aboutUs(contentId) {
  try {
    const res = await fetch(`https://rta.gov.ge/api/content.php?content_id=${contentId}`, { 
      cache: 'no-cache' 
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching content page's data:", error);
    return null;
  }
}
