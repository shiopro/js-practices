import sqlite3 from "sqlite3";
import { run, get, close } from "./db.js";

const db = new sqlite3.Database(":memory:");

try {
  await run(
    db,
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );
  console.log("テーブル作成成功");

  try {
    await run(db, "INSERT INTO books (title) VALUES (?)", [null]);
  } catch (error) {
    if (error instanceof Error && error.message.includes("NOT NULL")) {
      console.error("レコード追加エラー:", error.message);
    } else {
      throw error;
    }
  }

  try {
    await get(db, "SELECT * FROM users");
  } catch (error) {
    if (error instanceof Error && error.message.includes("no such table")) {
      console.error("レコード取得エラー:", error.message);
    } else {
      throw error;
    }
  }

  await run(db, "DROP TABLE books");
  console.log("テーブル削除成功");
} finally {
  await close(db);
}
