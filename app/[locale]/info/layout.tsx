import SafetySideNav from '@/components/SafetySideNavbar/SafetySideNav';
import menu from '@/app/api/menu';
import MenuItem from '@/Interfaces/MenuItemsProps';

export default async function InfoLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string }
}>) {

  const menuItems: MenuItem[] = await menu();
  const infoSide: MenuItem[] = menuItems.filter((item) => item.cat_id == '480');
  const infoSideNav: MenuItem[] = infoSide[0].children;

  return (
  <section className='innerPageContainer'>
    <div className='innerPageContent'>
      <p>{ locale === 'ge' ? 'საჯარო ინფორმაცია' : 'PUBLIC INFORMATION'}</p>
      <div className='innerPage'>
        <SafetySideNav 
          destination='/info'
          items={infoSideNav} 
          params={{locale: locale}}/>
        {children}
      </div>
    </div>
  </section>
  )
}