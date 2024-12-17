import { genPageMetadata } from 'app/seo';
import clsx from 'clsx';
import { AiOutlineCode } from 'react-icons/ai';
import { BsBuilding } from 'react-icons/bs';
import { FaBlackTie, FaGraduationCap } from 'react-icons/fa';
import { HiOutlineDatabase } from 'react-icons/hi';
import { HiOutlineRocketLaunch } from 'react-icons/hi2';
import { RiDoorClosedLine } from 'react-icons/ri';
import { SiLeetcode } from 'react-icons/si';
import { TbDeviceDesktopAnalytics } from 'react-icons/tb';

import { getJourneyEvents } from '@/lib/journey';
import type { Tables } from '@/types/database';

const iconMap: { [key: string]: JSX.Element } = {
  FaBlackTie: <FaBlackTie />,
  FaGraduationCap: <FaGraduationCap />,
  SiLeetcode: <SiLeetcode />,
  HiOutlineDatabase: <HiOutlineDatabase />,
  TbDeviceDesktopAnalytics: <TbDeviceDesktopAnalytics />,
  BsBuilding: <BsBuilding />,
  RiDoorClosedLine: <RiDoorClosedLine />,
  AiOutlineCode: <AiOutlineCode />,
  HiOutlineRocketLaunch: <HiOutlineRocketLaunch />,
};

export const metadata = genPageMetadata({ title: 'Journey' });

export default async function Page() {
  const journey: Tables<'journey_events'>[] = await getJourneyEvents();

  return (
    <>
      <div className="mx-auto max-w-2xl">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
            Journey
          </h1>
          <p className="text-md leading-7 text-gray-500 dark:text-gray-400">
            Trying not to compare myself to others. Taking baby steps every day.
          </p>
        </div>
        <div className="timeline-container animate-slide-up">
          <ol className="relative ml-6 mt-6 border-l border-zinc-400 dark:border-gray-800">
            {journey.map((event) => (
              <li
                key={event.id}
                className="mb-4 ml-8 rounded-md border border-gray-100 bg-white px-4 py-4 shadow-sm shadow-gray-300 dark:border-zinc-900 dark:bg-zinc-900 dark:shadow-none"
              >
                <span
                  className={clsx(
                    `absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-${event.color}-200 ring-8 ring-white dark:bg-${event.color}-900 dark:ring-gray-900`,
                    {
                      'animate-pulse': event.is_current,
                    }
                  )}
                >
                  {iconMap[event.icon]}
                </span>
                <h3 className="flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  {event.title}

                  {event.is_current && (
                    <span className="ml-3 mr-2 rounded bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800 dark:bg-blue-200 dark:text-blue-800">
                      Present
                    </span>
                  )}
                </h3>
                <time className="text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                  {event.date}
                </time>
                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                  {event.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}
