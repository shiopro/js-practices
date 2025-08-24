import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  () => {
    console.log("テーブル作成成功");

    db.run("INSERT INTO books (title) VALUES (?)", ["Book"], function () {
      console.log("追加したレコードのID:", this.lastID);

      db.all("SELECT * FROM books", (_, rows) => {
        console.log("取得したレコード:", rows);

        db.run("DROP TABLE books", () => {
          console.log("テーブル削除成功");
          db.close();
        });
      });
    });
  },
);
