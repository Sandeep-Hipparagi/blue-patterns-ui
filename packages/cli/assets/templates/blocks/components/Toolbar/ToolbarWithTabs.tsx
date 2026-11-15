// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {useState, type CSSProperties} from 'react';
import {Toolbar} from '@blue-patterns/core/Toolbar';
import {Button} from '@blue-patterns/core/Button';
import {Icon} from '@blue-patterns/core/Icon';
import {TabList, Tab} from '@blue-patterns/core/TabList';
import {Card} from '@blue-patterns/core/Card';
import {Section} from '@blue-patterns/core/Section';
import {PlusIcon} from '@heroicons/react/24/outline';

const card: CSSProperties = {
  width: '100%',
  maxWidth: 500,
  height: '100%',
  marginTop: 200,
};

export default function ToolbarWithTabs() {
  const [tab, setTab] = useState('overview');
  return (
    <Card style={card}>
      <Toolbar
        label="Section navigation"
        dividers={['bottom']}
        startContent={
          <TabList value={tab} onChange={setTab}>
            <Tab value="overview" label="Overview" />
            <Tab value="analytics" label="Analytics" />
            <Tab value="settings" label="Settings" />
          </TabList>
        }
        endContent={
          <Button label="New item" icon={<Icon icon={PlusIcon} />} isIconOnly />
        }
      />
      <Section />
    </Card>
  );
}
