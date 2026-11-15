// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file /llms.txt route
 *
 * Next.js serves this at /llms.txt (the llmstxt.org convention).
 *
 * @output text/plain
 */

export function GET() {
  const body = `# Astryx

An open source design system that's fully customizable and agent ready. Astryx
has grown inside Meta over the last eight years, shaped by the engineers,
designers, and product teams who depend on it every day, and now powers over
13,000 apps. Built on React and StyleX.

Everything on this docs site (component docs, props, variants, tokens, page
templates, and design rules) is also available through the Astryx CLI, in a
form built for agents to read. Instead of crawling these pages, use the CLI to
learn about Astryx directly. Some examples:

    npx @blue-patterns/cli search "<what you're looking for>"   # search components, hooks, docs, templates
    npx @blue-patterns/cli docs                                 # list reference docs, then: docs <topic>
    npx @blue-patterns/cli component <Name>                     # props, variants, examples for one component
    npx @blue-patterns/cli component --list                     # every component
    npx @blue-patterns/cli blog                                 # read the Astryx blog

Use the scoped name @blue-patterns/cli. Bare "npx astryx" resolves to an
unrelated package until the CLI is installed as a dependency.
`;

  return new Response(body, {
    headers: {'content-type': 'text/plain; charset=utf-8'},
  });
}
