import readline from 'node:readline';
import { dsSearch } from './tools/search.js';
import { dsContract } from './tools/contract.js';
import { dsValidateJsx } from './tools/validate.js';
import { dsSwizzle } from './tools/swizzle.js';

export function startMcpServer() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  const tools = [
    {
      name: 'ds_search',
      description: 'Ranked search across all 150+ components, hooks, motion primitives, and theme packs.',
      inputSchema: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Search term or component name' },
          category: { type: 'string', description: 'Optional category filter: Component, DataViz, Motion, Theme' },
        },
        required: ['query'],
      },
    },
    {
      name: 'ds_contract',
      description: 'Batch-returns typed props, variant enums, CSS token dependencies, and dense usage rules.',
      inputSchema: {
        type: 'object',
        properties: {
          componentNames: {
            type: 'array',
            items: { type: 'string' },
            description: 'List of component names to inspect',
          },
        },
        required: ['componentNames'],
      },
    },
    {
      name: 'ds_validate_jsx',
      description: 'Static AST validator checking for hallucinated components, invalid props, or raw hex colors.',
      inputSchema: {
        type: 'object',
        properties: {
          tsxCode: { type: 'string', description: 'TSX / JSX source code to validate' },
        },
        required: ['tsxCode'],
      },
    },
    {
      name: 'ds_swizzle',
      description: 'Eject component source, StyleX styles, and tests into a consumer local directory.',
      inputSchema: {
        type: 'object',
        properties: {
          componentName: { type: 'string', description: 'Component to swizzle/eject' },
          destinationPath: { type: 'string', description: 'Target destination directory' },
        },
        required: ['componentName', 'destinationPath'],
      },
    },
  ];

  rl.on('line', (line: string) => {
    if (!line.trim()) return;

    try {
      const request = JSON.parse(line);
      const { id, method, params } = request;

      if (method === 'initialize') {
        const response = {
          jsonrpc: '2.0',
          id,
          result: {
            protocolVersion: '2024-11-05',
            serverInfo: {
              name: 'blue-patterns-mcp',
              version: '0.1.0',
            },
            capabilities: {
              tools: {},
            },
          },
        };
        process.stdout.write(JSON.stringify(response) + '\n');
      } else if (method === 'tools/list') {
        const response = {
          jsonrpc: '2.0',
          id,
          result: {
            tools,
          },
        };
        process.stdout.write(JSON.stringify(response) + '\n');
      } else if (method === 'tools/call') {
        const toolName = params?.name;
        const args = params?.arguments || {};
        let resultData: any = null;

        if (toolName === 'ds_search') {
          resultData = dsSearch(args.query || '', args.category);
        } else if (toolName === 'ds_contract') {
          resultData = dsContract(args.componentNames || []);
        } else if (toolName === 'ds_validate_jsx') {
          resultData = dsValidateJsx(args.tsxCode || '');
        } else if (toolName === 'ds_swizzle') {
          resultData = dsSwizzle(args.componentName || '', args.destinationPath || '');
        } else {
          throw new Error(`Unknown tool: ${toolName}`);
        }

        const response = {
          jsonrpc: '2.0',
          id,
          result: {
            content: [
              {
                type: 'text',
                text: JSON.stringify(resultData, null, 2),
              },
            ],
          },
        };
        process.stdout.write(JSON.stringify(response) + '\n');
      }
    } catch (err: any) {
      const errorResponse = {
        jsonrpc: '2.0',
        error: {
          code: -32603,
          message: err.message,
        },
      };
      process.stdout.write(JSON.stringify(errorResponse) + '\n');
    }
  });
}
