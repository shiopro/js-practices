#!/usr/bin/env node

import minimist from "minimist";

const argv = minimist(process.argv.slice(2));

const year = argv.y || new Date().getFullYear();
const month = argv.m || new Date().getMonth() + 1;

const firstDay = new Date(year, month - 1, 1);
const lastDay = new Date(year, month, 0);

const weekHeader = ["日", "月", "火", "水", "木", "金", "土"];

console.log(`      ${month}月 ${year}`);
console.log(weekHeader.join(" "));

let calendar = "";

for (let i = 0; i < firstDay.getDay(); i++) {
  calendar += "   ";
}

for (let day = 1; day <= lastDay.getDate(); day++) {
  calendar += day.toString().padStart(2, " ") + " ";
  if ((firstDay.getDay() + day - 1) % 7 === 6) {
    calendar += "\n";
  }
}

console.log(calendar);
