#!/usr/bin/env node

import sqlite3 from "sqlite3";
import readline from "readline";

const db = new sqlite3.Database("memo.db", (error) => {
  if (error) {
    console.error("DB接続エラー:", error.message);
    process.exit(1);
  }
});

db.run(
  `CREATE TABLE IF NOT EXISTS memos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  memo TEXT)`,
  (error) => {
    if (error) {
      console.error("テーブル失敗:", error.message);
      process.exit(1);
    }
  },
);

class MemoApp {
  constructor(db) {
    this.db = db;
  }

  async addMemo() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    try {
      console.log("メモを入力してください(Ctrl+Dで終了):");
      let lines = [];

      for await (const line of rl) {
        lines.push(line);
      }
      const memo = lines.join("\n");

      await new Promise((resolve, reject) => {
        db.run("INSERT INTO memos (memo) VALUES (?)", [memo], (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      });
      console.log("メモを保存成功");
    } catch (error) {
      console.error("メモ保存失敗:", error.message);
    } finally {
      rl.close();
    }
  }
}

const app = new MemoApp(db);
await app.addMemo();
