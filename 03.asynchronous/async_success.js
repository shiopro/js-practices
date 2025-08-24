import { run, get, all, close } from "./db.js";

async function main() {
  try {
    await run(
      "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
    );

    await run("INSERT INTO books (title) VALUES (?)", ["Book"]);

    const row = await get("SELECT * FROM books WHERE title = ?", ["Book"]);
    console.log("取得:", row);

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
