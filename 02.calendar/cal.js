#!/usr/bin/env node

import minimist from "minimist";

const argv = minimist(process.argv.slice(2));

const now = new Date();
const year = argv.y ?? now.getFullYear();
const month = argv.m ?? now.getMonth() + 1;

const firstDay = new Date(year, month - 1, 1);
const lastDay = new Date(year, month, 0);

let calendar = "";

calendar += `      ${month}月 ${year}\n`;

calendar += "日 月 火 水 木 金 土\n";

for (let i = 0; i < firstDay.getDay(); i++) {
  calendar += "   ";
}

for (let dateNum = 1; dateNum <= lastDay.getDate(); dateNum++) {
  const dayOfWeek = (firstDay.getDay() + dateNum - 1) % 7;
  const isSaturday = dayOfWeek === 6;

  calendar += dateNum.toString().padStart(2, " ");

  if (dateNum !== lastDay.getDate() && !isSaturday) {
    calendar += " ";
  }

  if (isSaturday) {
    calendar += "\n";
  }
}

console.log(calendar);
