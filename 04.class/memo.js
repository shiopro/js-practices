#!/usr/bin/env node
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import readline from "readline";

class MemoApp {
  constructor(dbPath = "./memos.db") {
    this.dbPath = dbPath;
    this.db = null;
  }

  async connect() {
    try {
      this.db = await open({
        filename: this.dbPath,
        driver: sqlite3.Database,
      });
      await this.db.run(`CREATE TABLE IF NOT EXISTS memos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        memo TEXT NOT NULL
      )`);
      console.log("データベースに接続しました");
    } catch (error) {
      console.error("データベース接続エラー", error);
      process.exit(1);
    }
  }

  async addMemo(memoText) {
    if (!this.db) {
      throw new Error("データベースに接続されていません");
    }
    try {
      await this.db.run("INSERT INTO memos (memo) VALUES (?)", memoText);
      console.log("メモを追加しました");
    } catch (error) {
      console.error("メモ追加エラー:", error);
      throw new Error("メモの追加に失敗しました");
    }
  }

  async close() {
    if (this.db) {
      try {
        await this.db.close();
        console.log("データベース接続を閉じました");
      } catch (error) {
        console.error("データベース切断エラー:", error);
      }
    }
  }
}

async function main() {
  const memoApp = new MemoApp();
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    await memoApp.connect();
    console.log("メモを入力してください（複数行可、終了は END と入力）：");

    let buffer = "";

    rl.on("line", async (line) => {
      if (line.trim() === "END") {
        await memoApp.addMemo(buffer.trim());
        console.log("メモを保存しました！");
        buffer = "";
        return;
      }
      buffer += line + "\n";
    });
    rl.on("close", async () => {
      await memoApp.close();
    });
  } catch (error) {
    console.error("メイン処理でエラーが発生しました:", error.message);
    process.exit(1);
  }
}

main();
