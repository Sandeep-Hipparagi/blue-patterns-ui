# @blue-patterns/mcp

Deterministic Model Context Protocol (MCP) server exposing Blue-Patterns-UI contracts, validation, and component discovery to AI coding agents.

## Features

- **Component Search (`ds_search_components`):** Rapid semantic search across component contracts, visual variants, token slots, and accessibility roles.
- **Contract Inspection (`ds_get_contract`):** Retrieve machine-readable `.doc.mjs` component specifications, prop schemas, and usage examples.
- **JSX AST Validation (`ds_validate_jsx`):** Validate JSX source code against Blue-Patterns-UI invariants (zero raw hex colors, valid component imports, accessible props).
- **Token Discovery (`ds_list_tokens`):** Query CSS custom property design tokens across colors, spacing, radii, typography, and spring motion curves.

## Usage

### Direct Execution

```bash
npx @blue-patterns/mcp
# or
pnpm dlx @blue-patterns/mcp
```

### In Agent / Claude Desktop Configuration

```json
{
  "mcpServers": {
    "blue-patterns": {
      "command": "npx",
      "args": ["-y", "@blue-patterns/mcp"]
    }
  }
}
```

## License

MIT
