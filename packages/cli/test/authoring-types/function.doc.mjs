// Copyright (c) Meta Platforms, Inc. and affiliates.

/** @type {import('@blue-patterns/cli/authoring').FunctionDoc} */
export const docs = {
  type: 'function',
  name: 'search',
  displayName: 'search()',
  kind: 'api',
  summary: 'Search components, hooks, templates, and docs.',
  importPath: '@blue-patterns/cli/api',
  signature: 'search(query: string): Promise<SearchResponse>',
  params: [
    {
      name: 'query',
      type: 'string',
      description: 'What to look for.',
      required: true,
    },
  ],
  returns: [{type: 'Promise<SearchResponse>', description: 'Ranked matches.'}],
  throws: [{code: 'ERR_INVALID_ARGUMENT', when: 'The query is empty.'}],
  examples: [{label: 'Find a component', code: "await search('button');"}],
};
