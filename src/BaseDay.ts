import inquirer from "inquirer";
import fs from "fs";
import { AdventOfCode } from "./AdventOfCode";

export abstract class BaseDay {
  constructor(private adventOfCode: AdventOfCode) {}

  public async start() {
    const prompt = await inquirer.prompt([
      {
        name: "part",
        type: "list",
        message: "Choose which part of the assignment:",
        choices: [
          { name: "Part 1", value: "part1" },
          { name: "Part 2", value: "part2" }
        ]
      }
    ]);

    switch (prompt.part) {
      case "part1":
        this.Part1();
        break;
      case "part2":
        this.Part2();
        break;
    }

    await this.adventOfCode.start();
  }

  protected abstract async Part1(): Promise<void>;

  protected abstract async Part2(): Promise<void>;

  protected readInput(path: string, separator: string): Array<string> {
    try {
      return fs.readFileSync(path, "utf8").split(separator);
    } catch (e) {
      throw new Error(e);
    }
  }
}
