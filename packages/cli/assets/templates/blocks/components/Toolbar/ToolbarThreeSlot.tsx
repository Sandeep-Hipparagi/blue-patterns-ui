// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {Toolbar} from '@blue-patterns/core/Toolbar';
import {Button} from '@blue-patterns/core/Button';
import {Icon} from '@blue-patterns/core/Icon';
import {Heading} from '@blue-patterns/core/Text';
import {Card} from '@blue-patterns/core/Card';
import {Section} from '@blue-patterns/core/Section';
import {ArrowLeftIcon} from '@heroicons/react/24/outline';

export default function ToolbarThreeSlot() {
  return (
    <Card style={{width: 600, height: '100%', marginTop: 260}}>
      <Toolbar
        label="Document toolbar"
        dividers={['bottom']}
        startContent={
          <Button
            label="Back"
            variant="ghost"
            icon={<Icon icon={ArrowLeftIcon} />}
            isIconOnly
          />
        }
        centerContent={<Heading level={4}>Title</Heading>}
        endContent={
          <>
            <Button label="Discard" variant="secondary" />
            <Button label="Save" variant="primary" />
          </>
        }
      />
      <Section />
    </Card>
  );
}
