import MenuItems from "@/Interfaces/MenuItemsProps";
import menu from "@/app/api/menu";

export const getContentID = async (
  parentSlug: string, 
  childSlug: string, 
  grandchildSlug?: string
): Promise<string> => {
  try {
    const menuItems: MenuItems[] = await menu();
    
    if (menuItems.length === 0) {
      console.error('Failed to fetch menu items');
      throw new Error('No menu items found');
    }

    const parent = menuItems.find((item: MenuItems) => item.slug === parentSlug);
    if (!parent?.children) {
      throw new Error(`Parent with slug ${parentSlug} not found or has no children`);
    }

    const child = parent.children.find((item: MenuItems) => item.slug === childSlug);
    
    if (!grandchildSlug) {
      return child?.structure || '';
    }
    
    if (child?.children) {
      const grandchild = child.children.find((item: MenuItems) => item.slug.toLowerCase() === grandchildSlug);
      return grandchild?.structure || '';
    }

    return '';
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return '';
  }
};