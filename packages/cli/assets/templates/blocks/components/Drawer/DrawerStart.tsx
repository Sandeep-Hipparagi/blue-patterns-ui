// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @input Controlled open state and the logical start edge
 * @output A Drawer that opens from the start side of the viewport
 * @position Copyable Drawer example
 */

import {useState} from 'react';
import {Drawer, DrawerHeader} from '@blue-patterns/core/Drawer';
import {Button} from '@blue-patterns/core/Button';
import {Layout, LayoutContent} from '@blue-patterns/core/Layout';
import {Text} from '@blue-patterns/core/Text';

export default function DrawerStart() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button label="Open start drawer" onClick={() => setIsOpen(true)} />
      <Drawer
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        label="Navigation"
        side="start">
        <Layout
          header={<DrawerHeader title="Navigation" onOpenChange={setIsOpen} />}
          content={
            <LayoutContent>
              <Text type="body">
                The start edge follows the page's writing direction.
              </Text>
            </LayoutContent>
          }
        />
      </Drawer>
    </>
  );
}
