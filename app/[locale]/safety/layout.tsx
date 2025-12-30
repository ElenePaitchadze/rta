import menu from '@/app/api/menu';
import MenuItem from '@/Interfaces/MenuItemsProps';
import SafetySideNav from '@/components/SafetySideNavbar/SafetySideNav';

export default async function SafetyLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string }
}>) {

  const menuItems: MenuItem[] = await menu();
  const safetySide: MenuItem[] = menuItems.filter((item) => item.cat_id == '478');
  const safetySideNav: MenuItem[] = safetySide[0].children;

  return (
  <section className='innerPageContainer'>
    <div className='innerPageContent'>
      <p>{ locale === 'ge' ? 'სარკინიგზო უსაფრთხოება' : 'RAILWAY SAFETY' }</p>
      <div className='innerPage'>
        <SafetySideNav 
          destination='/safety'
          items={safetySideNav} 
          params={{locale: locale}}/>
        {children}
      </div>
    </div>
  </section>
  )
}