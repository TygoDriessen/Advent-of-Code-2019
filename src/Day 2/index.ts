import { BaseDay } from "../BaseDay";

export class Day2 extends BaseDay {
  protected async Part1(): Promise<void> {
    const result = Day2.programAlarm(this.input);
    console.log(`Value at index 0 is: ${result[0]}`);
  }

  protected async Part2(): Promise<void> {
    console.error("Not implemented!");
  }

  private static programAlarm(opcode: number[]) {
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

  private get input(): number[] {
    return this.readInput(__dirname + "/input.txt", ",").map(e => Number(e));
  }
}
