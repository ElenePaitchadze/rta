export async function newSafety() {
  try {
    const res = await fetch(`https://rta.gov.ge/api/new_safety.php`, {
      cache: 'no-cache'
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching safety information:', error);
    return null;
  }
}

export async function newTransfer() {
  try {
    const res = await fetch(`https://rta.gov.ge/api/new_transfer.php`, {
      cache: 'no-cache'
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching transfer information:', error);
    return null;
  }
}

export async function newInfo() {
  try {
    const res = await fetch(`https://rta.gov.ge/api/public_information.php`, {
      cache: 'no-cache'
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching public information:', error);
    return null;
  }
}
  