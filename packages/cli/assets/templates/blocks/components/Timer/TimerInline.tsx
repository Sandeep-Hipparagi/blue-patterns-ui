// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {Timer} from '@blue-patterns/core/Timer';
import {Text} from '@blue-patterns/core/Text';

export default function TimerInline() {
  return (
    <Text type="body" color="primary">
      Processing for <Timer type="inherit" color="inherit" />
    </Text>
  );
}
