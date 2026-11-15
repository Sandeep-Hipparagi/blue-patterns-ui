// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {CodeBlock} from '@blue-patterns/core/CodeBlock';
import {VStack} from '@blue-patterns/core/Stack';

export default function CodeBlockBashCommand() {
  return (
    <VStack gap={4} style={{width: '100%', maxWidth: 400}}>
      <CodeBlock
        code="npm install @blue-patterns/core"
        language="bash"
        hasLanguageLabel={false}
        style={{width: '100%'}}
      />
      <CodeBlock
        code="yarn add @blue-patterns/theme-neutral"
        language="bash"
        hasLanguageLabel={false}
        style={{width: '100%'}}
      />
      <CodeBlock
        code={
          'astryx upgrade --from 0.6.0 --apply --path apps/web/src --install-deps\nnpm run build'
        }
        language="bash"
        hasLanguageLabel={false}
        style={{width: '100%'}}
      />
    </VStack>
  );
}
