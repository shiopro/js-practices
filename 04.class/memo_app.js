import ValidationError from "./validation_error.js";
import { selectMemo, buildChoices } from "./input.js";

class MemoApp {
  constructor(repository) {
    this.repository = repository;
  }

  async addMemo(inputLines) {
    const memo = inputLines.join("\n");

    if (!memo.trim()) {
      throw new ValidationError("メモが空です");
    }

    try {
      await this.repository.add(memo);

      console.log("メモを保存成功");
    } catch (error) {
      if (error instanceof ValidationError) {
        console.error("メモ保存失敗:", error.message);
      } else {
        throw error;
      }
    }
  }

  async listMemos() {
    try {
      const memoList = await this.repository.list();
      if (memoList.length === 0) {
        throw new ValidationError("メモが存在しません");
      }

      memoList.forEach((memo) => {
        const firstLine = memo.content.split("\n")[0];
        console.log(`${firstLine}`);
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        console.error("一覧取得失敗:", error.message);
      } else {
        throw error;
      }
    }
  }

  async readMemo() {
    try {
      const choices = await buildChoices(this.repository);
      if (choices.length === 0) {
        throw new ValidationError("選択できるメモがありません");
      }

      const memoList = await this.repository.list();
      const selectedId = await selectMemo(choices);
      const selectedRow = memoList.find((memo) => memo.id === selectedId);
      console.log(selectedRow.content);
    } catch (error) {
      if (error instanceof ValidationError) {
        console.error("メモ参照失敗:", error.message);
      } else {
        throw error;
      }
    }
  }

  async deleteMemo() {
    try {
      const choices = await buildChoices(this.repository);

      if (choices.length === 0) {
        throw new ValidationError("削除できるメモがありません");
      }

      const deleteId = await selectMemo(choices);
      await this.repository.delete(deleteId);

      console.log("メモ削除成功");
    } catch (error) {
      if (error instanceof ValidationError) {
        console.error("メモ削除失敗:", error.message);
      } else {
        throw error;
      }
    }
  }
}

export default MemoApp;
