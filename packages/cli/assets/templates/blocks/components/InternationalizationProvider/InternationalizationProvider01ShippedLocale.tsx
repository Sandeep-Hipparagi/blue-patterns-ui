// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {useState} from 'react';
import {InternationalizationProvider} from '@blue-patterns/core/i18n';
import frFR from '@blue-patterns/core/locales/fr-FR.generated.js';
import {Stack} from '@blue-patterns/core/Layout';
import {
  SegmentedControl,
  SegmentedControlItem,
} from '@blue-patterns/core/SegmentedControl';
import {Selector} from '@blue-patterns/core/Selector';

type Locale = 'en' | 'fr-FR';

export default function InternationalizationProviderShippedLocale() {
  const [locale, setLocale] = useState<Locale>('en');
  const [value, setValue] = useState<string | null>(null);
  return (
    <InternationalizationProvider locale={locale} messages={{'fr-FR': frFR}}>
      <Stack direction="vertical" gap={4} hAlign="center">
        <SegmentedControl
          label="Language"
          value={locale}
          onChange={nextLocale => setLocale(nextLocale as Locale)}
          size="sm">
          <SegmentedControlItem value="en" label="EN" />
          <SegmentedControlItem value="fr-FR" label="FR" />
        </SegmentedControl>
        <Selector
          controlStyle={{width: 300}}
          label="Billing region"
          options={[
            {value: 'americas', label: 'Americas'},
            {value: 'emea', label: 'EMEA'},
            {value: 'apac', label: 'APAC'},
          ]}
          value={value}
          onChange={setValue}
          hasClear
        />
      </Stack>
    </InternationalizationProvider>
  );
}
