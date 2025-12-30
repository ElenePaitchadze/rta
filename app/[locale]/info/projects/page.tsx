import TranslationsProvider from '@/components/TranslationsProvider';
import initTranslations from '@/app/i18n';
import ProjectSearch from '@/components/ProjectsSearch/ProjectSearch';
import styles from './page.module.css';
import selectIcon from '@/img/selectIcon.png';
import Image from 'next/image';
import ProjectProps from '@/Interfaces/ProjectProps';
import ProjectCard from '@/components/ProjectCard/ProjectCard';
import PaginationControls from '@/components/Pagination/PaginationControls';
import mainProjects from '@/app/api/mainProjects'

export default async function ProjectsPage (
  { searchParams, params: { locale }}: 
  { searchParams:  { [key: string]: string | string[] | undefined }, params: { locale: string }}) {

  // get projects data from api call and filter it based on language
  const apiData = await mainProjects();
  let projectsData: ProjectProps[] = [];
  if (locale === 'ge') {
    projectsData = apiData.filter((item: ProjectProps) => item.lang === 'geo');
  } else if (locale === 'en') {
    projectsData = apiData.filter((item: ProjectProps) => item.lang === 'eng');
  }

  // for translation
  const { t, resources } = await initTranslations(locale, ['dictionary']);
  
  // for search and filter
  const search = typeof searchParams.search === 'string' ? searchParams.search : undefined;
  const projectStatus = typeof searchParams.projectStatus === 'string' ? searchParams.projectStatus : undefined;

  let filteredProjects: ProjectProps[] = [];

  if (search || projectStatus) {
    if (search && projectStatus) {
      filteredProjects = projectsData.filter((project) =>
        project.title && project.title.toLowerCase().includes(search.toLowerCase()) &&
        (projectStatus === 'ongoing' ? project.status === '1' : project.status === '2')
      );
    } else if (search) {
      filteredProjects = projectsData.filter((project) =>
        project.title && project.title.toLowerCase().includes(search.toLowerCase())
      );
    } else if (projectStatus) {
      filteredProjects = projectsData.filter((project) =>
        projectStatus === 'ongoing' ? project.status === '1' : project.status === '2'
      );
    }
  } else {
    filteredProjects = projectsData;
  }

  const noProjectsFound = search || projectStatus ? filteredProjects.length === 0 : false;

  // for Pagination
  const page = searchParams['page'] ?? '1';
  const perPage = 5;
  const totalPages = Math.ceil(projectsData.length / perPage);
  const currentPage = Math.min(Number(page), totalPages); 
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const entries = filteredProjects.slice(start, end);

  return (
    <TranslationsProvider resources={resources} locale={locale} namespaces={['dictionary']}>
      <div className={styles.projectPage}>
        <div className={styles.filter}>
          <ProjectSearch search={search} projectStatus={projectStatus} />
        </div>
        <div className={styles.projects}>
          {noProjectsFound ? (
            <p className={styles.noprojects}>{t('noProjectsFound')}</p>
          ) : (
            entries.map((project: Partial<ProjectProps>) => (
              <ProjectCard 
                key={project.rec_id}
                img={project.img!} 
                rec_id={project.rec_id!}
                title={project.title!}
                intro={project.intro!} 
              />
            ))
          )}
        </div>
        <PaginationControls
          length={filteredProjects.length}
          hasNextPage={end < filteredProjects.length}
          hasPrevPage={start > 0}
          destination="projects"
          perPage={perPage}
        />
      </div>
    </TranslationsProvider>
  )
}