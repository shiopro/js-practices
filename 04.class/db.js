import sqlite3 from "sqlite3";

const db = new sqlite3.Database("memo.db", (error) => {
  if (error) {
    console.error("DB接続エラー:", error.message);
    process.exit(1);
  }
});

db.run(
  `CREATE TABLE IF NOT EXISTS memos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  memo TEXT)`,
  (error) => {
    if (error) {
      console.error("テーブル作成失敗:", error.message);
      process.exit(1);
    }
  },
);

export default db;
