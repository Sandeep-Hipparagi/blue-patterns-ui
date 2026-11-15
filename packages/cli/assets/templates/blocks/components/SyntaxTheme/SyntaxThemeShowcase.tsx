// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {SyntaxTheme} from '@blue-patterns/core/theme';
import {oneDarkPro} from '@blue-patterns/core/theme/syntax';
import {CodeBlock} from '@blue-patterns/core/CodeBlock';
import {Stack} from '@blue-patterns/core/Layout';
import {Text} from '@blue-patterns/core/Text';

const sampleCode = `async function save() {
  await api.update(values);
  toast.show('Saved');
}`;

export default function SyntaxThemeShowcase() {
  return (
    <SyntaxTheme theme={oneDarkPro}>
      <Stack
        direction="vertical"
        gap={2}
        style={{width: 360, maxWidth: '100%'}}>
        <Text type="supporting" weight="bold" color="secondary">
          One Dark Pro preset
        </Text>
        <CodeBlock code={sampleCode} language="tsx" />
      </Stack>
    </SyntaxTheme>
  );
}
