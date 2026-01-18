# wait-mcp

指定時間待機してレスポンスを返す MCP (Model Context Protocol) Server です。

## 機能

- `wait` ツール: 指定されたミリ秒数待機してから完了メッセージを返します
- タイムアウトのテスト、遅延のシミュレーション、レート制限のテストなどに便利です

## インストール

### ローカルでの開発

```bash
npm install
```

### npx で直接実行

GitHub から直接実行:

```bash
npx github:sharo-jef/wait-mcp
```

## 使い方

### Claude Desktop での設定

Claude Desktop の設定ファイル (`claude_desktop_config.json`) に以下を追加:

GitHub から直接実行:

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

ローカル開発の場合:

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

### wait ツール

**パラメータ:**

- `duration` (必須): 待機時間（ミリ秒）
- `message` (オプション): 待機完了後に返すメッセージ（デフォルト: "Wait completed"）

**使用例:**

```javascript
// 3秒待機
{
  "duration": 3000
}

// カスタムメッセージ付きで5秒待機
{
  "duration": 5000,
  "message": "5秒の待機が完了しました"
}
```
