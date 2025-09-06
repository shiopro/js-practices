import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  () => {
    console.log("テーブル作成成功");

    db.run("INSERT INTO books (title) VALUES (?)", [null], function (error) {
      if (error) {
        if (error.message.includes("NOT NULL")) {
          console.error("レコード追加エラー:", error.message);
        } else {
          throw error;
        }
      }

      db.get("SELECT * FROM users", (error) => {
        if (error) {
          if (error.message.includes("no such table")) {
            console.error("レコード取得エラー:", error.message);
          } else {
            throw error;
          }
        }

        db.run("DROP TABLE books", () => {
          console.log("テーブル削除成功");

          db.close();
        });
      });
    });
  },
);
