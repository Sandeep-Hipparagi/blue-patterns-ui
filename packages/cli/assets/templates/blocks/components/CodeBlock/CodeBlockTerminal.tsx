// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {SyntaxTheme} from '@blue-patterns/core/theme';
import {githubDark} from '@blue-patterns/core/theme/syntax';
import {CodeBlock} from '@blue-patterns/core/CodeBlock';

const commands = `$ astryx init --features agents
✓ AI agent docs installed → AGENTS.md
$ pnpm astryx component CodeBlock --dense`;

export default function CodeBlockTerminal() {
  return (
    <SyntaxTheme theme={githubDark}>
      <CodeBlock
        code={commands}
        language="bash"
        hasCopyButton
        style={{width: '100%', maxWidth: 480}}
      />
    </SyntaxTheme>
  );
}
