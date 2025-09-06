import sqlite3 from "sqlite3";
import { run, get, all, close } from "./db.js";

const db = new sqlite3.Database(":memory:");

async function main() {
  await run(
    db,
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );
  console.log("テーブル作成成功");

  const result = await run(db, "INSERT INTO books (title) VALUES (?)", [
    "Book",
  ]);
  console.log("追加したレコードのID:", result.lastID);

  const row = await get(db, "SELECT * FROM books WHERE title = ?", ["Book"]);
  console.log("取得したレコード:", row);

  const rows = await all(db, "SELECT * FROM books");
  console.log("全体のレコード:", rows);

  try {
    await run(db, "DROP TABLE books");
    console.log("テーブル削除成功");
  } finally {
    await close(db);
  }
}

main();
