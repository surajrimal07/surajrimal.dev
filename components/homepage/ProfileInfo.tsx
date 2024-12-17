import {
  Briefcase,
  Facebook,
  Github,
  Linkedin,
  Mail,
  MapPin,
} from 'lucide-react';

import Twemoji from '@/components/Twemoji';
import siteMetadata from '@/data/siteMetadata';

const ProfileCardInfo = () => {
  return (
    <div className="p-3">
      <h3 className="text-lg font-medium text-gray-800 dark:text-white">
        Suraj Rimal
      </h3>
      <h5 className="text-gray-700 dark:text-gray-400">Learner | Builder</h5>
      <div className="mb-2 mt-2 space-y-3">
        <div className="flex items-center">
          <Briefcase size={20} strokeWidth={1} />
          <p className="px-2">
            Fullstack Engineer @{' '}
            <a
              className="hover:underline"
              href="https://younetmedia.com/"
              rel="noreferrer"
              target="_blank"
            >
              Zorsha Technologies
            </a>
          </p>
        </div>
        <div className="flex items-center">
          <MapPin name="map-pin" size={20} strokeWidth={1} />
          <p className="px-2">
            Kathmandu, Nepal, <Twemoji name="nepal" size="sm" />
          </p>
        </div>
        <div className="flex items-center">
          <Mail size={20} strokeWidth={1} />
          <p className="px-2">
            <a href={`mailto:${siteMetadata.email}`}>{siteMetadata.email}</a>
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <a
            className="flex items-center text-sm hover:underline"
            data-umami-event="profile-card-github"
            href={siteMetadata.github}
            rel="noreferrer"
            target="_blank"
          >
            <Github size={20} strokeWidth={1} />
            <span className="ml-px text-gray-500">/</span>
            <span className="ml-0.5">{siteMetadata.socialAccounts.github}</span>
          </a>
          <span className="text-gray-400 dark:text-gray-500">|</span>
          <a
            className="flex items-center text-sm hover:underline"
            data-umami-event="profile-card-linkedin"
            href={siteMetadata.linkedin}
            rel="noreferrer"
            target="_blank"
          >
            <Linkedin size={20} strokeWidth={1} />
            <span className="ml-px text-gray-500">/</span>
            <span className="ml-0.5">
              {siteMetadata.socialAccounts.linkedin}
            </span>
          </a>
          <span className="text-gray-400 dark:text-gray-500">|</span>
          <a
            className="flex items-center text-sm hover:underline"
            data-umami-event="profile-card-facebook"
            href={siteMetadata.linkedin}
            rel="noreferrer"
            target="_blank"
          >
            <Facebook size={20} strokeWidth={1} />
            <span className="ml-px text-gray-500">/</span>
            <span className="ml-0.5">
              {siteMetadata.socialAccounts.facebook}
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfileCardInfo;
