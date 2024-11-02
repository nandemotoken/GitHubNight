// app.js
const express = require('express');
const GhostContentAPI = require('@tryghost/content-api');
const cors = require('cors');

const app = express();
const port = 3000;

// Ghost APIクライアントの設定
// ContentAPIのキーはGhost管理画面のIntegrations→Add custom integrationで取得できます
const api = new GhostContentAPI({
    url: 'http://localhost:2368',  // Ghostのアドレス
    key: 'd765f2c5a158f5d9088377ec94',
    version: 'v5.0'
});

app.use(cors());
app.use(express.json());

// 記事一覧を取得するAPI
app.get('/api/posts', async (req, res) => {
    try {
        const posts = await api.posts
            .browse({
                limit: 10,
                include: ['tags', 'authors']
            });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 特定の記事を取得するAPI
app.get('/api/posts/:slug', async (req, res) => {
    try {
        const post = await api.posts
            .read({ slug: req.params.slug });
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});