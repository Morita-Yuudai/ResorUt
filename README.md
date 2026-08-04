# ResorUt

来場者の写真から、ズームインとTikTok風トランジションでAI変身する動画をサイトの背景に流すWebサイトです。

## 構成

Next.js（App Router）+ Tailwind CSS。動画生成機能は `src/features/video-gen/` に独立しており、他機能（予約など）とは疎結合です。

```
src/features/video-gen/
├── constants/patterns.js       変身/トランジションの指示パターン（8種）
├── hooks/useVideoAssembler.js  パターンの回収・組み立て（純粋ロジック）
├── hooks/useVideoGeneration.js アップロード→生成→ポーリングのコンテナフック
├── components/ImageUploader.jsx    アップロードUI（Presentational）
├── components/BackgroundVideo.jsx  背景動画プレイヤー（右クリックで再生/停止）
├── components/VideoGenHero.jsx     上記を組み合わせたセクション
└── server/higgsfieldClient.js  Higgsfield呼び出し（サーバー専用）

app/api/video-gen/
├── upload/route.js             画像アップロード
├── generate/route.js           動画生成リクエスト
└── status/[jobId]/route.js     生成状況ポーリング
```

## セットアップ

```bash
npm install
cp .env.example .env.local   # HIGGSFIELD_API_KEY を設定
npm run dev
```

`HIGGSFIELD_API_KEY` はサーバー側のみで使用され、クライアントには一切送出されません。

## 背景動画について

トップページの背景は `public/video-gen/demo-fallback.mp4`（デモ用）です。来場者が写真をアップロードすると、Higgsfieldで生成したAI変身動画に置き換わります。背景動画上で右クリックすると、再生/停止を切り替えられます。
