# wait-mcp

An MCP (Model Context Protocol) Server that waits for a specified time and returns a response.

## Features

- `wait` tool: Waits for a specified number of milliseconds and returns a completion message
- Useful for testing timeouts, simulating delays, testing rate limiting, and more

## Installation

### Local Development

```bash
npm install
```

### Run Directly with npx

Run directly from GitHub:

```bash
npx github:sharo-jef/wait-mcp
```

## Usage

### Configuration for Claude Desktop

Add the following to your Claude Desktop configuration file (`claude_desktop_config.json`):

Run directly from GitHub:

```json
{
  "mcpServers": {
    "wait": {
      "command": "npx",
      "args": ["-y", "github:sharo-jef/wait-mcp"]
    }
  }
}
```

For local development:

```json
{
  "mcpServers": {
    "wait": {
      "command": "node",
      "args": [
        "C:\\Users\\sharo\\ghq\\github.com\\sharo-jef\\wait-mcp\\dist\\index.js"
      ]
    }
  }
}
```

### wait Tool

**Parameters:**

- `duration` (required): Wait time in milliseconds
- `message` (optional): Message to return after wait completes (default: "Wait completed")

**Usage Examples:**

```javascript
// Wait for 3 seconds
{
  "duration": 3000
}

// Wait for 5 seconds with a custom message
{
  "duration": 5000,
  "message": "Wait for 5 seconds completed"
}
```
