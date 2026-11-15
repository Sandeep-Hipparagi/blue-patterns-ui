// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {DropdownMenu} from '@blue-patterns/core/DropdownMenu';
import {HStack} from '@blue-patterns/core/HStack';
import {Text} from '@blue-patterns/core/Text';
import {VStack} from '@blue-patterns/core/VStack';

export default function App() {
  const [projects, setProjects] = useState(['Apollo', 'Gemini', 'Mercury']);
  return (
    <VStack gap={2} padding={6}>
      {projects.map((name, index) => (
        <HStack key={name} gap={2}>
          <Text>{name}</Text>
          <DropdownMenu
            button={{label: `Actions for ${name}`}}
            items={[
              {label: 'Rename'},
              {
                label: 'Duplicate',
                onClick: () =>
                  setProjects([
                    ...projects.slice(0, index + 1),
                    `${name} copy`,
                    ...projects.slice(index + 1),
                  ]),
              },
              {
                label: 'Delete',
                variant: 'destructive',
                onClick: () =>
                  setProjects(projects.filter(other => other !== name)),
              },
            ]}
          />
        </HStack>
      ))}
    </VStack>
  );
}
