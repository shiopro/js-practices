import sqlite3 from "sqlite3";
import { run, get, close } from "./db.js";

const db = new sqlite3.Database(":memory:");

run(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
)
  .then(() => {
    console.log("テーブル作成成功");
    return run(db, "INSERT INTO books (title) VALUES (?)", [null]);
  })
  .catch((error) => {
    console.error("レコード追加エラー:", error.message);
  })
  .then(() => get(db, "SELECT * FROM users"))
  .catch((error) => {
    console.error("レコード取得エラー:", error.message);
    return run(db, "DROP TABLE books");
  })
  .then(() => {
    console.log("テーブル削除成功");
  })
  .catch((error) => {
    console.error("エラー:", error.message);
  })
  .finally(() => {
    close(db);
  });
