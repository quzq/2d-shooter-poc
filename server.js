const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

// dist ディレクトリの静的ファイル（bundle.js）を提供
app.use("/dist", express.static(path.join(__dirname, "dist")));

// src ディレクトリの静的ファイル（index.html など）を提供
app.use(express.static(path.join(__dirname, "src")));

// ルート URL にアクセスされたら src/index.html を返す
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src/index.html"));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
