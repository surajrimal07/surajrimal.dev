'use client';

import { useEffect, useState } from 'react';

import toast from 'react-hot-toast';

import ProjectCard from '@/components/projects/ProjectCard';
import { getProjects } from '@/lib/project';
import { Project } from '@/types/project';
import { toastOptions } from '@/utils/toast';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const description =
    'My open-source side projects and stuff that I built with my colleagues at work';

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      setProjects(await getProjects());
    } catch (error) {
      toast.error(`Failed to fetch proects ${error}`, toastOptions);
    }
  }

  const workProjects = projects.filter(({ type }) => type === 'work');
  const sideProjects = projects.filter(({ type }) => type === 'self');

  return (
    <>
      <div className="dark:divide-gray divide-y divide-gray-200">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Projects
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {description}
          </p>
        </div>

        <div className="container py-12">
          <h3 className="mb-4 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
            Work
          </h3>
          <div className="-m-4 flex flex-wrap">
            {workProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>

        <div className="container py-12">
          <h3 className="mb-4 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
            Side projects
          </h3>
          <div className="-m-4 flex flex-wrap">
            {sideProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
