// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {useState} from 'react';
import {BottomSheet} from '@blue-patterns/core/BottomSheet';
import {Button} from '@blue-patterns/core/Button';
import {Divider} from '@blue-patterns/core/Divider';
import {Heading} from '@blue-patterns/core/Heading';
import {VStack} from '@blue-patterns/core/Stack';
import {Text} from '@blue-patterns/core/Text';
import {TextArea} from '@blue-patterns/core/TextArea';
import {TextInput} from '@blue-patterns/core/TextInput';

interface ProfileFormValues {
  name: string;
  email: string;
  company: string;
  role: string;
  bio: string;
  notes: string;
}

const initialValues: ProfileFormValues = {
  name: '',
  email: '',
  company: '',
  role: '',
  bio: '',
  notes: '',
};

export default function BottomSheetMobileKeyboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState(initialValues);
  const update =
    (field: keyof ProfileFormValues) =>
    (value: string): void =>
      setValues(current => ({...current, [field]: value}));

  return (
    <>
      <Button label="Edit profile" onClick={() => setIsOpen(true)} />
      <BottomSheet
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        label="Edit profile"
        height="tall">
        <form
          onSubmit={event => {
            event.preventDefault();
            setIsOpen(false);
          }}>
          <VStack gap={4}>
            <Heading level={3}>Edit profile</Heading>
            <Divider />
            <Text type="supporting" color="secondary">
              Focus fields throughout the form to see them remain visible above
              the mobile keyboard.
            </Text>
            <TextInput
              label="Name"
              value={values.name}
              onChange={update('name')}
            />
            <TextInput
              label="Email"
              type="email"
              value={values.email}
              onChange={update('email')}
            />
            <TextInput
              label="Company"
              value={values.company}
              onChange={update('company')}
            />
            <TextInput
              label="Role"
              value={values.role}
              onChange={update('role')}
            />
            <TextArea
              label="Bio"
              rows={5}
              value={values.bio}
              onChange={update('bio')}
            />
            <TextArea
              label="Notes"
              rows={5}
              value={values.notes}
              onChange={update('notes')}
            />
            <Button label="Save profile" type="submit" />
          </VStack>
        </form>
      </BottomSheet>
    </>
  );
}
