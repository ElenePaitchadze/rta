import SafetySideNav from '@/components/SafetySideNavbar/SafetySideNav';
import menu from '@/app/api/menu';
import MenuItem from '@/Interfaces/MenuItemsProps';

export default async function SafetyLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string }
}>) {

  const menuItems: MenuItem[] = await menu();
  const transferSide: MenuItem[] = menuItems.filter((item) => item.cat_id == '479');
  const transferSideNav: MenuItem[] = transferSide[0].children;

  return (
  <section className='innerPageContainer'>
    <div className='innerPageContent'>
      <p>{ locale === 'ge' ? 'სამგზავრო გადაყვანები' : 'PASSANGER TRANSFERS'}</p>
      <div className='innerPage'>
        <SafetySideNav 
          destination='/transfer'
          items={transferSideNav} 
          params={{locale: locale}}/>
        {children}
      </div>
    </div>
  </section>
  )
}