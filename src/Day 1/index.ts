import fs from "fs";
import inquirer from "inquirer";

export class Day1 {
  public async start() {
    const prompt = await inquirer.prompt([
      {
        name: "part",
        type: "list",
        message: "Choose which part of the assignment:",
        choices: ["Part 1", "Part 2"]
      }
    ]);

    switch (prompt.part) {
      case "Part 1":
        const lines = Day1.readLines("input.txt");
        const sum = this.sumFuelRequirements(lines);
        console.log(sum);
        break;
      case "Part 2":
        console.log("Not implemented");
    }
  }

  private sumFuelRequirements(lines: string[]): number {
    let sum = 0;
    lines.forEach(line => {
      const numberLine = Number(line);
      sum = sum + (Math.floor(numberLine / 3) - 2);
    });
    return sum;
  }

  private static readLines(file: string): string[] {
    return fs
      .readFileSync(`${__dirname}/${file}`, "utf8")
      .split("\r\n")
      .filter(line => line.length > 0);
  }
}
