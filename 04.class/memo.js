#!/usr/bin/env node

import db from "./db.js";
import MemoApp from "./memo_app.js";
import { readInput } from "./input.js";
import MemoRepository from "./memo_repository.js";

const repository = new MemoRepository(db);
const app = new MemoApp(repository);
const option = process.argv[2];

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
