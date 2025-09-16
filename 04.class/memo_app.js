import readline from "readline";
import inquirer from "inquirer";

class MemoApp {
  constructor(db) {
    this.db = db;
  }

  async addMemo() {
    const rl = readline.createInterface({
      input: process.stdin,
    });

    try {
      if (process.stdin.isTTY) {
        console.log("メモを入力してください(Ctrl+Dで終了):");
      }
      const lines = [];

      for await (const line of rl) {
        lines.push(line);
      }
      const memo = lines.join("\n");

      await new Promise((resolve, reject) => {
        this.db.run(
          "INSERT INTO memos (content) VALUES (?)",
          [memo],
          (error) => {
            if (error) {
              reject(error);
            } else {
              resolve();
            }
          },
        );
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
        this.db.all("SELECT id, content FROM memos", (error, rows) => {
          if (error) {
            reject(error);
          } else {
            resolve(rows);
          }
        });
      });

      rows.forEach((row) => {
        const firstLine = row.content.split("\n")[0];
        console.log(`${firstLine}`);
      });
    } catch (error) {
      console.error("一覧取得失敗:", error.message);
    }
  }

  async readMemo() {
    try {
      const rows = await new Promise((resolve, reject) => {
        this.db.all("SELECT id, content FROM memos", (error, rows) => {
          if (error) {
            reject(error);
          } else {
            resolve(rows);
          }
        });
      });

      const choices = rows.map((row) => ({
        name: row.content.split("\n")[0],
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
      console.log(selectedRow.content);
    } catch (error) {
      console.error("メモ参照失敗:", error.message);
    }
  }

  async deleteMemo() {
    try {
      const rows = await new Promise((resolve, reject) => {
        this.db.all("SELECT id, content FROM memos", (error, rows) => {
          if (error) {
            reject(error);
          } else {
            resolve(rows);
          }
        });
      });

      const choices = rows.map((row) => ({
        name: row.content.split("\n")[0],
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
        this.db.run(
          "DELETE FROM memos WHERE id = ?",
          [answer.deleteId],
          (error) => {
            if (error) {
              reject(error);
            } else {
              resolve();
            }
          },
        );
      });
      console.log("メモ削除成功");
    } catch (error) {
      console.error("メモ削除失敗:", error.message);
    }
  }
}

export default MemoApp;
