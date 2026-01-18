#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

// Create server instance
const server = new Server(
  {
    name: "wait-mcp",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: {},
    },
  },
);

// Define the wait tool
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "wait",
        description:
          "Wait for a specified duration before returning. Useful for testing timeouts, delays, or rate limiting.",
        inputSchema: {
          type: "object",
          properties: {
            duration: {
              type: "number",
              description: "Duration to wait in milliseconds",
              minimum: 0,
            },
            message: {
              type: "string",
              description: "Optional message to return after waiting (default: 'Wait completed')",
            },
          },
          required: ["duration"],
        },
      },
    ],
  };
});

interface WaitArguments {
  duration?: number;
  message?: string;
}

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "wait") {
    const args = request.params.arguments as WaitArguments;
    const duration = args?.duration;
    const message = args?.message || "Wait completed";

    if (typeof duration !== "number" || duration < 0) {
      throw new Error("Duration must be a non-negative number");
    }

    const startTime = Date.now();

    // Wait for the specified duration
    await new Promise((resolve) => setTimeout(resolve, duration));

    const actualDuration = Date.now() - startTime;

    return {
      content: [
        {
          type: "text",
          text: `${message}\nRequested duration: ${duration}ms\nActual duration: ${actualDuration}ms`,
        },
      ],
    };
  }

  throw new Error(`Unknown tool: ${request.params.name}`);
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Wait MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
