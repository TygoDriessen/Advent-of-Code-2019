import inquirer from "inquirer";
import fs from "fs";
import path from "path";
import { BaseDay } from "./BaseDay";

export class AdventOfCode {
  private days: Map<string, BaseDay> = new Map<string, BaseDay>();

  public async start() {
    if (this.days.size > 0) {
      // Prompt for the desired date
      const prompt = await inquirer.prompt([
        {
          name: "day",
          type: "list",
          message: "Choose a day:",
          choices: Array.from(this.days.keys())
        }
      ]);
      // Call the selected date
      const day = this.days.get(prompt.day);
      if (day) await day.start();
    } else {
      this.loadDays()
        .then(() => {
          console.log("Days loaded");
          this.start();
        })
        .catch(err => {
          throw console.error(err);
        });
    }
  }

  private async loadDays(): Promise<void> {
    try {
      const daysPath = path.join(__dirname, "days");
      const days = await fs.readdirSync(daysPath);

      days.map(day => {
        const dayPath = path.join(daysPath, day);
        const isDir = fs.lstatSync(dayPath);

        if (isDir) {
          this.loadDay(day, dayPath);
        }
      });
    } catch (e) {
      throw console.error(e);
    }
  }

  private loadDay(name: string, dayPath: string): void {
    try {
      // Require the day
      let day = require(dayPath).default;
      day = new day(this);
      this.days.set(name, day);
    } catch (e) {
      throw console.error(e);
    }
  }
}
