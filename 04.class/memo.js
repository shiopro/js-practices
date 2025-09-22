#!/usr/bin/env node

import db from "./db.js";
import MemoApp from "./memo_app.js";
import { readInput } from "./input.js";
import MemoRepository from "./memo_repository.js";
import ValidationError from "./validation_error.js";

const repository = new MemoRepository(db);
const app = new MemoApp(repository);
const option = process.argv[2];

try {
  if (option === "-l") {
    await app.listMemos();
  } else if (option === "-r") {
    await app.readMemo();
  } else if (option === "-d") {
    await app.deleteMemo();
  } else {
    const inputLines = await readInput();
    await app.addMemo(inputLines);
  }
} catch (error) {
  if (error instanceof ValidationError) {
    console.error("入力エラー:", error.message);
    process.exit(0);
  } else {
    console.error("予期せぬエラー:", error.message);
    process.exit(1);
  }
}
