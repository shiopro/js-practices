#!/usr/bin/env node

import minimist from "minimist";

const argv = minimist(process.argv.slice(2));

const now = new Date();
const year = argv.y ?? now.getFullYear();
const month = argv.m ?? now.getMonth() + 1;

let calendar = "";
calendar += `      ${month}月 ${year}\n`;
calendar += "日 月 火 水 木 金 土\n";

const firstDate = new Date(year, month - 1, 1);
const lastDate = new Date(year, month, 0);

for (let i = 0; i < firstDate.getDay(); i++) {
  calendar += "   ";
}

for (
  let currentDate = new Date(firstDate);
  currentDate <= lastDate;
  currentDate.setDate(currentDate.getDate() + 1)
) {
  calendar += currentDate.getDate().toString().padStart(2, " ");

  if (
    currentDate.getDay() === 6 ||
    currentDate.getDate() === lastDate.getDate()
  ) {
    calendar += "\n";
  } else {
    calendar += " ";
  }
}

console.log(calendar);
