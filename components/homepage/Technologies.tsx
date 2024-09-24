'use client';

import { useState } from 'react';

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
import { skillsData } from '@/data/skills';
import { type Skill } from '@/types/skills';

import Twemoji from '../Twemoji';
import IconsBundle from '../social-icons';
import Tooltip from '../ui/tooltip';

function filterSkillsData(skillsData: Skill[]) {
  const acc: Record<string, Skill[]> = { 'Most Used': [] };

  skillsData.forEach((skill) => {
    if (!skill.hidden) {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);

      if (skill.mostUsed) {
        acc['Most Used'].push(skill);
      }
    }
  });

  return acc;
}

export function Technologies() {
  const filteredSkillsData = filterSkillsData(skillsData);
  const categories = Object.keys(filteredSkillsData);
  const [tabIndex, setTabIndex] = useState(0);

  const onTabChange = (value: string) => {
    const index = categories.indexOf(value);
    setTabIndex(index);
  };

  return (
    <div className="w-full space-y-2 py-1 md:space-y-5">
      <h1 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
        Technologies i work with {''}
        <Twemoji size="twa-sm" emoji="hammer-and-wrench" />
      </h1>
      <p className="!mt-2 flex items-center text-lg leading-7 text-gray-500 dark:text-gray-400">
        Tools and technologies that i am familiar with and use on a daily basis.
      </p>
      <Tabs
        value={categories[tabIndex]}
        onValueChange={onTabChange}
        defaultValue={categories[0]}
        className=""
      >
        <TabsList className="h-27 grid w-full grid-cols-2 gap-2 md:h-9 md:grid-cols-5 md:gap-1 lg:grid-cols-5 xl:gap-2">
          {categories.map((category, index) => (
            <TabsTrigger
              key={`trigger-${category}`}
              value={category}
              className={` ${index === tabIndex ? 'bg-red-500 text-white dark:bg-red-500' : 'bg-gray text-white-900'} hover:bg-gray-700 hover:text-white hover:dark:bg-gray-700`}
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        {categories.map((category) => (
          <TabsContent key={category} value={category}>
            <Card key={category} className="w-full">
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
                        className={`h-14 p-2 sm:p-2 ${skill.level === 'learning' ? 'border border-red-300' : ''}`}
                        variant="outline"
                      >
                        <IconsBundle kind={skill.id} size={8} iconType="icon" />
                        {skill.level === 'advanced' && (
                          <span
                            className="absolute right-8 top-0 text-xs"
                            aria-label="Advanced skill"
                          >
                            🔥
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
