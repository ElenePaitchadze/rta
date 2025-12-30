// import SideNav from "@/components/SideNavbar/SideNav";
import AboutSideNav from "@/components/AboutSideNav/aboutSideNav"
import menu from "@/app/api/menu";
import MenuItem from "@/Interfaces/MenuItemsProps";

export default async function AboutLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string }
}>) {

  const menuItems: MenuItem[] = await menu();
  const aboutSide: MenuItem[] = menuItems.filter((item) => item.cat_id == '500');
  const aboutSideNav: MenuItem[] = aboutSide[0].children;

  return (
  <section className='innerPageContainer'>
    <div className='innerPageContent'>
      <p>{locale === 'ge' ? 'ჩვენ შესახებ' : 'ABOUT US'}</p>
      <div className='innerPage'>
        <AboutSideNav 
          destination='/about'
          items={aboutSideNav} 
          params={{locale: locale}} />
        {children}
      </div>
    </div>
  </section>
  )
}