// Copyright (c) Meta Platforms, Inc. and affiliates.

/** @file astryx docs authoring/ship — test, publish, and upgrade. */

/** @type {import('@blue-patterns/cli/authoring').NamespaceDoc} */
export const docs = {
  type: 'namespace',
  name: 'ship',
  placement: {parent: 'namespace:authoring', slot: 'guides', order: 30},
  title: 'Ship',
  summary: 'Test, publish, and upgrade your package.',
  keywords: ['authoring', 'ship', 'publish', 'release', 'upgrade'],
  slots: {
    guides: {title: 'Ship', accepts: {kinds: ['generic']}},
  },
};
