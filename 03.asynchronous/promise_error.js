import { run, get, all, close } from "./db.js";

run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
)
  .then(() => run("INSERT INTO books (title) VALUES (?)", [null]))
  .catch((error) => {
    console.error("NOT NULLエラー:", error.message);
  })
  .then(() => run("INSERT INTO books (title) VALUES (?)", ["Book"]))
  .then(() => run("INSERT INTO books (title) VALUES (?)", ["Book"]))
  .catch((error) => {
    console.error("UNIQUE エラー:", error.message);
  })
  .then(() => get("SELECT * FROM books WHERE title = ?", ["Book"]))
  .then((row) => {
    console.log("取得:", row);
    return all("SELECT * FROM books");
  })
  .then((rows) => {
    console.log("全体:", rows);
  })
  .catch((error) => {
    console.error("エラー:", error.message);
  })
  .finally(() => {
    close()
      .then(() => console.log("DB接続を閉じました"))
      .catch((error) => console.error("close() エラー:", error));
  });
