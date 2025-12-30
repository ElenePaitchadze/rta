export default function NewsLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string }
}>) {
  return (
  <section className='innerPageContainer'>
    <div className='innerPageContent'>
      {/* <p>{locale === 'ge' ? 'სიახლეები' : 'NEWS'}</p> */}
      {children}
    </div>
  </section>
  );
}