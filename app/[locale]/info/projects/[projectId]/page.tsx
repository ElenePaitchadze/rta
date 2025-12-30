import ProjectDetails from "@/components/ProjectDetails/ProjectDetails"
import TranslationsProvider from '@/components/TranslationsProvider';
import initTranslations from '@/app/i18n';
import innerProjectProps from "@/Interfaces/InnerProjectProps";
import innerProject from '@/app/api/innerProject';

export default async function ProjectPage(
  { params: { locale, projectId }}: 
  { params: { locale: string, projectId: string }}) {
  
  // get inner project data from api call and filter it based on language
  const apiData: innerProjectProps[] = await innerProject(projectId);
  let projectDetails: innerProjectProps[] = [];
  const languageCode = locale === 'ge' ? 'geo' : 'eng';
  projectDetails = apiData.filter((item) => item.lang === languageCode);

  // for translation
  const { t, resources } = await initTranslations(locale, ['dictionary']);

  return (
    <TranslationsProvider resources={resources} locale={locale} namespaces={['dictionary']}>
      <ProjectDetails 
        rec_id={projectDetails[0].rec_id}
        img={projectDetails[0].img}
        title={projectDetails[0].title}
        text={projectDetails[0].text}
        pdf={projectDetails[0].pdf} 
        pdf_title={projectDetails[0].pdf_title}
        gallery={projectDetails[0].gallery}/>
    </TranslationsProvider>
  )
}