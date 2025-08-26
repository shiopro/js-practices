import { run, get, all, close } from "./db.js";

run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
)
  .then(() => {
    console.log("テーブル作成成功");
    return run("INSERT INTO books (title) VALUES (?)", ["Book"]);
  })
  .then((result) => {
    console.log("追加したレコードのID:", result.lastID);
  })
  .then(() => get("SELECT * FROM books WHERE title = ?", ["Book"]))
  .then((row) => {
    console.log("取得したレコード:", row);
    return all("SELECT * FROM books");
  })
  .then((rows) => {
    console.log("全体のレコード:", rows);
    return run("DROP TABLE books");
  })
  .then(() => {
    console.log("テーブル削除成功");
  })
  .catch((error) => {
    console.error("エラー:", error.message);
  })
  .finally(() => {
    close().catch((error) => console.error("close() エラー:", error));
  });
