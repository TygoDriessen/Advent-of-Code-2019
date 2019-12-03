import fs from "fs";
import inquirer from "inquirer";

export class Day1 {
  // TODO: local variable?

  public async start() {
    const prompt = await inquirer.prompt([
      {
        name: "part",
        type: "list",
        message: "Choose which part of the assignment:",
        choices: ["Part 1", "Part 2"]
      }
    ]);
    // Read the lines from the input.txt file
    const lines = Day1.readLines("input.txt");
    switch (prompt.part) {
      case "Part 1":
        // Calculate Part 1
        const sum1 = this.moduleFuelRequirements(lines);
        console.log(sum1);
        break;
      case "Part 2":
        // Calculate Part 2
        const sum2 = this.totalFuelRequirement(lines);
        console.log(sum2);
    }
  }

  private moduleFuelRequirements(lines: number[]): number {
    let fuelSum = 0;
    for (const line of lines) {
      const fuel = this.calculateFuel(line, false);
      fuelSum += fuel;
    }
    return fuelSum;
  }

  private totalFuelRequirement(lines: number[]): number {
    let fuelSum = 0;
    for (const line of lines) {
      const fuel = this.calculateFuel(line, true);
      fuelSum += fuel;
    }
    return fuelSum;
  }

  private calculateFuel(mass: number, isTotal = false): number {
    const fuelRequirement = Math.floor(mass / 3) - 2;
    if (!isTotal) {
      return fuelRequirement;
    }

    let total = 0;
    if (fuelRequirement > 0) {
      total += fuelRequirement;
      total += this.calculateFuel(fuelRequirement, true);
      return total;
    } else {
      return total;
    }
  }

  private static readLines(file: string): number[] {
    const lines = fs
      .readFileSync(`${__dirname}/${file}`, "utf8")
      .split("\r\n")
      .filter(line => line.length > 0);
    return lines.map(line => Number(line));
  }
}
