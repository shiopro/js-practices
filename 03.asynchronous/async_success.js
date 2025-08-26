import { run, get, all, close } from "./db.js";

async function main() {
  try {
    await run(
      "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
    );
    console.log("テーブル作成成功");

    const result = await run("INSERT INTO books (title) VALUES (?)", ["Book"]);
    console.log("追加したレコードのID:", result.lastID);

    const row = await get("SELECT * FROM books WHERE title = ?", ["Book"]);
    console.log("取得したレコード:", row);

    const rows = await all("SELECT * FROM books");
    console.log("全体のレコード:", rows);

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
