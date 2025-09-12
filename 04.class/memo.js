#!/usr/bin/env node

import sqlite3 from "sqlite3";
import readline from "readline";
import inquirer from "inquirer";

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

  async listMemos() {
    try {
      const rows = await new Promise((resolve, reject) => {
        db.all("SELECT id, memo FROM memos", (error, rows) => {
          if (error) {
            reject(error);
          } else {
            resolve(rows);
          }
        });
      });

      rows.forEach((row) => {
        const firstLine = row.memo.split("\n")[0];
        console.log(`${firstLine}`);
      });
    } catch (error) {
      console.error("一覧取得失敗:", error.message);
    }
  }

  async readMemo() {
    try {
      const rows = await new Promise((resolve, reject) => {
        db.all("SELECT id, memo FROM memos", (error, rows) => {
          if (error) {
            reject(error);
          } else {
            resolve(rows);
          }
        });
      });

      const choices = rows.map((row) => ({
        name: row.memo.split("\n")[0],
        value: row.id,
      }));

      const answer = await inquirer.prompt([
        {
          type: "list",
          name: "selectedMemo",
          message: "Choose a note you want to see:",
          choices: choices,
        },
      ]);

      const selectedRow = rows.find((row) => row.id === answer.selectedMemo);
      console.log(selectedRow.memo);
    } catch (error) {
      console.error("メモ参照失敗:", error.message);
    }
  }

  async deleteMemo() {
    try {
      const rows = await new Promise((resolve, reject) => {
        db.all("SELECT id, memo FROM memos", (error, rows) => {
          if (error) {
            reject(error);
          } else {
            resolve(rows);
          }
        });
      });

      const choices = rows.map((row) => ({
        name: row.memo.split("\n")[0],
        value: row.id,
      }));

      const answer = await inquirer.prompt([
        {
          type: "list",
          name: "deleteId",
          message: "Choose a memo you want to delete:",
          choices: choices,
        },
      ]);

      await new Promise((resolve, reject) => {
        db.run("DELETE FROM memos WHERE id = ?", [answer.deleteId], (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      });
      console.log("メモ削除成功");
    } catch (error) {
      console.error("メモ削除失敗:", error.message);
    }
  }
}

const app = new MemoApp(db);
const option = process.argv[2];

if (option === "-l") {
  await app.listMemos();
} else if (option === "-r") {
  await app.readMemo();
} else if (option === "-d") {
  await app.deleteMemo();
} else {
  await app.addMemo();
}
