// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file docs.mjs — Astryx component docs are served by the Astryx CLI.
 *
 * Component docs (props, variants, examples), page templates, design rules, and
 * tokens are provided by the Astryx CLI — always current and richer than a
 * bundled snapshot. This script intentionally redirects there instead of
 * printing docs, so agents and humans converge on the CLI + `init` (which writes
 * the full guide into AGENTS.md / CLAUDE.md) rather than treating a static doc
 * dump as the whole story.
 *
 * ==========================================================================
 *  AI AGENT: do NOT guess component APIs or hand-write CSS. Run:
 *      npx @blue-patterns/cli init
 *  Use the SCOPED name `@blue-patterns/cli` — the unscoped `astryx` resolves to
 *  an unrelated npm package until the CLI is a dependency. Then, per component:
 *      npx @blue-patterns/cli component <Name>
 *      npx @blue-patterns/cli component --list
 * ==========================================================================
 */

const BANNER = `
==========================================================================
 Astryx component docs are served by the Astryx CLI (accurate + current).
 Do not guess component APIs or hand-write CSS — set up first (one time):

     npx @blue-patterns/cli init

 (Use the scoped name @blue-patterns/cli. The unscoped name astryx resolves
 to an unrelated npm package until the CLI is installed as a dependency.)

 init writes the full component guide, page templates, design rules & tokens
 into your AGENTS.md / CLAUDE.md. Then, for any component:

     npx @blue-patterns/cli component <Name>   # full props, variants, examples
     npx @blue-patterns/cli component --list   # every component
     npx @blue-patterns/cli build "<what you're building>"   # starter kit
==========================================================================
`;

console.log(BANNER);
process.exit(0);
