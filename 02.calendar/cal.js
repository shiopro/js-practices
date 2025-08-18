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

for (let d = new Date(firstDay); d <= lastDay; d.setDate(d.getDate() + 1)) {
  const dateNum = d.getDate();
  const dayOfWeek = d.getDay();
  const isSaturday = dayOfWeek === 6;
  const isLastDate = dateNum === lastDay.getDate();

  calendar += dateNum.toString().padStart(2, " ");

  if (!isLastDate && !isSaturday) {
    calendar += " ";
  }

  if (isSaturday) {
    calendar += "\n";
  }
}

console.log(calendar);
