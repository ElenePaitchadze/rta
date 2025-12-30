async function getMenu() {
  try {
    const res = await fetch('https://admin.rta.gov.ge/api/site_menu.php', {
      cache: 'no-cache',
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching menu:', error);
    throw error;
  }
}
const getMenuItems = (menu) => {
  const menuItems = [];
  const traverseMenu = (items, parentItem = null) => {
    const sortedItems = Object.values(items).sort((a, b) => a.cat_left - b.cat_left);
    for (const item of sortedItems) {
      const { cat_id, name, slug, children, structure, cat_left } = item;
      const menuItem = {
        cat_id,
        name,
        slug,
        structure,
        cat_left,
        children: [],
      };
      if (parentItem) {
        parentItem.children.push(menuItem);
      } else {
        menuItems.push(menuItem);
      }
      if (children) {
        traverseMenu(children, menuItem);
      }
    }
  };
  traverseMenu(menu);
  return menuItems;
};

export default async function menu() {
  try {
    const { data } = await getMenu();
    const menuData = getMenuItems(data);
    return menuData;
  } catch (error) {
    console.error('Error fetching menu:', error);
    return [];
  }
}