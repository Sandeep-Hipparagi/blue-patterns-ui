// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {Dialog, DialogHeader} from '@blue-patterns/core/Dialog';
import {Layout, LayoutContent, Card} from '@blue-patterns/core/Layout';
import {Text} from '@blue-patterns/core/Text';

export default function DialogHeaderShowcase() {
  return (
    <Dialog isOpen isInline onOpenChange={() => {}}>
      <Layout
        header={
          <DialogHeader
            title="Edit Profile"
            subtitle="Update your personal information"
            onOpenChange={() => {}}
          />
        }
        content={
          <LayoutContent>
            <Card variant="muted">
              <Text type="body" color="secondary">
                Dialog body content goes here.
              </Text>
            </Card>
          </LayoutContent>
        }
      />
    </Dialog>
  );
}
