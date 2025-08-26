import { run, get, close } from "./db.js";

run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
)
  .then(() => {
    console.log("テーブル作成成功");
    return run("INSERT INTO books (title) VALUES (?)", [null]);
  })
  .catch((error) => {
    console.error("レコード追加エラー:", error.message);
  })
  .then(() => get("SELECT * FROM users"))
  .catch((error) => {
    console.error("取得エラー:", error.message);
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
