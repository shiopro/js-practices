import readline from "readline";
import inquirer from "inquirer";

async function readInput() {
  const rl = readline.createInterface({
    input: process.stdin,
  });

  const lines = [];

  if (process.stdin.isTTY) {
    console.log("メモを入力してください(Ctrl+Dで終了):");
  }

  for await (const line of rl) {
    lines.push(line);
  }

  rl.close();
  return lines;
}

async function selectMemo(choices) {
  const answer = await inquirer.prompt([
    {
      type: "list",
      name: "selectedMemo",
      message: "Choose a note you want to see:",
      choices: choices,
    },
  ]);
  return answer.selectedMemo;
}

export { readInput, selectMemo };
