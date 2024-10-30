'use client';

import { Suspense, lazy, useMemo, useState } from 'react';

import Twemoji from '@/components/Twemoji';
import { Skeleton } from '@/components/homepage/IconSkeleton';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Tooltip from '@/components/ui/tooltip';
import { skillsData } from '@/data/skills';
import { type Skill } from '@/types/skills';

const IconsBundle = lazy(() => import('@/components/social-icons'));

const filterSkillsData = (skillsData: Skill[]) => {
  const acc: Record<string, Skill[]> = { 'Most Used': [] };

  skillsData.forEach((skill) => {
    if (!skill.hidden) {
      acc[skill.category] = acc[skill.category] || [];
      acc[skill.category].push(skill);

      if (skill.mostUsed) {
        acc['Most Used'].push(skill);
      }
    }
  });

  return acc;
};

export function Technologies() {
  const filteredSkillsData = useMemo(() => filterSkillsData(skillsData), []);
  const categories = useMemo(
    () => Object.keys(filteredSkillsData),
    [filteredSkillsData]
  );
  const [tabIndex, setTabIndex] = useState(0);

  const onTabChange = (value: string) => {
    const index = categories.indexOf(value);
    setTabIndex(index);
  };

  return (
    <div className="w-full space-y-2 py-1 md:space-y-5">
      <h1 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
        Technologies I Work With {''}
        <Twemoji size="twa-sm" emoji="hammer-and-wrench" />
      </h1>
      <p className="!mt-2 flex items-center text-lg leading-7 text-gray-500 dark:text-gray-400">
        Tools and technologies that I am familiar with and use daily.
      </p>
      <Tabs
        value={categories[tabIndex]}
        onValueChange={onTabChange}
        defaultValue={categories[0]}
      >
        <TabsList className="h-27 grid w-full grid-cols-2 gap-2 md:h-9 md:grid-cols-5 md:gap-1 lg:grid-cols-5 xl:gap-2">
          {categories.map((category, index) => (
            <TabsTrigger
              key={`trigger-${category}`}
              value={category}
              className={`${index === tabIndex ? 'bg-primary-500/60 text-white dark:bg-primary-500/60' : 'bg-gray text-white-900'} hover:bg-gray-700/40 hover:text-white hover:dark:bg-gray-700/40`}
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        {categories.map((category) => (
          <TabsContent key={category} value={category}>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>{category}</CardTitle>
                {category === 'Most Used' && (
                  <CardDescription>
                    These are my most used technologies.
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-4 md:grid-cols-8 lg:grid-cols-8 xl:grid-cols-10">
                  {filteredSkillsData[category].map((skill) => (
                    <Tooltip key={skill.id} content={skill.name}>
                      <Button
                        className={`relative h-14 p-2 sm:p-2 ${skill.level === 'learning' ? 'border border-red-300' : ''}`}
                        variant="outline"
                      >
                        <Suspense fallback={<Skeleton />}>
                          <IconsBundle
                            kind={skill.id}
                            size={8}
                            iconType="icon"
                          />
                        </Suspense>
                        {skill.level === 'advanced' && (
                          <span
                            className="absolute -right-1 -top-1 scale-75 text-xs"
                            aria-label="Advanced skill"
                          >
                            <Twemoji size="sm" emoji="fire" />
                          </span>
                        )}
                      </Button>
                    </Tooltip>
                  ))}
                </div>
              </CardContent>
              {category !== 'Most Used' && (
                <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span className="mx-1 inline-block h-3 w-3 rounded-full bg-red-300"></span>
                    <span>Currently Learning</span>
                  </div>
                </CardFooter>
              )}
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
