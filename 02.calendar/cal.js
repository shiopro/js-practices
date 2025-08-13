#!/usr/bin/env node

import minimist from "minimist";

const argv = minimist(process.argv.slice(2));

const now = new Date();
const year = argv.y ?? now.getFullYear();
const month = argv.m ?? now.getMonth() + 1;

const firstDay = new Date(year, month - 1, 1);
const lastDay = new Date(year, month, 0);

console.log(`      ${month}月 ${year}`);
console.log("日 月 火 水 木 金 土");

let calendar = "";

for (let i = 0; i < firstDay.getDay(); i++) {
  calendar += "   ";
}

for (let dateNum = 1; dateNum <= lastDay.getDate(); dateNum++) {
  calendar += dateNum.toString().padStart(2, " ");

  if (dateNum !== lastDay.getDate()) {
    calendar += " ";
  }

  if ((firstDay.getDay() + dateNum - 1) % 7 === 6) {
    calendar += "\n";
  }
}

console.log(calendar);
