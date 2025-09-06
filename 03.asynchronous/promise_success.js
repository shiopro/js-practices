import sqlite3 from "sqlite3";
import { run, get, all, close } from "./db.js";

const db = new sqlite3.Database(":memory:");

run(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
)
  .then(() => {
    console.log("テーブル作成成功");
    return run(db, "INSERT INTO books (title) VALUES (?)", ["Book"]);
  })
  .then((result) => {
    console.log("追加したレコードのID:", result.lastID);
    return get(db, "SELECT * FROM books WHERE title = ?", ["Book"]);
  })
  .then((row) => {
    console.log("取得したレコード:", row);
    return all(db, "SELECT * FROM books");
  })
  .then((rows) => {
    console.log("全体のレコード:", rows);
    return run(db, "DROP TABLE books");
  })
  .then(() => {
    console.log("テーブル削除成功");
  })
  .catch((error) => {
    console.error("エラー:", error.message);
  })
  .finally(() => {
    close(db).catch((error) => console.error("close() エラー:", error));
  });
