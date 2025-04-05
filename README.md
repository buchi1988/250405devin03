# Express.js TODOアプリケーション

## 1. アプリケーション概要

このアプリケーションはExpress.jsを使用して開発されたシンプルなTODOリスト管理アプリケーションです。ユーザーはタスクの追加、編集、削除、完了状態の切り替え、フィルタリングなどの基本的なタスク管理機能を利用できます。

## 2. デモ

- GitHub Pages版（静的フロントエンドのみ）：
  [https://buchi1988.github.io/250405devin03/](https://buchi1988.github.io/250405devin03/)

- フル機能版（バックエンド付き）：
  [https://todo-express-app-tunnel-4xvgythm.devinapps.com](https://todo-express-app-tunnel-4xvgythm.devinapps.com)

## 3. 技術仕様

### 3.1 フロントエンド
- HTML5
- CSS3
- JavaScript (Vanilla JS)

### 3.2 バックエンド
- Node.js
- Express.js
- Body-parser (リクエストボディの解析用)

### 3.3 データストレージ
- インメモリデータストア（サーバーメモリ内に保存）

### 3.4 デプロイ
- バックエンド: Devin Apps
- フロントエンド: GitHub Pages

## 4. アプリケーション構造

```
todo-express-app/
├── index.js           # メインサーバーファイル
├── package.json       # プロジェクト設定ファイル
└── public/            # 静的ファイル
    ├── index.html     # メインHTMLファイル
    ├── styles.css     # CSSスタイルシート
    └── app.js         # フロントエンドJavaScript
```

## 5. API仕様

### 5.1 エンドポイント一覧

| メソッド | エンドポイント | 説明 |
|---------|--------------|------|
| GET     | /api/todos   | すべてのTODOアイテムを取得 |
| GET     | /api/todos/:id | 特定のTODOアイテムを取得 |
| POST    | /api/todos   | 新しいTODOアイテムを作成 |
| PUT     | /api/todos/:id | 特定のTODOアイテムを更新 |
| DELETE  | /api/todos/:id | 特定のTODOアイテムを削除 |

### 5.2 リクエスト/レスポンス形式

#### GET /api/todos
**レスポンス**:
```json
[
  {
    "id": 1,
    "text": "Express.jsを学ぶ",
    "completed": false
  },
  {
    "id": 2,
    "text": "TODOアプリを作成する",
    "completed": false
  }
]
```

#### GET /api/todos/:id
**レスポンス**:
```json
{
  "id": 1,
  "text": "Express.jsを学ぶ",
  "completed": false
}
```

#### POST /api/todos
**リクエスト**:
```json
{
  "text": "新しいタスク"
}
```

**レスポンス**:
```json
{
  "id": 3,
  "text": "新しいタスク",
  "completed": false
}
```

#### PUT /api/todos/:id
**リクエスト**:
```json
{
  "text": "更新されたタスク",
  "completed": true
}
```

**レスポンス**:
```json
{
  "id": 1,
  "text": "更新されたタスク",
  "completed": true
}
```

#### DELETE /api/todos/:id
**レスポンス**: 204 No Content

## 6. 機能詳細

### 6.1 TODOアイテムの表示
- すべてのTODOアイテムをリスト形式で表示
- 各アイテムには完了状態を示すチェックボックスと削除ボタンが付属

### 6.2 新しいTODOの追加
- テキスト入力フィールドに新しいタスクを入力
- 「追加」ボタンをクリックまたはEnterキーを押して追加

### 6.3 TODOの完了/未完了の切り替え
- チェックボックスをクリックして完了状態を切り替え
- 完了したタスクは視覚的に区別（テキストに取り消し線、透明度の変更）

### 6.4 TODOの削除
- 各タスクの右側にある「×」ボタンをクリックして削除

### 6.5 フィルター機能
- 「すべて」「未完了」「完了済み」の3つのフィルターオプション
- 現在選択されているフィルターは視覚的に強調表示

## 7. 使用方法

### 7.1 ローカル環境での実行

1. リポジトリをクローン
```bash
git clone https://github.com/buchi1988/250405devin03.git
cd 250405devin03
```

2. 依存関係のインストール
```bash
npm install
```

3. サーバーの起動
```bash
npm start
```

4. ブラウザでアクセス
```
http://localhost:3000
```

### 7.2 デプロイ版へのアクセス

- GitHub Pages版（静的フロントエンドのみ）：
  [https://buchi1988.github.io/250405devin03/](https://buchi1988.github.io/250405devin03/)

- フル機能版（バックエンド付き）：
  [https://todo-express-app-tunnel-4xvgythm.devinapps.com](https://todo-express-app-tunnel-4xvgythm.devinapps.com)

## 8. 制限事項

- インメモリデータストアを使用しているため、サーバー再起動時にデータは失われます
- GitHub Pages版は静的なフロントエンドのみで、データはブラウザのメモリに保存されます
- 複数ユーザーによる同時編集には対応していません

## 9. 将来の拡張可能性

- データベース（MongoDB、SQLiteなど）の統合
- ユーザー認証の追加
- タスクの期限や優先度の設定機能
- タグ付け機能
- 通知機能
- モバイルアプリ対応

## 10. トラブルシューティング

### 10.1 サーバー起動エラー
- ポート3000が既に使用されている場合は、`index.js`ファイル内の`PORT`変数を変更してください
- 依存関係のインストールに問題がある場合は、`npm cache clean --force`を実行してから再度インストールを試みてください

### 10.2 APIエラー
- 404エラー：URLが正しいか確認してください
- 400エラー：リクエストボディが正しい形式か確認してください

## 11. まとめ

このTODOアプリケーションは、Express.jsを使用した基本的なタスク管理システムです。シンプルなインターフェースと直感的な操作性を備えており、日常のタスク管理に役立ちます。また、このアプリケーションはExpress.jsの基本的な使い方を学ぶための良い例でもあります。
