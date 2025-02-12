const express = require("express");
const path = require("path");
const app = express();
const port = 3005;

// dist フォルダ内のすべての静的ファイルを提供する
app.use(express.static(path.join(__dirname, "dist")));

// 全てのルートで dist/index.html を返す（SPAの場合など）
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
