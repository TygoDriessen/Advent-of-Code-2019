import inquirer from "inquirer";

import { Day1 } from "./Day 1";
import { Day2 } from "./Day 2";
import { Day3 } from "./Day 3";

export class AdventOfCode {
  public async start() {
    const prompt = await inquirer.prompt([
      {
        name: "day",
        type: "list",
        message: "Choose a day:",
        choices: ["Day 1", "Day 2", "Day 3"]
      }
    ]);

    switch (prompt.day) {
      case "Day 1":
        const day1 = new Day1(this);
        await day1.start();
        break;
      case "Day 2":
        const day2 = new Day2(this);
        await day2.start();
        break;
      case "Day 3":
        const day3 = new Day3(this);
        await day3.start();
        break;
    }
  }
}
