import { AdventOfCode } from "../AdventOfCode";
import * as fs from "fs";

export class Day2 {
  constructor(private adventOfCode: AdventOfCode) {}

  public async start() {
    const input = Day2.readInput("input.txt");
    const result = this.programAlarm(input);
    console.log(`Value at position 0 is: ${result[0]}`);
    await this.adventOfCode.start();
  }

  private programAlarm(opcode: number[]) {
    opcode[1] = 12;
    opcode[2] = 2;
    return Day2.process(opcode);
  }

  private static process(opcode: number[]): number[] {
    const newOpcode = opcode;
    let skipCount = 0;
    for (let [i, code] of opcode.entries()) {
      if (skipCount === 0) {
        const a = opcode[opcode[i + 1]];
        const b = opcode[opcode[i + 2]];
        const position = opcode[i + 3];

        // TODO: to switch?
        if (code === 1) {
          newOpcode[position] = Day2.add(a, b);
          skipCount = 3;
        } else if (code === 2) {
          newOpcode[position] = Day2.multiply(a, b);
          skipCount = 3;
        } else if (code === 99) {
          break;
        }
      } else {
        skipCount--;
      }
    }
    return newOpcode;
  }

  private static add(a: number, b: number): number {
    return a + b;
  }

  private static multiply(a: number, b: number): number {
    return a * b;
  }

  private static readInput(file: string): number[] {
    return fs
      .readFileSync(`${__dirname}/${file}`, "utf8")
      .split(",")
      .map(entry => Number(entry));
  }
}
