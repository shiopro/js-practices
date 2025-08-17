import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  () => {
    console.log("テーブル作成成功");

    db.run("INSERT INTO books (title) VALUES (?)", function (error) {
      if (error) {
        console.error("レコード追加エラー:", error.message);
      }

      db.all("SELECT * FROM users", (error) => {
        if (error) {
          console.error("取得したレコード:", error.message);
        }
      });
    });
  },
);
