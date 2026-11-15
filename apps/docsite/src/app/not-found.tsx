// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file Global not-found page for the Astryx docsite.
 * @input Shared shell chrome, sitemap pages, and the current request pathname
 * @output Branded 404 page with high-confidence destination suggestions
 * @position Fallback route rendered whenever no static or dynamic docsite page matches
 */

import {AppShell} from '@blue-patterns/core/AppShell';
import {Center} from '@blue-patterns/core/Center';
import {VStack} from '@blue-patterns/core/Layout';
import {Heading, Text} from '@blue-patterns/core/Text';
import {SharedTopNav} from '../components/SharedTopNav';
import {DocsBanner} from '../components/InternalDocsPrompt';
import {DidYouMean} from '../components/DidYouMean';
import {SiteFooter} from '../components/SiteFooter';
import {getCopyrightYear} from '../lib/copyrightYear';
import {getSitemapPages} from './sitemap';
import styles from './not-found.module.css';

export default async function NotFound() {
  const year = await getCopyrightYear();
  const sitemapPages = await getSitemapPages();
  const pages = sitemapPages.map(({url, title}) => ({
    path: new URL(url).pathname,
    title,
  }));

  return (
    <AppShell
      variant="surface"
      height="fill"
      mobileNav={false}
      banner={<DocsBanner />}
      topNav={<SharedTopNav />}>
      <div className={styles.shell}>
        <div className={styles.content}>
          <Center axis="both" height="100%">
            <VStack gap={2} hAlign="center">
              <Heading level={1} type="display-1">
                404
              </Heading>
              <Text type="body" color="secondary">
                This page could not be found.
              </Text>
              <DidYouMean pages={pages} />
            </VStack>
          </Center>
        </div>
        <SiteFooter year={year} />
      </div>
    </AppShell>
  );
}
