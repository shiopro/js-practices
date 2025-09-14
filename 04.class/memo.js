#!/usr/bin/env node

import db from "./db.js";
import MemoApp from "./memo_app.js";

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
