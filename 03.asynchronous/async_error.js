import { run, get, all, close } from "./db.js";

async function main() {
  try {
    await run(
      "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
    );

    try {
      await run("INSERT INTO books (title) VALUES (?)", [null]);
    } catch (error) {
      console.error("NOT NULLエラー:", error.message);
    }

    try {
      await run("INSERT INTO books (title) VALUES (?)", ["Book"]);
      await run("INSERT INTO books (title) VALUES (?)", ["Book"]);
    } catch (error) {
      console.error("UNIQUE エラー:", error.message);
    }

    try {
      await get("SELECT * FROM users");
    } catch (error) {
      console.error("取得エラー:", error.message);
    }

    const rows = await all("SELECT * FROM books");
    console.log("全体:", rows);

    await run("DROP TABLE books");
    console.log("テーブルを削除しました");
  } catch (error) {
    console.error("エラー:", error.message);
  } finally {
    await close();
    console.log("DB接続を閉じました");
  }
}

main();
