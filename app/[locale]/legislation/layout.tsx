import LegislationSideNav from '@/components/LegislationSideNav/LegislationSideNav';
import menu from '@/app/api/menu';
import MenuItem from '@/Interfaces/MenuItemsProps';

export default async function LegislationLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string }
}>) {

  const menuItems: MenuItem[] = await menu();
  const legislationSide: MenuItem[] = menuItems.filter((item) => item.cat_id == '496');
  const legislationSideNav: MenuItem[] = legislationSide[0].children;

  return (
  <section className='innerPageContainer'>
    <div className='innerPageContent'>
      <p>{locale === 'ge' ? 'კანონმდებლობა' : 'LEGISLATION'}</p>
      <div className='innerPage'>
          <LegislationSideNav 
            destination='/legislation'
            items={legislationSideNav} 
            params={{locale: locale}} />
          {children}
      </div>
    </div>
  </section>
  );
}