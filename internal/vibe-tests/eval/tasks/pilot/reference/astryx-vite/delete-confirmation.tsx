// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {AlertDialog} from '@blue-patterns/core/AlertDialog';
import {Button} from '@blue-patterns/core/Button';
import {HStack} from '@blue-patterns/core/HStack';
import {Text} from '@blue-patterns/core/Text';
import {VStack} from '@blue-patterns/core/VStack';

export default function App() {
  const [files, setFiles] = useState([
    'Q1 report.pdf',
    'Q2 report.pdf',
    'Q3 report.pdf',
  ]);
  const [pending, setPending] = useState<string | null>(null);
  return (
    <VStack gap={2} padding={6}>
      {files.map(file => (
        <HStack key={file} gap={2}>
          <Text>{file}</Text>
          <Button label={`Delete ${file}`} onClick={() => setPending(file)}>
            Delete
          </Button>
        </HStack>
      ))}
      <AlertDialog
        isOpen={pending !== null}
        onOpenChange={isOpen => {
          if (!isOpen) setPending(null);
        }}
        title="Delete file?"
        description={`Are you sure you want to delete ${pending ?? ''}?`}
        actionLabel="Delete"
        onAction={() => {
          setFiles(current => current.filter(file => file !== pending));
          setPending(null);
        }}
      />
    </VStack>
  );
}
