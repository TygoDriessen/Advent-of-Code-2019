import inquirer from "inquirer";

import { Day1 } from "./Day 1";

export class AdventOfCode {
  constructor() {
    inquirer
      .prompt([
        {
          name: "day",
          type: "list",
          message: "Choose a day:",
          choices: ["Day 1", "Day 2"]
        }
      ])
      .then(async prompt => {
        switch (prompt.day) {
          case "Day 1":
            await this.day1();
        }
      });
  }

  private async day1(): Promise<void> {
    const day1 = new Day1();
    await day1.start();
  }
}
