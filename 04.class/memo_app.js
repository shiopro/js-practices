import { selectMemo, buildChoices } from "./input.js";

class MemoApp {
  constructor(repository) {
    this.repository = repository;
  }

  async addMemo(inputLines) {
    try {
      const memo = inputLines.join("\n");
      await this.repository.add(memo);

      console.log("メモを保存成功");
    } catch (error) {
      console.error("メモ保存失敗:", error.message);
    }
  }

  async listMemos() {
    try {
      const rows = await this.repository.list();
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
      const choices = await buildChoices(this.repository);
      const rows = await this.repository.list();
      const selectedId = await selectMemo(choices);
      const selectedRow = rows.find((row) => row.id === selectedId);
      console.log(selectedRow.content);
    } catch (error) {
      console.error("メモ参照失敗:", error.message);
    }
  }

  async deleteMemo() {
    try {
      const choices = await buildChoices(this.repository);
      const deleteId = await selectMemo(choices);
      await this.repository.delete(deleteId);

      console.log("メモ削除成功");
    } catch (error) {
      console.error("メモ削除失敗:", error.message);
    }
  }
}

export default MemoApp;
