import { BaseDay } from "../BaseDay";

export class Day1 extends BaseDay {
  protected async Part1(): Promise<void> {
    const sum1 = this.moduleFuelRequirements(this.input);
    console.log(`Result: ${sum1}`);
  }

  protected async Part2(): Promise<void> {
    const sum2 = this.totalFuelRequirement(this.input);
    console.log(`Result: ${sum2}`);
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

  private get input(): number[] {
    return this.readInput(__dirname + "/input.txt", "\r\n")
      .filter(e => e.length > 0)
      .map(e => Number(e));
  }
}
