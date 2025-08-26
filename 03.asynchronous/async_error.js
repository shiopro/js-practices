import { run, get, close } from "./db.js";

async function main() {
  try {
    await run(
      "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
    );
    console.log("テーブル作成成功");

    try {
      await run("INSERT INTO books (title) VALUES (?)", [null]);
    } catch (error) {
      console.error("レコード追加エラー:", error.message);
    }

    try {
      await get("SELECT * FROM users");
    } catch (error) {
      console.error("取得エラー:", error.message);
    }

    try {
      await run("DROP TABLE books");
      console.log("テーブル削除成功");
    } finally {
      await close();
    }
  } catch (error) {
    console.error("エラー:", error.message);
  }
}

main();
