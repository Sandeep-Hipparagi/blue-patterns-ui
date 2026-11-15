// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {Toolbar} from '@blue-patterns/core/Toolbar';
import {Button} from '@blue-patterns/core/Button';
import {Icon} from '@blue-patterns/core/Icon';
import {Heading} from '@blue-patterns/core/Text';
import {Card} from '@blue-patterns/core/Card';
import {Section} from '@blue-patterns/core/Section';
import {FunnelIcon, PlusIcon} from '@heroicons/react/24/outline';

export default function ToolbarCardHeader() {
  return (
    <Card style={{width: 500, height: '100%', marginTop: 260}}>
      <Toolbar
        label="User list actions"
        size="sm"
        dividers={['bottom']}
        startContent={<Heading level={4}>Card title</Heading>}
        endContent={
          <>
            <Button
              label="Filter"
              variant="ghost"
              icon={<Icon icon={FunnelIcon} />}
              isIconOnly
            />
            <Button
              label="Add user"
              icon={<Icon icon={PlusIcon} />}
              isIconOnly
            />
          </>
        }
      />
      <Section />
    </Card>
  );
}
